/**
 * 权限Dao
 */
var Calendar = require('../libs/calendar');
var mySqlPool = require('../database/mysqlpool');
var guid = require('guid');
var table = 'sys_auth', mainKey = 'auth_id';

module.exports = {
    /**
     * 权限列表查询
     * @param callback 回调
     */
    roleListSearch:function(callback){
        var selectSql = 'select * from  '+table;
        mySqlPool.getConnection(function(connection){
            connection.query(selectSql,function(err,result){
                if(err){
                    callback && callback(err);
                    return;
                }
                callback && callback(false,result);
                connection.release();
            });
        });

    },
    /**
     * 根据权限id查询权限
     * @param auth_id 权限id
     * @param callback 回调
     */
    roleListSearchById:function(auth_id,callback){
        var selectSql = "select * from "+table+" where "+mainKey+" = '"+auth_id+"'";
        mySqlPool.getConnection(function(connection){
            connection.query(selectSql,function(err,result){
                if(err){
                    callback && callback(err);
                    return;
                }
                callback && callback(false,result[0]);
                connection.release();
            });
        });

    },
    /**
     * 添加权限
     * @param params
     * @param callback
     */
    addOrg:function(params,callback){
        params[mainKey] = guid.raw().replace(/-/gi,'');
        var insertSql = 'INSERT INTO '+table+' set ?';
        mySqlPool.getConnection(function(connection){
            connection.query(insertSql,params,function(err,result){
                if(err){
                    callback && callback(err);
                    return;
                }
                callback && callback(false,result);
                connection.release();
            });
        });
    },
    /**
     * 修改权限数据
     * @param params 参数包
     * @param callback 回调
     */
    modifyRole:function(params,callback){
        var sql = 'update '+table+' set ', condition = [], pArr = [];
        for(var key in params){
            if(key == mainKey)
                continue;
            condition.push(' '+key+' = ? ');
            pArr.push(params[key]);
        }
        sql += condition.join(',');
        sql += ' where '+mainKey+' = ? ';
        pArr.push(params[mainKey]);
        mySqlPool.getConnection(function(connection) {
            connection.query(sql, pArr, function (err, result) {
                if(err){
                    callback && callback(err);
                    return;
                }
                callback && callback(false,result);
                connection.release();
            });
        });
    },
    /**
     * 删除权限
     * @param auth_id 权限id
     * @param callback
     */
    removeRole:function(auth_id,callback){
        mySqlPool.getConnection(function(connection){
            connection.query("DELETE FROM "+table+" WHERE "+mainKey+" = '"+auth_id+"'", function (err, result) {
                if(err){
                    callback && callback(err);
                    return;
                }
                callback && callback(false,result);
                connection.release();
            });
        });
    }
};