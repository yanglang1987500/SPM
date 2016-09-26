/**
 * 用户Dao
 */
var Calendar = require('../libs/calendar');
var mySqlPool = require('../database/mysqlpool');
var guid = require('guid');

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
        with(params){
            condition.push(' 1=1 ');
            key && condition.push(' user_name like \'%'+key+'%\' ');
            startdate && condition.push(" create_time >= '" + startdate+"' ");
            enddate && condition.push(" create_time <= '" + enddate+"' ");
        }

        condition = condition.join(' and ');
        var selectSql = 'select * ',fromSql = ' from sys_user where '+condition+' order by update_time desc',
            pageSql = selectSql+ fromSql + ' limit '+(page-1)*rows+','+rows,
            countSql = 'select count(1) cnt '+ fromSql;
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
     * 根据用户id查询用户数据
     * @param user_id 用户id
     * @param callback 回调
     */
    userListSearchById:function(user_id,callback){
        var selectSql = "select * from sys_user where user_id = '"+user_id+"'";
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
     * 添加用户
     * @param params
     * @param callback
     */
    addUser:function(params,callback){
        params.create_time = Calendar.getInstance().format('yyyyMMdd HH:mm:ss');
        params.update_time = Calendar.getInstance().format('yyyyMMdd HH:mm:ss');
        params.user_id = guid.raw().replace(/-/gi,'');
        var insertSql = 'INSERT INTO sys_user set ?';
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
     * 修改用户数据
     * @param params 参数包
     * @param callback 回调
     */
    modifyUser:function(params,callback){
        params.update_time = Calendar.getInstance().format('yyyyMMdd HH:mm:ss');
        var sql = 'update sys_user set ', condition = [], pArr = [];
        for(var key in params){
            if(key == 'user_id')
                continue;
            condition.push(' '+key+' = ? ');
            pArr.push(params[key]);
        }
        sql += condition.join(',');
        sql += ' where user_id = ? ';
        pArr.push(params.report_id);
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
     * 删除用户
     * @param user_id 用户id
     * @param callback
     */
    removeReport:function(user_id,callback){
        mySqlPool.getConnection(function(connection){
            connection.query("DELETE FROM sys_user WHERE user_id = '"+user_id+"'", function (err, result) {
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