/**
 * Created by 杨浪 on 2016/9/8.
 */
var net = require('net');
var handler = require('../daos/handler');
var fs = require('fs');
var ExBuffer = require('./ExBuffer');
var chatServer = net.createServer();
var ProtoBuf = require('protobufjs');

var builder = ProtoBuf.loadProtoFile('./Message.proto'),
    Message = builder.build('protobuf'),
    MessageIn = Message.MessageIn,
    MessageOut = Message.MessageOut;

chatServer.on('connection', function(client) {
    client.name = client.remoteAddress + ':' + client.remotePort;
    var exBuffer = new ExBuffer().uint32Head().bigEndian();
    exBuffer.on('data',function(ret){
        var message = MessageIn.decode(ret);
        broadcast(message,client);
    });
    exBuffer.on('process',function(ret){
        console.log("process : "+ret);
    });
    client.on('data', function(ret) {
        console.log(ret.length);
        exBuffer.put(ret);//只要收到数据就往ExBuffer里面put
    });
    client.on('error', function(e) {
        console.log(e);
    });
});
function broadcast(msg,client) {
    try{
        handler[msg.get('method')](msg,function(data){
            reply(client,true,'',data,msg.get('_CALLID'));
        });
    }catch(e){
        reply(client,false,e.toString(),null,msg.get('_CALLID'));
    }
}

function reply(client,success,msg,data,callid){
    var message = new MessageOut();
    message.set('success',true);
    message.set('code',success?1:0);
    message.set('_CALLID',callid);
    message.set('message',msg);
    message.set('data',JSON.stringify(data));

    var buffer = message.encode().toBuffer();
    var headBuf = new Buffer(4);
    var len = Buffer.byteLength(buffer);

    //写入4个字节表示本次包长
    headBuf.writeUInt32BE(len, 0)
    client.write(headBuf);
    client.write(buffer);
}
chatServer.listen(9000);