/**
 * webim云信接口
 */
var utils = require('../../libs/utils');
var crypto = require('crypto');

var Client = require('node-rest-client').Client;
var client = new Client();
var webimConfig = require('../../framework/webim.config')['NIM'];
var logger = require('../../framework/logger').logger('webIMDao4NIM');

var __REST_REGISTUSER = "https://api.netease.im/nimserver/user/create.action";
var __REST_QUERYUSER = "https://api.netease.im/nimserver/user/getUinfos.action";
var __REST_REGISTGROUP = "https://api.netease.im/nimserver/team/create.action";
var __REST_ADDGROUPUSER = "https://api.netease.im/nimserver/team/add.action";
var extend = require('extend');
var webIMDao = require('./webIMDaoInterface'),target = {};
extend(target, webIMDao, {
    token:'',
    init:function(){
        var that = this;
        logger.debug('webim server init token start');
        var sha1 = crypto.createHash('sha1');
        var curTime = parseInt(new Date().getTime()/1000);
        sha1.update(webimConfig.appSecret + webimConfig.nonce + curTime);
        that.token = sha1.digest('hex');
        logger.debug('webim server init token end');
        return curTime;
    },
    /**
     * 添加用户
     * @param params
     * @param callback
     */
    addUser:function(username,nickname,password,callback){
        logger.debug('webim nim regist user start');
        var curTime = this.init();
        console.log(curTime);
        console.log(this.token);
        var args = {
            data:{accid:username,name:nickname,token:password},
            parameters:{accid:username,name:nickname,token:password},
            headers: {
                  'Content-Type':'application/x-www-form-urlencoded;charset=utf-8',
                  'AppKey':webimConfig.appKey,
                  'Nonce':webimConfig.nonce,
                  'CurTime':curTime,
                  'CheckSum':this.token
            }
        };
        client.post(__REST_REGISTUSER, args , function (data, response) {
            logger.debug('webim nim regist user end');
            logger.debug(JSON.stringify(data));
            callback && callback(data);
        });
    },
    /**
     * 查找用户
     * @param params
     * @param callback
     */
    searchUser:function(username,callback){
        logger.debug('webim search user start');
        var curTime = this.init();
        var args = {
            data:{"accids":JSON.stringify([username])},
            parameters:{"accids":JSON.stringify([username])},
            headers: {
                'Content-Type':'application/x-www-form-urlencoded;charset=utf-8',
                'AppKey':webimConfig.appKey,
                'Nonce':webimConfig.nonce,
                'CurTime':curTime,
                'CheckSum':this.token,
            }
        };
        client.get(__REST_QUERYUSER, args , function (data, response) {
            logger.debug('webim search user end');
            logger.debug(JSON.stringify(data));
            callback && callback(data);
        });
    },
    /**
     * 添加群组
     * @param params
     * @param callback
     */
    addGroup:function(param,callback){
        logger.debug('webim add group start');
        var curTime = this.init();
        var args = {
            data:{
                "tname":param.name,
                "owner":param.owner,
                "intro":param.desc,
                "msg":'请加入群'+param.name,
                "magree":0,//管理后台建群时，0不需要被邀请人同意加入群，1需要被邀请人同意才可以加入群。其它会返回414
                "joinmode":0,//群建好后，sdk操作时，0不用验证，1需要验证,2不允许任何人加入。其它返回414
                "members":param.members,
            },
            parameters:{
                "tname":param.name,
                "owner":param.owner,
                "intro":param.desc,
                "msg":'请加入群'+param.name,
                "magree":0,//管理后台建群时，0不需要被邀请人同意加入群，1需要被邀请人同意才可以加入群。其它会返回414
                "joinmode":0,//群建好后，sdk操作时，0不用验证，1需要验证,2不允许任何人加入。其它返回414
                "members":JSON.stringify(param.members),
            },
            headers: {
                'Content-Type':'application/x-www-form-urlencoded;charset=utf-8',
                'AppKey':webimConfig.appKey,
                'Nonce':webimConfig.nonce,
                'CurTime':curTime,
                'CheckSum':this.token,
            }
        };
        client.post(__REST_REGISTGROUP, args , function (data, response) {
            logger.debug('webim add group end');
            logger.debug(JSON.stringify(data));
            callback && callback(data);
        });
    },
    /**
     * 为群组添加用户
     * @param params
     * @param callback
     */
    addUser2Group:function(group_id,username,callback){
        logger.debug('webim add user to group start');
        //暂时不实现，用web端接口进行处理
    }
});

module.exports = target;