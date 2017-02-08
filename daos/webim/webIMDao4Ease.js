/**
 * webim环信接口
 */
var utils = require('../../libs/utils');
var Client = require('node-rest-client').Client;
var client = new Client();

var webimConfig = require('../../framework/webim.config')['Ease'];
var logger = require('../../framework/logger').logger('webIMDao4Ease');
var restAPI = webimConfig.appkey.replace('#','/');
var extend = require('extend');

var __REST_GETTOKEN = "https://a1.easemob.com/"+restAPI+"/token";
var __REST_REGISTUSER = "https://a1.easemob.com/"+restAPI+"/users";
var __REST_REGISTGROUP = "https://a1.easemob.com/"+restAPI+"/chatgroups";
var __REST_ADDGROUPUSER = "https://a1.easemob.com/"+restAPI+"/chatgroups/{group_id}/users/{username}";

var webIMDao = require('./webIMDaoInterface'),target = {};
extend(target, webIMDao, {
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
    addUser:function(username,nickname,password,callback){
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
            data:{
                "groupname":param.name, //群组名称，此属性为必须的
                "desc":param.desc, //群组描述，此属性为必须的
                "public":true, //是否是公开群，此属性为必须的
                "maxusers":300, //群组成员最大数（包括群主），值为数值类型，默认值200，最大值2000，此属性为可选的
                "approval":true, //加入公开群是否需要批准，默认值是false（加入公开群不需要群主批准），此属性为必选的，私有群必须为true
                "members":param.members, //群组成员，此属性为可选的，但是如果加了此项，数组元素至少一个（注：群主jma1不需要写入到members里面）
                "owner":param.owner //群组的管理员，此属性为必须的
            },
            headers: {'Content-Type':'application/json','Authorization':'Bearer '+this.token}
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
        var args = {
            headers: {'Authorization':'Bearer '+this.token}
        };
        client.post(__REST_ADDGROUPUSER.replace('{group_id}',group_id).replace('{username}',username), args , function (data, response) {
            logger.debug('webim add user to group end');
            logger.debug(JSON.stringify(data));
            callback && callback(data);
        });
    }
});


module.exports = target;