var express = require('express');
 var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var session = require('cookie-session');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var rd = require('rd');
var guid = require('guid');
var bodyParser = require('body-parser');

/**== 标签处理 ==**/
var tagProcessor = require('./framework/tag-processor');
tagProcessor.init();

var ejs = require('ejs');

var app = express();
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

//初始化上下文对象
var context = require('./framework/context');
context.setApp(app);
//引入权限控制初始化
var authority = require('./framework/authority');
//初始化权限数据
authority.loadAuthorities();
var sessionUtil = require('./framework/sessionUtil');
var websocket = require('./framework/websocket');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('html', function(){
  //处理自定义标签解析
  var args = arguments;
  ejs.renderFile.apply(this,[].slice.call(arguments,0,2).concat([function(err,data){
    if(args.length==3){
      var sessionUserInfo = sessionUtil.createUserInfo(args[1].session.userInfo);
      //此处如有标签需要实时从数据库异步取数，可能要加入promise
      args[2].apply(this,[null,tagProcessor.parse(data,sessionUserInfo)]);
    }
  }]));
});
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  name: 'DataPlatform',
  secret: 'DataPlatform'
}));
app.use(function(req, res, next) {
  res.locals.session = req.session;
  next();
});


/**
 * 加载模块页
 * 此处如果不拦截进行特殊处理的话，这个目录下的静态资源是不对外开放的。
 */
app.get('*', function(req,res,next){

  var url = req.originalUrl;
  if(/^\/views\/(modules\/.*)\.html$/.test(url)){
    res.render(RegExp.$1);
  }else{
    next();
  }
});
/**
 * 加载路由配置
 */
rd.eachFileFilterSync('./routes', /\.js$/, function (f, s) {
  console.log(f);
  var mod = require(f);
  app.use(mod);
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});
process.on('uncaughtException', function (err) {
  console.log('exception catch ...');
  console.log(err.stack);
});

app.listen(8080);

module.exports = app;
