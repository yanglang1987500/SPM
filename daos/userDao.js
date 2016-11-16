/**
 * 用户Dao
 */
var Calendar = require('../libs/calendar');
var mySqlPool = require('../database/mysqlpool');
var utils = require('../libs/utils');
var table = 'sys_user',mainKey = 'user_id';

module.exports = {
    /**
     * 用户列表查询
     * @param page 当前页数
     * @param rows 每页显示数目
     * @param params 查询条件
     * @param callback 回调
     */
    userListSearch:function(page,rows,params,callback){
        var condition = [];
        condition.push(' 1=1 ');
        params.key && condition.push(' user_name like \'%'+params.key+'%\' ');
        params.startdate && condition.push(" create_time >= '" + params.startdate+"' ");
        params.enddate && condition.push(" create_time <= '" + params.enddate+"' ");

        condition = condition.join(' and ');
        var selectSql = 'select * ',fromSql = ' from '+table+' where '+condition+' order by update_time desc',
            pageSql = selectSql+ fromSql + ' limit '+(page-1)*rows+','+rows,
            countSql = 'select count(1) cnt '+ fromSql;
        mySqlPool.getConnection(function(connection){
            connection.query(pageSql,function(err,result){
                if(err){
                    callback && callback(err);
                    connection.release();
                    return;
                }
                connection.query(countSql,function(err2,sum){
                    if(err2){
                        callback && callback(err2);
                        connection.release();
                        return;
                    }
                    callback && callback(false,{rows:result,total:sum[0]['cnt']});
                    connection.release();
                });
            });
        });

    },
    /**
     * 根据用户id查询用户数据
     * @param user_id 用户id
     * @param callback 回调
     */
    userListSearchById:function(user_id,callback){
        var selectSql = "select * from "+table+" where "+mainKey+" = '"+user_id+"'";
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
     * 根据用户user_name查询用户数据
     * @param user_name 用户名
     * @param callback 回调
     */
    userInfoSearchByUserName:function(user_name,callback){
        var selectSql = "select * from "+table+" where user_name = '"+user_name+"'";
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
     * 添加用户
     * @param params
     * @param callback
     */
    addUser:function(params,callback){
        params.create_time = Calendar.getInstance().format('yyyyMMdd HH:mm:ss');
        params.update_time = Calendar.getInstance().format('yyyyMMdd HH:mm:ss');
        params[mainKey] = utils.guid();
        var org_id = params.org_id;
        delete params.org_id;

        var insertSql = 'INSERT INTO '+table+' set ?';

        var execArr = [
            {sql:insertSql,params:params}];
        if(org_id){
            execArr.push({sql:'INSERT INTO sys_org_user set ?',params:{id:utils.guid(),org_id:org_id,user_id:params[mainKey]}});
        }

        mySqlPool.execTrans(execArr,function(err,result){
            if(err){
                console.log(err.message);
                callback && callback(err);
                return;
            }
            callback && callback(false,result);
        });
    },
    /**
     * 修改用户数据
     * @param params 参数包
     * @param callback 回调
     */
    modifyUser:function(params,callback){
        params.update_time = Calendar.getInstance().format('yyyyMMdd HH:mm:ss');
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
     * 修改单个用户密码
     * @param userId 用户id
     * @param oldPassword 旧密码
     * @param newPassword 新密码
     * @param callback 回调
     */
    passwordModify:function(userId,oldPassword,newPassword,callback){
        var selectSql = "select * from "+table+" where user_password = '"+oldPassword+"' and user_id = '"+userId+"'";
        mySqlPool.getConnection(function(connection){
            connection.query(selectSql,function(err,result){
                if(err){
                    callback && callback(err);
                    connection.release();
                    return;
                }
                if(result.length>0){
                    var updateSql = "update "+table+" set user_password = '"+newPassword+"' where user_id = '"+userId+"' ";
                    connection.query(updateSql, function (err, result) {
                        if(err){
                            callback && callback(err);
                            connection.release();
                            return;
                        }
                        callback && callback(false,result);
                        connection.release();
                    });
                }else{
                    callback && callback({message:'原始密码不正确'});
                    connection.release();
                }
            });
        });
    },
    /**
     * 删除用户
     * @param user_id 用户id
     * @param callback
     */
    removeUser:function(user_id,callback){
        //将id列表（id,id,id）替换成'id','id','id'便于使用in语句进行批量删除
        user_id = user_id.replace(/([^,]{32})(,)?/gi,"'$1'$2");
        var execArr = [
            {sql:"DELETE FROM sys_org_user WHERE "+mainKey+" in ("+user_id+") "},
            {sql:"DELETE FROM sys_user_role WHERE "+mainKey+" in ("+user_id+") "},
            {sql:"DELETE FROM "+table+" WHERE "+mainKey+" in ("+user_id+") "}];
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