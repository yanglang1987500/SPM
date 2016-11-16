var Calendar = require('../libs/calendar');
var mySqlPool = require('../database/mysqlpool');

module.exports = {
    /**
     * 学生考勤查询
     * @param page 当前页数
     * @param rows 每页显示数目
     * @param params 查询条件
     * @param callback 回调
     */
    attenceSearch:function(page,rows,params,callback){
        var condition = [];

        params.key && condition.push(' t1.stu_name like \'%'+params.key+'%\' ');
        (params.type=='0'||params.type=='1') && condition.push(' t2.type = ' + params.type);
        params.startdate && condition.push(" t2.create_time >= '" + params.startdate+"' ");
        params.enddate && condition.push(" t2.create_time <= '" + params.enddate+"' ");
        condition.push(' t1.rfid = t2.rfid ');

        condition = condition.join(' and ');
        var selectSql = 'select t1.stu_id,t1.stu_name,t2.type,t1.rfid,t2.create_time  ',fromSql = 'from t_student t1,t_rflog t2 where '+condition+' order by t2.create_time asc,t1.stu_id',
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
     * 学生考勤统计
     * @param params 查询条件
     * @param callback 回调
     */
    attenceAnalyse:function(params,needDate,callback){
        var condition = [];
        params.type && condition.push(' t2.type = ' + params.type);
        params.startdate && condition.push(" t2.create_time >= '" + params.startdate+"' ");
        params.enddate && condition.push(" t2.create_time <= '" + Calendar.getInstance(params.enddate).format('yyyyMMdd 23:59:59')+"' ");
        condition.push(' t1.rfid = t2.rfid ');

        condition = condition.join(' and ');

        var caseSql = 'case when substr(t2.create_time,10,8)'+(params.type==1?'>':'<')+'(select dim_value from t_dim t3 where t3.group_id = 1 and t3.dim_id='+(params.type==1?1:2)+') then 1 else 0 end isout ';

        var selectSql = 'SELECT count(1) cnt,t2.type'+(needDate?',substr(t2.create_time,1,8) date':'')+', '+caseSql,
            fromSql = 'from t_student t1,t_rflog t2 where '+condition+' group by t2.type,isout'+(needDate?',date':'')+'',
            sumSql = selectSql+ fromSql ;
        mySqlPool.getConnection(function(connection){
            connection.query(sumSql,function(err,result){
                if(err){
                    callback && callback(err);
                    connection.release();
                    return;
                }
                callback && callback(false,result);
                connection.release();
            });
        });
    }
};