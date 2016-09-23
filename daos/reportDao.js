/**
 * 智能报修处理
 */
var Calendar = require('../libs/calendar');
var mySqlPool = require('../database/mysqlpool');
var guid = require('guid');

module.exports = {
    /**
     * 报修信息查询
     * @param page 当前页数
     * @param rows 每页显示数目
     * @param params 查询条件
     * @param callback 回调
     */
    reportSearch:function(page,rows,params,callback){
        var condition = [];
        with(params){
            condition.push(' 1=1 ');
            key && condition.push(' report_title like \'%'+key+'%\' ');
            (is_handle == '0'||is_handle == '1') && condition.push(' is_handle = ' + is_handle);
            startdate && condition.push(" create_time >= '" + startdate+"' ");
            enddate && condition.push(" create_time <= '" + enddate+"' ");
        }

        condition = condition.join(' and ');
        var selectSql = 'select report_id,report_title ,report_content, user_id,photos,create_time,update_time,is_handle ',fromSql = ' from t_report where '+condition+' order by update_time desc',
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
     * 报修信息查询
     * @param report_id 信息id
     * @param callback 回调
     */
    reportSearchById:function(id,callback){
        var selectSql = "select * from t_report where report_id = '"+id+"'";
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
     * 新增报修信息
     * @param params 参数包
     * @param callback 回调
     */
    addReport:function(params,callback){
        params.create_time = Calendar.getInstance().format('yyyyMMdd HH:mm:ss');
        params.update_time = Calendar.getInstance().format('yyyyMMdd HH:mm:ss');
        params.report_id = guid.raw().replace(/-/gi,'');
        var insertSql = 'INSERT INTO t_report set ?';
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
     * 修改报修信息
     * @param params 参数包
     * @param callback 回调
     */
    modifyReport:function(params,callback){
        params.update_time = Calendar.getInstance().format('yyyyMMdd HH:mm:ss');
        var sql = 'update t_report set ', condition = [], pArr = [];
        for(var key in params){
            if(key == 'report_id')
                continue;
            condition.push(' '+key+' = ? ');
            pArr.push(params[key]);
        }
        sql += condition.join(',');
        sql += ' where report_id = ? ';
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
     * 删除报修信息
     * @param report_id 信息id
     * @param callback
     */
    removeReport:function(report_id,callback){
        mySqlPool.getConnection(function(connection){
            connection.query("DELETE FROM t_report WHERE report_id = '"+report_id+"'", function (err, result) {
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