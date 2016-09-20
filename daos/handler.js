/**
 * Created by 杨浪 on 2016/9/8.
 */
var fs = require('fs');
module.exports = {
    'login':function(message,callback){
        callback && callback({message:'登录成功！'});
    },
    'upload':function(message,callback){
        var file ;
        if(file = message.get('fileData')){
            fs.writeFile('./a.jpg',file.buffer.slice(file.offset,file.limit),{encoding:'utf8'},function(){
                callback && callback({message:'上传图片文件成功！'});
            });
        }
        
    },
    'upload2':function(message,callback){
        var file ;
        if(file = message.get('fileData')){
            fs.writeFile('./b.txt',file.buffer.slice(file.offset,file.limit),{encoding:'utf8'},function(){
                callback && callback({message:'上传文本文件成功！'});
            });
        }

    },
    'login2':function(callback){
        throw new Error('用户名或密码错误');
    }
};