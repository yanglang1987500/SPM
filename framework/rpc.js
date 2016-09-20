var net = require('net');
var guid = require('guid');
var ProtoBuf = require('protobufjs');
var ExBuffer = require('./ExBuffer');
var Events = require('./framework-events');
var builder = ProtoBuf.loadProtoFile('./Message.proto'),
    Message = builder.build('protobuf'),
    MessageIn = Message.MessageIn,
    MessageOut = Message.MessageOut;

var exBuffer = new ExBuffer().uint32Head().bigEndian();

const CONST = {
    HOST:'127.0.0.1',
    PORT:'9000'
};

var client  = new net.Socket();

client.connect(CONST.PORT,CONST.HOST,function(){
    console.log('connected success');
});


exBuffer.on('data',function(ret){
    var data = MessageOut.decode(ret);
    var callid = data.get('_CALLID');
    Events.notify(callid,data).unsubscribe(callid);
});

client.on('data',function(ret){
    exBuffer.put(ret);//只要收到数据就往ExBuffer里面put
});

client.on('close',function(){
    console.log('connect closed');
    client.connect(CONST.PORT,CONST.HOST,function(){
        console.log('connected success');
    });
});

function _doCall(func,args,file,callback){
    var _CALLID = func.toUpperCase()+'_'+guid.raw();
    var message = new MessageIn();
    message.set('method',func);
    message.set('params',JSON.stringify(args));
    message.set('_CALLID',_CALLID);
    message.set('fileData',file);

    var buffer = message.encode().toBuffer();
    debugger;
    var headBuf = new Buffer(4);

    var len = Buffer.byteLength(buffer);

    //写入4个字节表示本次包长
    headBuf.writeUInt32BE(len, 0)
    client.write(headBuf);

    client.write(buffer);

    Events.subscribe(_CALLID,callback);
}



module.exports = {
    send:function(data){
        client.write(data);
    },
    upload:function(func,args,file,callback){
        _doCall(func,args,file,callback);
    },
    call:function(func,args,callback){
        _doCall(func,args,null,callback);
    }
};
