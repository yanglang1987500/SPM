/**
 * 组织机构Dao
 */
var Calendar = require('../libs/calendar');
var mySqlPool = require('../database/mysqlpool');
var utils = require('../libs/utils');
var table = 'sys_org', mainKey = 'org_id';

module.exports = {
    /**
     * 组织机构列表查询
     * @param callback 回调
     */
    orgListSearch:function(callback){
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
     * 根据父组织机构id查询组织机构列表
     * @param org_id 组织机构id
     * @param callback 回调
     */
    orgListSearchByPId:function(org_id,callback){
        var selectSql = "select *,true isParent from "+table+" where org_parent_id = '"+org_id+"'";
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
     * 根据组织机构id查询用户列表
     * @param org_id 组织机构id
     * @param callback 回调
     */
    orgUserListSearchByOrgId:function(page,rows,org_id,params,callback){
        var condition = [];
        with(params){
            key && condition.push(' t2.user_name like \'%'+key+'%\' ');
            startdate && condition.push(" t2.create_time >= '" + startdate+"' ");
            enddate && condition.push(" t2.create_time <= '" + enddate+"' ");
            condition.push(" t1.org_id = t3.org_id ");
            condition.push(" t3.user_id = t2.user_id  ");
            condition.push(" t1.org_id = '"+org_id+"' ");
        }

        condition = condition.join(' and ');
        var selectSql = "select t2.* ",fromSql = " from sys_org t1,sys_user t2,sys_org_user t3 WHERE " +condition,
        pageSql = selectSql + fromSql + ' limit '+(page-1)*rows+','+rows,
            countSql = 'select count(1) cnt '+ fromSql;
        console.log(pageSql)
        mySqlPool.getConnection(function(connection){
            connection.query(pageSql,function(err,result){
                if(err){
                    callback && callback(err);
                    return;
                }
                connection.query(countSql,function(err2,sum){
                    if(err2){
                        callback && callback(err2);
                        return;
                    }
                    callback && callback(false,{rows:result,total:sum[0]['cnt']});
                    connection.release();
                });
            });
        });

    },
    /**
     * 根据组织机构id保存用户列表
     * @param org_id 组织机构id
     * @param user_ids 用户id列表
     * @param callback 回调
     */
    orgUserListSaveByOrgId:function(org_id,user_ids,callback){
        var arr = [];
        for(var i = 0;i<user_ids.length;i++){
            arr.push([utils.guid(),org_id,user_ids[i]]);
        }
        var execArr = [{sql:"DELETE FROM sys_org_user WHERE org_id = '"+org_id+"'"}];
        if(user_ids.length>0)
            execArr.push({sql:"INSERT INTO sys_org_user(id,org_id,user_id) VALUES ?",params:[arr]});
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
     * 添加组织机构
     * @param params
     * @param callback
     */
    addOrg:function(params,callback){
        params[mainKey] = utils.guid();
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
     * 删除组织机构
     * @param org_id 组织机构id
     * @param callback
     */
    removeOrg:function(org_id,callback){
        var execArr = [
            {sql:"DELETE FROM sys_org_role WHERE "+mainKey+" = '"+org_id+"'"},
            {sql:"DELETE FROM sys_org_user WHERE "+mainKey+" = '"+org_id+"'"},
            {sql:"DELETE FROM "+table+" WHERE "+mainKey+" = '"+org_id+"'"}];
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