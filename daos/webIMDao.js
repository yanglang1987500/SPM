/**
 * 用户Dao
 */
var utils = require('../libs/utils');
var Client = require('node-rest-client').Client;
var client = new Client();
var webimConfig = require('../framework/webim.config');
var logger = require('../framework/logger').logger('webIMDao');
var restAPI = webimConfig.appkey.replace('#','/');

var __REST_GETTOKEN = "https://a1.easemob.com/"+restAPI+"/token";
var __REST_REGISTUSER = "https://a1.easemob.com/"+restAPI+"/users";
var __REST_ADDGROUPUSER = "https://a1.easemob.com/"+restAPI+"/chatgroups/{group_id}/users/{username}";

module.exports = {
    token:'',
    init:function(){
        var that = this;
        logger.debug('webim server init token start');
        var args = {
            data: {'grant_type': 'client_credentials','client_id': webimConfig.clientId,'client_secret': webimConfig.clientSecret},
            headers: {'Content-Type':'application/json'}
        };
        client.post(__REST_GETTOKEN, args , function (data, response) {
            logger.debug('webim server init token end');
            logger.debug(JSON.stringify(data));
            that.token = data.access_token;
            setTimeout(function(){
                that.init();
            },data.expires_in-60000);//提前一分钟进行重新获取
        });
    },
    /**
     * 添加用户
     * @param params
     * @param callback
     */
    addUser:function(username,password,callback){
        logger.debug('webim regist user start');
        var args = {
            data:{"username":username,"password":password},
            headers: {'Content-Type':'application/json','Authorization':'Bearer '+this.token}
        };
        client.post(__REST_REGISTUSER, args , function (data, response) {
            logger.debug('webim regist user end');
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
        var args = {
            headers: {'Content-Type':'application/json','Authorization':'Bearer '+this.token}
        };
        client.get(__REST_REGISTUSER+'/'+username, args , function (data, response) {
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
        var args = {
            data:param,
            headers: {'Content-Type':'application/json','Authorization':'Bearer '+this.token}
        };
        client.post(__REST_REGISTUSER, args , function (data, response) {
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
        var args = {
            headers: {'Authorization':'Bearer '+this.token}
        };
        client.post(__REST_ADDGROUPUSER.replace('{group_id}',group_id).replace('{username}',username), args , function (data, response) {
            logger.debug('webim add user to group end');
            logger.debug(JSON.stringify(data));
            callback && callback(data);
        });
    }
};

