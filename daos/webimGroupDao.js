/**
 * IM群组Dao
 */
var Calendar = require('../libs/calendar');
var mySqlPool = require('../database/mysqlpool');
var utils = require('../libs/utils');
var table = 't_im_group',mainKey = 'id';

module.exports = {
    /**
     * 群组列表查询
     * @param page 当前页数
     * @param rows 每页显示数目
     * @param params 查询条件
     * @param callback 回调
     */
    groupListSearch:function(page,rows,params,callback){
        var condition = [];
        condition.push(' 1=1 ');
        params.key && condition.push(' (name like \'%'+params.key+'%\' or description like \'%'+params.key+'%\') ');

        condition = condition.join(' and ');
        var selectSql = 'select * ',fromSql = ' from '+table+' where '+condition,
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
     * 根据群组id查询群组数据
     * @param id 群组id
     * @param callback 回调
     */
    groupSearchById:function(id,callback){
        var selectSql = "select * from "+table+" where "+mainKey+" = '"+id+"'";
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
     * 根据群组name查询群组数据
     * @param name 群组名称
     * @param callback 回调
     */
    groupSearchByName:function(name,callback){
        var selectSql = "select * from "+table+" where name = '"+name+"'";
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
     * 添加群组
     * @param params
     * @param callback
     */
    addGroup:function(params,callback){
        var insertSql = 'INSERT INTO '+table+' set ?';

        var execArr = [
            {sql:insertSql,params:params}];

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
     * 删除群组
     * @param id 群组id
     * @param callback
     */
    removeGroup:function(id,callback){
        //将id列表（id,id,id）替换成'id','id','id'便于使用in语句进行批量删除
        id = id.replace(/([^,]{18})(,)?/gi,"'$1'$2");
        var execArr = [
            {sql:"DELETE FROM "+table+" WHERE "+mainKey+" in ("+id+") "}];
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