/**
 * 客户Dao
 */
var Calendar = require('../libs/calendar');
var mySqlPool = require('../database/mysqlpool');
var utils = require('../libs/utils');
var table = 't_customer', mainKey = 'customer_id';

module.exports = {
    /**
     * 客户列表查询
     * @param callback 回调
     */
    customerSearch:function(params,callback){
        
        var condition = [] , _params, _callback;
        if(Object.prototype.toString.call(params) == '[object Function]'){
            _callback = params;
            _params = null;
        }else{
            _callback = callback;
            _params = params;
        }
        condition.push(' 1=1 ');
        if(_params){
            params.key && condition.push(' (t1.customer_name like \'%'+params.key+'%\' or t1.customer_job like \'%'+params.key+'%\' or t1.customer_code like \'%'+params.key+'%\') ');
            params.company_id && condition.push(' t1.company_id =\''+params.company_id+'\' ');
        }

        condition = condition.join(' and ');
        var selectSql = 'select t1.*',fromSql = 'from '+table+' t1  where '+condition;

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
     * 客户列表查询(关联公司数据）
     * @param callback 回调
     */
    customerSearch:function(params,callback){

        var condition = [] , _params, _callback;
        if(Object.prototype.toString.call(params) == '[object Function]'){
            _callback = params;
            _params = null;
        }else{
            _callback = callback;
            _params = params;
        }
        condition.push(' t1.company_id=t2.company_id ');
        if(_params){
            params.key && condition.push(' (t1.customer_name like \'%'+params.key+'%\' or t1.customer_job like \'%'+params.key+'%\' or t1.customer_code like \'%'+params.key+'%\') ');
            params.company_id && condition.push(' t1.company_id =\''+params.company_id+'\' ');
        }

        condition = condition.join(' and ');
        var selectSql = 'select t1.*,t2.*',fromSql = 'from '+table+' t1, t_company t2  where '+condition;

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
     * 根据客户id查询客户
     * @param customer_id 客户id
     * @param callback 回调
     */
    customerSearchById:function(customer_id,callback){
        var selectSql = "select t1.* from "+table+" t1  where t1."+mainKey+" = '"+customer_id+"'";
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
     * 添加客户
     * @param params
     * @param callback
     */
    addCustomer:function(params,callback){
        params[mainKey] = utils.guid();
        params.create_time = Calendar.getInstance().format('yyyyMMdd HH:mm:ss');
        params.update_time = Calendar.getInstance().format('yyyyMMdd HH:mm:ss');
        var insertSql = 'INSERT INTO '+table+' set ?';

        var execArr = [
            {sql:insertSql,params:params}];
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
     * 修改客户数据
     * @param params 参数包
     * @param callback 回调
     */
    modifyCustomer:function(params,callback){
        var sql = 'update '+table+' set ', condition = [], pArr = [];
        for(var key in params){
            if(key == mainKey)
                continue;
            condition.push(' '+key+' = ? ');
            pArr.push(params[key]);
        }
        condition.push(" update_time = '"+Calendar.getInstance().format('yyyyMMdd HH:mm:ss')+"' ");
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
     * 修改客户数据所属公司
     * @param customer_id 客户id列表
     * @param company_id 公司id
     * @param callback 回调
     */
    modifyCustomerCompany:function(customer_id,company_id,callback){
        //将id列表（id,id,id）替换成'id','id','id'便于使用in语句进行批量修改
        customer_id = customer_id.replace(/([^,]{32})(,)?/gi,"'$1'$2");
        var sql = 'update '+table+' set company_id=? where '+mainKey+' in ('+customer_id+')';
        var pArr = [company_id];
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
     * 复制客户数据到另一个菜单
     * @param customer_id 客户id列表
     * @param company_id 公司id
     * @param callback 回调
     */
    copyCustomerCompany:function(customer_id,company_id,callback){
        //将id列表（id,id,id）替换成'id','id','id'便于使用in语句进行批量修改
        customer_id = customer_id.replace(/([^,]{32})(,)?/gi,"'$1'$2");
        var selectSql = "select t1.* from "+table+" t1  where t1."+mainKey+" in ("+customer_id+")";
        mySqlPool.getConnection(function(connection){
            connection.query(selectSql,function(err,result){
                if(err){
                    callback && callback(err);
                    connection.release();
                    return;
                }
                var arr = [];
                for(var i = 0;i<result.length;i++){
                    arr.push([utils.guid(),
                        result[i].customer_code,
                        result[i].customer_name,
                        result[i].customer_job,
                        result[i].tel,
                        result[i].qq,
                        result[i].mail,
                        result[i].customer_mark,
                        company_id,
                        Calendar.getInstance().format('yyyyMMdd HH:mm:ss'),
                        Calendar.getInstance().format('yyyyMMdd HH:mm:ss')]);
                }

                var insertSql = 'INSERT INTO '+table+'(customer_id,customer_code,customer_name,customer_job,tel,qq,mail,customer_mark,company_id,create_time,update_time) VALUES ?';
                connection.query(insertSql,[arr],function(err,result){
                    if(err){
                        callback && callback(err);
                        connection.release();
                        return;
                    }
                    callback && callback(false,result[0]);
                    connection.release();
                });
            });
        });
    },
    /**
     * 删除客户
     * @param customer_id 客户id
     * @param callback
     */
    removeCustomer:function(customer_id,callback){
        //将id列表（id,id,id）替换成'id','id','id'便于使用in语句进行批量删除
        customer_id = customer_id.replace(/([^,]{32})(,)?/gi,"'$1'$2");
        var execArr = [
            {sql:"DELETE FROM "+table+" WHERE "+mainKey+" in ("+customer_id+")"}];
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