/**
 * 权限Dao
 */
var Calendar = require('../libs/calendar');
var mySqlPool = require('../database/mysqlpool');
var utils = require('../libs/utils');
var table = 'sys_auth', mainKey = 'auth_id';

module.exports = {
    /**
     * 权限菜单列表查询
     * @param role_id 角色id
     * @param callback 回调
     */
    menuAuthTreeSearch:function(role_id,callback){
        var selectSql = "SELECT";
        selectSql += "	t1.*, t0.auth_id, ";
        selectSql += " IF (t2.auth_id IS NULL, 0, 1) AS checked ";
        selectSql += " FROM ";
        selectSql += "	sys_auth t0,";
        selectSql += "	sys_menu t1 ";
        selectSql += " LEFT JOIN (";
        selectSql += "	SELECT ";
        selectSql += "		t4.resource_id, ";
        selectSql += "		t4.auth_id " ;
        selectSql += "	FROM ";
        selectSql += "		sys_auth t4,";
        selectSql += "		sys_auth_role t5,";
        selectSql += "		sys_role t6";
        selectSql += "	WHERE";
        selectSql += "		t4.auth_id = t5.auth_id";
        selectSql += "	AND t5.role_id = t6.role_id";
        selectSql += "	AND t5.role_id = '"+role_id+"'";
        selectSql += ") t2 ON t1.menu_id = t2.resource_id ";
        selectSql += " WHERE ";
        selectSql += "	t0.resource_id = t1.menu_id";
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
     * 权限菜单保存
     * @param role_id 角色id
     * @param auth_ids 权限id列表
     * @param callback
     */
    menuAuthTreeSave:function(role_id,auth_ids,callback){
        var arr = [];
        for(var i = 0;i<auth_ids.length;i++){
            arr.push([utils.guid(),role_id,auth_ids[i]]);
        }
        var execArr = [{sql:"delete from sys_auth_role where auth_id in (select t1.auth_id from sys_auth t1 where t1.auth_type = 'menu') and role_id = '"+role_id+"' "}];
        if(auth_ids.length>0)
            execArr.push({sql:"INSERT INTO sys_auth_role(id,role_id,auth_id) VALUES ?",params:[arr]});
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
     * 根据用户id查询该用户的所有角色，包括用户所属组织机构具有的角色集合
     * @param userId 用户id
     * @param callback
     */
    queryUserRoleByUserId:function(userId,callback){
        var querySql = "";
        querySql += "select t2.role_id,t2.role_name from sys_user_role t1,sys_role t2 where t1.role_id = t2.role_id and t1.user_id = '"+userId+"'";
        querySql += "union ";
        querySql += "select t4.role_id,t4.role_name from sys_org_role t3,sys_role t4 where t3.org_id  ";
        querySql += "in (select t1.org_id from sys_org_user t1 where t1.user_id = '"+userId+"') ";
        querySql += "and t3.role_id = t4.role_id";
        mySqlPool.getConnection(function(connection){
            connection.query(querySql,function(err,result){
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
     * 查询角色所对应的所有权限对象
     * @param callback
     */
    queryRoleAuthority:function(callback){
        var querySql = "select t1.role_id,t1.role_name,t2.auth_id,t2.auth_type,t2.resource_id,t4.menu_url,t4.menu_parent_id  " +
            "from sys_role t1,sys_auth t2,sys_auth_role t3,sys_menu t4 " +
            "where t1.role_id = t3.role_id and t3.auth_id = t2.auth_id "+
            " and t2.resource_id = t4.menu_id";
        mySqlPool.getConnection(function(connection){
            connection.query(querySql,function(err,result){
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