/**
 * Created by 杨浪 on 2017/1/12.
 */
//webim接口定义
var logger = require('../../framework/logger').logger('webIMDaoInterface');

module.exports = {
    token:'',
    init:function(){
        logger.debug('super-init-初始化token');
    },
    /**
     * 添加用户
     * @param params
     * @param callback
     */
    addUser:function(username,password,callback){
        logger.debug('super-addUser-添加用户');
    },
    /**
     * 查找用户
     * @param params
     * @param callback
     */
    searchUser:function(username,callback){
        logger.debug('super-searchUser-查找用户');
    },
    /**
     * 添加群组
     * @param params
     * @param callback
     */
    addGroup:function(param,callback){
        logger.debug('super-addGroup-添加群组');
    },
    /**
     * 为群组添加用户
     * @param params
     * @param callback
     */
    addUser2Group:function(group_id,username,callback){
        logger.debug('super-addUser2Group-为群组添加用户');
    }
};
