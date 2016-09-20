var mongodb = require('mongodb');
var mongodbServer = new mongodb.Server('10.175.9.167',27070,{auto_reconnect:true,poolSize:10});
var db = new mongodb.Db('deadline7db_Config',mongodbServer);

module.exports = {
    defaultPassword:'123456',
    queryUserInfoByName:function(userName,callback){
        db.open(function(){
            db.collection('UserInfo', function (err, collection) {
                collection.find({Name:userName}).toArray(function (err, userinfos) {
                    if(err){
                        callback && callback(err);
                        return;
                    }
                    callback && callback(false,userinfos);
                });
            });
        });
    },
    queryUserPasswordByName:function(userName,callback){
        db.open(function(){
            db.collection('UserPassword', function (err, collection) {
                collection.find({username:userName}).toArray(function (err, userinfos) {
                    if(err){
                        callback && callback(err);
                        return;
                    }
                    callback && callback(false,userinfos);
                });
            });
        });
    },
    modifyUserPasswordByName:function(userName,password,callback){
        db.open(function(){
            db.collection('UserPassword', function (err, collection) {
                collection.update({username:userName},{$set:{password:password}},{safe:true},function(err,result){
                    if(err){
                        callback && callback(err);
                        return;
                    }
                    callback && callback(false,result);
                });
            });
        });
    },
    insertUserPassword:function(userName,password,callback){
        var arr = [{username:userName,password:password}];
        db.open(function(){
            db.collection('UserPassword', function (err, collection) {
                collection.insert(arr,{safe:true},function(err,result){
                    if(err){
                        callback && callback(err);
                        return;
                    }
                    callback && callback(false,result);
                });
            });
        });
    },
    queryUserInfoMapByCode:function(code,callback){
        db.open(function(){
            db.collection('UserInfoMap', function (err, collection) {
                collection.find({code:code}).toArray(function (err, maps) {
                    if(err){
                        callback && callback(err);
                        return;
                    }
                    callback && callback(false,maps);
                });
            });
        });
    },
    queryUserInfoMapByNickname:function(nickname,callback){
        db.open(function(){
            db.collection('UserInfoMap', function (err, collection) {
                collection.find({nickname:nickname}).toArray(function (err, maps) {
                    if(err){
                        callback && callback(err);
                        return;
                    }
                    callback && callback(false,maps);
                });
            });
        });
    }
};