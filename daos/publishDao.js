var Calendar = require('../libs/calendar');
var mySqlPool = require('../database/mysqlpool');
var guid = require('guid');

module.exports = {
    /**
     * 学校信息发布查询
     * @param page 当前页数
     * @param rows 每页显示数目
     * @param params 查询条件
     * @param callback 回调
     */
    publishSearch:function(page,rows,params,callback){
        var condition = [];
        with(params){
            condition.push(' 1=1 ');
            key && condition.push(' publish_title like \'%'+key+'%\' ');
            (is_show == '0'||is_show == '1') && condition.push(' is_show = ' + is_show);
            (is_publish == '0'||is_publish == '1') && condition.push(' is_publish = ' + is_publish);
            startdate && condition.push(" create_time >= '" + startdate+"' ");
            enddate && condition.push(" create_time <= '" + enddate+"' ");
        }

        condition = condition.join(' and ');
        var selectSql = 'select publish_id,publish_title,substr(publish_content_pure,1,20) publish_content_pure'+(params.detail?',publish_content':'')+', user_id,create_time,update_time,is_show,is_publish ',fromSql = 'from t_publish where '+condition+' order by update_time desc',
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
     * 学校信息发布查询
     * @param publish_id 信息id
     * @param callback 回调
     */
    publishSearchById:function(id,callback){
        var selectSql = "select * from t_publish where publish_id = '"+id+"'";
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
     * 新增学校信息
     * @param params 参数包
     * @param callback 回调
     */
    addPublish:function(params,callback){
        params.create_time = Calendar.getInstance().format('yyyyMMdd HH:mm:ss');
        params.update_time = Calendar.getInstance().format('yyyyMMdd HH:mm:ss');
        params.publish_id = guid.raw().replace(/-/gi,'');
        var insertSql = 'INSERT INTO t_publish set ?';
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
     * 修改学校信息
     * @param params 参数包
     * @param callback 回调
     */
    modifyPublish:function(params,callback){
        params.update_time = Calendar.getInstance().format('yyyyMMdd HH:mm:ss');
        var sql = 'update t_publish set ', condition = [], pArr = [];
        for(var key in params){
            if(key == 'publish_id')
                continue;
            condition.push(' '+key+' = ? ');
            pArr.push(params[key]);
        }
        sql += condition.join(',');
        sql += ' where publish_id = ? ';
        pArr.push(params.publish_id);
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
     * 删除信息
     * @param publish_id 信息id
     * @param callback
     */
    removePublish:function(publish_id,callback){
        mySqlPool.getConnection(function(connection){
            connection.query("DELETE FROM t_publish WHERE publish_id = '"+publish_id+"'", function (err, result) {
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