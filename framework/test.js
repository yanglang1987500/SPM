/**
 * Created by 杨浪 on 2016/9/8.
 */

var rpc = require('./rpc');
var fs = require('fs');
var guid = require('guid');
/*
var content = fs.readFileSync('./1_jiexiaopei_2004.jpg');
var buffer = new Buffer(content);
rpc.upload('upload',null,buffer,function(data){
    console.log(data);
});*/
/*rpc.call('login',{username:'yanglang',password:'123456'},function(data){
    console.log(data);
});
rpc.call('login',{username:'yanglang',password:'123456'},function(data){
    console.log(data);
});

rpc.call('login',{username:'yanglang',password:'123456'},function(data){
    console.log(data);
});*/
/*var content = fs.readFileSync('./a.txt');
var buffer = new Buffer(content);
rpc.upload('upload2',null,buffer,function(data){
    console.log(data);
});*/

/*
for(var i = 0;i<100;i++){
    rpc.call('login',{username:'yanglang',password:'123456'},function(data){
        console.log(data);
    });
}
*/
for(var i = 0;i<1000;i++){
    console.log(guid.raw().replace(/[-\D]/gi,''))
}

