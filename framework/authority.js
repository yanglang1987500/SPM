var context = require('./context');
var cheerio = require('cheerio');

context.getApp().get('*', function(req,res,next){
    next();
});

context.getApp().locals.format = function(val){
    return val;
};

module.exports = {
  parse:function(data,req){
      var $ = cheerio.load(data,{decodeEntities: false});
      $('sec-authorize').each(function(i,item){
          if($(this).attr('url')=='function:view:221')
            $(this).children().insertAfter($(this));
      }).remove();
      return $.html();
  }
};
