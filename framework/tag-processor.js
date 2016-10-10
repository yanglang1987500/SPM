/**
 * Created by 杨浪 on 2016/10/9.
 */
var cheerio = require('cheerio');
var rd = require('rd');

var resolvers = [];

module.exports = {
    init:function(){
        /**
         * 加载标签解析器配置
         */
        rd.eachFileFilterSync('./framework/tag-resolvers', /\.js$/, function (f, s) {
            var mod = require(f);
            mod.loadData && mod.loadData();
            resolvers.push(mod);
        });
    },
    parse: function (data, sessionUserInfo) {
        var $ = cheerio.load(data, {decodeEntities: false});
        resolvers.forEach(function(resolver){
            resolver.resolve($,sessionUserInfo);
        });
        return $.html();
    }
};
