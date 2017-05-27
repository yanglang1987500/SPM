//http://hf2.ashvsash.cc/?s=%E7%BB%BF%E7%AE%AD%E4%BE%A0\
var Client = require('node-rest-client').Client;
var client = new Client();
var cheerio = require('cheerio');
var args = {
            parameters:{"s":'闪'},
            headers: {
                'Content-Type':'application/x-www-form-urlencoded;charset=utf-8'
            }
        };
client.get('http://m.ashvsash.com', args,function (data, response) {
   //console.log(html);
   var $ = cheerio.load(data.toString(), {decodeEntities: false});
	console.log($('#post_container').html());
   /*client.get(href,function (data, response) {
   		$ = cheerio.load(data.toString(), {decodeEntities: false});
   		console.log($('#post_content').html());
   });*/
});