/**
 * 组织机构Dao
 */
var Calendar = require('../libs/calendar');
var mySqlPool = require('../database/mysqlpool');
var guid = require('guid');
var table = 'sys_org', mainKey = 'org_id';

module.exports = {
    /**
     * 组织机构列表查询
     * @param page 当前页数
     * @param rows 每页显示数目
     * @param callback 回调
     */
    orgListSearch:function(page,rows,callback){
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
     * 根据组织机构id查询组织机构
     * @param org_id 组织机构id
     * @param callback 回调
     */
    orgListSearchById:function(org_id,callback){
        var selectSql = "select * from "+table+" where "+mainKey+" = '"+org_id+"'";
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
     * 添加组织机构
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
     * 修改组织机构数据
     * @param params 参数包
     * @param callback 回调
     */
    modifyOrg:function(params,callback){
        var sql = 'update '+table+' set ', condition = [], pArr = [];
        for(var key in params){
            if(key == mainKey)
                continue;
            condition.push(' '+key+' = ? ');
            pArr.push(params[key]);
        }
        sql += condition.join(',');
        sql += ' where '+"+mainKey+"+' = ? ';
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
     * 删除组织机构
     * @param org_id 组织机构id
     * @param callback
     */
    removeOrg:function(org_id,callback){
        mySqlPool.getConnection(function(connection){
            connection.query("DELETE FROM "+table+" WHERE "+mainKey+" = '"+org_id+"'", function (err, result) {
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