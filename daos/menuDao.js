/**
 * 菜单Dao
 */
var Calendar = require('../libs/calendar');
var mySqlPool = require('../database/mysqlpool');
var guid = require('guid');
var table = 'sys_menu', mainKey = 'menu_id';

module.exports = {
    /**
     * 菜单列表查询
     * @param page 当前页数
     * @param rows 每页显示数目
     * @param callback 回调
     */
    roleListSearch:function(page,rows,callback){
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
     * 根据菜单id查询菜单
     * @param menu_id 菜单id
     * @param callback 回调
     */
    roleListSearchById:function(menu_id,callback){
        var selectSql = "select * from "+table+" where "+mainKey+" = '"+menu_id+"'";
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
     * 添加菜单
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
     * 修改菜单数据
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
     * 删除菜单
     * @param menu_id 菜单id
     * @param callback
     */
    removeRole:function(menu_id,callback){
        mySqlPool.getConnection(function(connection){
            connection.query("DELETE FROM "+table+" WHERE "+mainKey+" = '"+menu_id+"'", function (err, result) {
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