/**
 * 角色Dao
 */
var Calendar = require('../libs/calendar');
var mySqlPool = require('../database/mysqlpool');
var utils = require('../libs/utils');
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
            params.key && condition.push(' role_name like \'%'+params.key+'%\'  ');

        condition = condition.join(' and ');
        var selectSql = 'select * ',fromSql = 'from '+table+'  where '+condition+' ';

        mySqlPool.getConnection(function(connection){
            connection.query(selectSql+fromSql,function(err,result){
                if(err){
                    _callback && _callback(err);
                    connection.release();
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
                    connection.release();
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
                    connection.release();
                    return;
                }
                callback && callback(false,result);
                connection.release();
            });
        });

    },
    /**
     * 根据角色id查询其所有用户
     * @param role_id 角色id
     * @param callback 回调
     */
    roleUserListSearchByRoleId:function(role_id,callback){
        var selectSql = "select t1.* from sys_user t1,sys_user_role t2 where t1.user_id=t2.user_id and t2.role_id = '"+role_id+"'";
        mySqlPool.getConnection(function(connection){
            connection.query(selectSql,function(err,result){
                if(err){
                    callback && callback(err);
                    connection.release();
                    return;
                }
                callback && callback(false,result);
                connection.release();
            });
        });

    },
    /**
     * 根据角色id保存所有用户
     * @param role_id 角色id
     * @param user_ids 用户id列表
     * @param callback 回调
     */
    roleUserListSaveByRoleId:function(role_id,user_ids,callback){
        var arr = [];
        for(var i = 0;i<user_ids.length;i++){
            arr.push([utils.guid(),role_id,user_ids[i]]);
        }
        var execArr = [{sql:"DELETE FROM sys_user_role WHERE role_id = '"+role_id+"'"}];
        if(user_ids.length>0)
            execArr.push({sql:"INSERT INTO sys_user_role(id,role_id,user_id) VALUES ?",params:[arr]});
        mySqlPool.execTrans(execArr,function(err,result){
            if(err){
                console.log(err);
                callback && callback(err);
                return;
            }
            callback && callback(false,result);
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
                    connection.release();
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
        var arr = [];
        for(var i = 0;i<role_ids.length;i++){
            arr.push([utils.guid(),user_id,role_ids[i]]);
        }
        var execArr = [{sql:"DELETE FROM sys_user_role WHERE user_id = '"+user_id+"'"}];
        if(role_ids.length>0)
            execArr.push({sql:"INSERT INTO sys_user_role(id,user_id,role_id) VALUES ?",params:[arr]});
        mySqlPool.execTrans(execArr,function(err,result){
            if(err){
                console.log(err);
                callback && callback(err);
                return;
            }
            callback && callback(false,result);
        });
    },
    /**
     * 根据组织机构id保存角色
     * @param org_id 组织机构id
     * @param role_ids 角色id列表
     * @param callback 回调
     */
    orgRoleListSaveByOrgId:function(org_id,role_ids,callback){
        var arr = [];
        for(var i = 0;i<role_ids.length;i++){
            arr.push([utils.guid(),org_id,role_ids[i]]);
        }
        var execArr = [{sql:"DELETE FROM sys_org_role WHERE org_id = '"+org_id+"'"}];
        if(role_ids.length>0)
            execArr.push({sql:"INSERT INTO sys_org_role(id,org_id,role_id) VALUES ?",params:[arr]});
        mySqlPool.execTrans(execArr,function(err,result){
            if(err){
                console.log(err);
                callback && callback(err);
                return;
            }
            callback && callback(false,result);
        });
    },
    /**
     * 添加角色
     * @param params
     * @param callback
     */
    addRole:function(params,callback){
        params[mainKey] = utils.guid();
        var insertSql = 'INSERT INTO '+table+' set ?';
        mySqlPool.getConnection(function(connection){
            connection.query(insertSql,params,function(err,result){
                if(err){
                    callback && callback(err);
                    connection.release();
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
                    connection.release();
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
        //将id列表（id,id,id）替换成'id','id','id'便于使用in语句进行批量删除
        role_id = role_id.replace(/([^,]{32})(,)?/gi,"'$1'$2");
        var execArr = [
            {sql:"DELETE FROM sys_org_role WHERE "+mainKey+" in ("+role_id+") "},
            {sql:"DELETE FROM sys_user_role WHERE "+mainKey+" in ("+role_id+") "},
            {sql:"DELETE FROM "+table+" WHERE "+mainKey+" in ("+role_id+") "}]
        mySqlPool.execTrans(execArr,function(err,result){
            if(err){
                console.log(err);
                callback && callback(err);
                return;
            }
            callback && callback(false,result);
        });
    }
};