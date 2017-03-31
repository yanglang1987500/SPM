var _ = require('lodash');
var gulp = require('gulp');
var webpack = require('gulp-webpack');
var clean = require('gulp-clean');
var uglify = require('gulp-uglify');
var cssmin = require('gulp-minify-css');
var scp = require('gulp-scp2');

/**============定义命令行参数================**/
var CONST = {
    DEV:{
        TEST:/^(-d|--dev)$/im,
        FLAG:false
    },
    PROD:{
        TEST:/^(-p|--prod)$/im,
        FLAG:false
    },
    WATCH:{
        TEST:/^(-w|--watch)$/im,
        FLAG:false
    },
    DEPLOY:{
        TEST:/^(?:-r|--remote)@(.*)$/im,
        FLAG:false
    }
};

var args = JSON.parse(process.env.npm_config_argv).original;
//解析命令行参数
if(args.length>2)
    args.forEach(function(i,index){
        for(var key in CONST){
            CONST[key].TEST.test(i) && (CONST[key].FLAG=true);
            if(key == 'DEPLOY')
                CONST[key].SERVER = RegExp.$1;
        }
    });
else
    CONST.DEV.FLAG = true;

console.log('打印命令参数列表');
console.log(CONST);

var __DIST__ = 'public/dist/',
    __SRC__  = 'public/src/',
    __SRCJS__   = __SRC__+'javascripts/',
    __SRCCSS__  = __SRC__+'stylesheets/',
    __DISTMOD__  = __DIST__ + 'modules/';

gulp.task("clean", function(){
    return gulp.src(__DIST__)
        .pipe(clean());
});

gulp.task('webpack', function() {
	var config = require('./webpack.config.js')(CONST.PROD.FLAG);
	return gulp.src([__SRCJS__+'h5.js'])
    .pipe(webpack(config))
    .pipe(gulp.dest(__DISTMOD__));
});
gulp.task('webpack:watch', function() {
    var config = require('./webpack.config.js')(CONST.PROD.FLAG);
    return gulp.src([__SRCJS__+'h5.js'])
        .pipe(webpack(_.merge(config, {
            watch: true
        })))
        .pipe(gulp.dest(__DISTMOD__));
});

gulp.task('copyfont',function(){
	return gulp.src(__SRCCSS__+'font-awesome-4.6.3/**').pipe(gulp.dest(__DIST__+'font-awesome-4.6.3'));
});

gulp.task('copycss',function(){
	return gulp.src([__SRCCSS__+'login.css',__SRCCSS__+'loginh5.css',__SRCCSS__+'animation.css'])
	.pipe(gulp.dest(__DISTMOD__));
});

gulp.task('copyimage',function(){
	return gulp.src([__SRC__+'images/**'])
	.pipe(gulp.dest(__DIST__+'images/'));
});

gulp.task('copyjslib',function(){
	return gulp.src([__SRCJS__+'libs/jquery.min.js',__SRCJS__+'libs/zepto.min.js',
		__SRCJS__+'libs/jquery.easyui.min.js',__SRCJS__+'libs/crypto.js'])
	.pipe(gulp.dest(__DISTMOD__));
});



/**========================压缩=======================**/
gulp.task('jsmin', ['webpack'],function () {
    return gulp.src(__DISTMOD__+'**/*.js')
        .pipe(uglify())
        .pipe(gulp.dest(__DISTMOD__));
});

gulp.task('cssmin', ['webpack','copycss'],function () {
    return gulp.src(__DISTMOD__+'**/*.css')
        .pipe(cssmin())
        .pipe(gulp.dest(__DISTMOD__));
});
/**===================================================**/


/**========================布署=======================**/
gulp.task('deploy',['jsmin','cssmin'],function(){
    gulp.src(__DISTMOD__)
        .pipe(scp({
            host: '****，****，***，***',
            username: 'administrator',
            password: '*******',
            dest: '/d:/zhuanbang'
        }))
        .on('error', function(err) {
            console.log(err);
        });
});
/**===================================================**/


var tasks = ['copyfont','copycss','copyimage','copyjslib'];
if(CONST.PROD.FLAG){
    tasks = tasks.concat(['jsmin','cssmin']);
}

if(CONST.WATCH.FLAG)
    tasks.push('webpack:watch');
else
    tasks.push('webpack');

if(CONST.DEPLOY.FLAG)
    tasks.push('deploy');


gulp.task('default',['clean'],function(){
	gulp.start.apply(this,tasks);	
});

