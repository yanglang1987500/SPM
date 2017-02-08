/**
 * Created by 杨浪 on 2016/9/21.
 * websocket 
 */
var ws = require("nodejs-websocket")
var guid = require('guid');
var Events = require('./framework-events');
var appConfig = require('../configs/appConfig');

var server = ws.createServer(function (conn) {
    var client_id = guid.raw();
    conn.sendText('__CLIENT_ID__:'+client_id);
    conn.clientId = client_id;
    conn.on("text", function (str) {
        try{
            var data = JSON.parse(str);
            Events.notify(data.eventName,{
                callbackId:data.callbackId,
                clientId:data.clientId,
                data:data.data
            });
        }catch(e){
            console.log(e);
        }
    });
    conn.on("close", function (code, reason) {
        console.log("Connection closed");
    });

}).listen(appConfig.WSPORT);

function doBroadcast(obj,clientId) {
    var stringify = JSON.stringify(obj);
    server.connections.forEach(function (conn) {
        if(!clientId){
            conn.sendText(stringify);
        }else{
            if(clientId == conn.clientId){
                conn.sendText(stringify);
                return false;
            }
        }
    });
}
/**
 * 推送分为三种类型
 * 其一：由服务器和客户端约定callbackId，服务器遇到更新某些数据时，直接根据约定的callbackId进行广播通知所有客户端的相应事件
 * 其二：由客户端进行call调用（单次生效的），会传过来一个callbackId，并且有eventName与data。
 * 其三：由客户端进行listen调用（监听），服务器会根据传过来的callbackId保留并不断推送最新状态给客户端
 * @type {{broadcast: module.exports.broadcast, call: module.exports.call}}
 */
module.exports = {
    /**
     * 广播
     * @param callbackId 回调id 也就是客户端订阅事件的key
     * @param data 数据
     */
    broadcast:function(callbackId,data){
        doBroadcast({
            callbackId:callbackId,
            data:data
        });
    },
    /**
     * 推送消息到客户端
     * @param client_id 客户端id
     * @param callbackId 回调id
     * @param data 数据
     */
    call:function(client_id,callbackId,data){
        doBroadcast({
            callbackId:callbackId,
            data:data
        },client_id);
    }
};


