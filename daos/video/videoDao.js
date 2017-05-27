/**
 * 影视Dao
 */
var Client = require('node-rest-client').Client;
var client = new Client();
var cheerio = require('cheerio');
var host = 'http://m.ashvsash.com/';

module.exports = {
    searchByKey:function(key,callback){
        var args = {
            parameters: { "s": key },
            headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' }
        };
        client.get(host, args, function(data, response) {
            var $ = cheerio.load(data.toString(), {
                decodeEntities: false
            });
            callback && callback(null,$('#post_container').html());
        });
    },
    searchDetail:function(res,callback){
        res = res.replace('/?','');
        console.log(host+res);
        var args = {
            parameters: {  },
            headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' }
        };
        client.get(host+res,args, function(data, response) {
            var $ = cheerio.load(data.toString(), {
                decodeEntities: false
            });
            console.log(data);
            callback && callback(null,$('.article_container').eq(0).html());
        });
    }
};