/*var mongodb = require('mongodb');
var mongodbServer = new mongodb.Server('10.175.9.167',27070,{auto_reconnect:true,poolSize:10});
var db = new mongodb.Db('deadline7db_Config',mongodbServer);
db.open(function(){
   db.collection('UserInfoMap',function (err,collection) {
      collection.find().toArray(function(err,data){
          console.log(data);
        /!*  db.collection('UserPassword',function (err,coll) {
              coll.insert([{username:'Lilei',password:'123456'}],{safe:true},function(err,result){
                    console.log(result);
              });
          });*!/
      }) ;
   });*/

    /*db.collection('UserPassword',function (err,collection) {
        collection.find({username:'001'}).toArray(function(err,data){
            console.log(data);

        }) ;
    });*/
   /* db.collection('UserPassword').drop();*/
/*
});*/
var userDao = require('./daos/userDao.js');
userDao.queryUserInfoMapByNickname('huakai',function( maps){
    console.log(maps);
})