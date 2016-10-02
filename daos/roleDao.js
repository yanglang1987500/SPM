/**
 * 角色Dao
 */
var Calendar = require('../libs/calendar');
var mySqlPool = require('../database/mysqlpool');
var guid = require('guid');
var table = 'sys_role', mainKey = 'role_id';

module.exports = {
    /**
     * 角色列表查询
     * @param callback 回调
     */
    roleListSearch:function(params,callback){

        var condition = [] , _params, _callback;
        if(Object.prototype.toString.call(params) == '[object Function]'){
            _callback = params;
            _params = null;
        }else{
            _callback = callback;
            _params = params;
        }
        condition.push(' 1=1 ');
        if(_params)
            with(_params){
                key && condition.push(' role_name like \'%'+key+'%\'  ');
            }
        condition = condition.join(' and ');
        var selectSql = 'select * ',fromSql = 'from '+table+'  where '+condition+' ';

        mySqlPool.getConnection(function(connection){
            connection.query(selectSql+fromSql,function(err,result){
                if(err){
                    _callback && _callback(err);
                    return;
                }
                _callback && _callback(false,result);
                connection.release();
            });
        });
    },
    /**
     * 根据角色id查询角色
     * @param role_id 角色id
     * @param callback 回调
     */
    roleListSearchById:function(role_id,callback){
        var selectSql = "select * from "+table+" where "+mainKey+" = '"+role_id+"'";
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
     * 根据用户id查询其所有角色
     * @param user_id 用户id
     * @param callback 回调
     */
    userRoleListSearchByUserId:function(user_id,callback){
        var selectSql = "select t1.* from "+table+" t1,sys_user_role t2 where t1.role_id=t2.role_id and t2.user_id = '"+user_id+"'";
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
     * 根据组织机构id查询其所有角色
     * @param org_id 组织机构id
     * @param callback 回调
     */
    orgRoleListSearchByOrgId:function(org_id,callback){
        var selectSql = "select t1.* from "+table+" t1,sys_org_role t2 where t1.role_id=t2.role_id and t2.org_id = '"+org_id+"'";
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
     * 根据用户id保存角色
     * @param user_id 用户id
     * @param role_ids 角色id列表
     * @param callback 回调
     */
    userRoleListSaveByUserId:function(user_id,role_ids,callback){
        mySqlPool.getConnection(function(connection){
            connection.query("DELETE FROM sys_user_role WHERE user_id = '"+user_id+"'", function (err, result) {
                if(err){
                    console.log(err);
                    callback && callback(err);
                    return;
                }
                if(role_ids.length == 0){
                    callback && callback(false,result);
                    return;
                }
                var insertSql = 'INSERT INTO sys_user_role(user_id,role_id) VALUES ?';
                var arr = [];
                for(var i = 0;i<role_ids.length;i++){
                    arr.push([user_id,role_ids[i]]);
                }
                connection.query(insertSql,[arr],function(err,result){
                    if(err){
                        console.log(err);
                        callback && callback(err);
                        return;
                    }
                    callback && callback(false,result);
                    connection.release();
                });
            });
        });
    },
    /**
     * 添加角色
     * @param params
     * @param callback
     */
    addRole:function(params,callback){
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
     * 修改角色数据
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
     * 删除角色
     * @param role_id 角色id
     * @param callback
     */
    removeRole:function(role_id,callback){
        mySqlPool.getConnection(function(connection){
            connection.query("DELETE FROM "+table+" WHERE "+mainKey+" = '"+role_id+"'", function (err, result) {
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