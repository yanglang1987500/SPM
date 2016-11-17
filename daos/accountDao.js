/**
 * 账目结算Dao
 */
var Calendar = require('../libs/calendar');
var mySqlPool = require('../database/mysqlpool');
var utils = require('../libs/utils');
var table = 't_account', mainKey = 'account_id';

module.exports = {
    /**
     * 账目结算列表查询
     * @param callback 回调
     */
    accountSearch:function(params,callback){
        
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
            _params.key && condition.push(' (t1.account_name like \'%'+_params.key+'%\' ) ');
            _params.startdate && condition.push(" t1.account_startdate >= '" + _params.startdate+"' ");
            _params.enddate && condition.push(" t1.account_enddate <= '" + _params.enddate+"' ");
            _params.company_id && condition.push(' t1.company_id =\''+_params.company_id+'\' ');
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
     * 根据账目结算id查询账目结算
     * @param account_id 账目结算id
     * @param callback 回调
     */
    accountSearchById:function(account_id,callback){
        var selectSql = "select t1.* from "+table+" t1  where t1."+mainKey+" = '"+account_id+"'";
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
     * 添加账目结算
     * @param params
     * @param callback
     */
    addAccount:function(params,callback){
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
     * 修改账目结算数据
     * @param params 参数包
     * @param callback 回调
     */
    modifyAccount:function(params,callback){
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
     * 删除账目结算
     * @param account_id 账目结算id
     * @param callback
     */
    removeAccount:function(account_id,callback){
        //将id列表（id,id,id）替换成'id','id','id'便于使用in语句进行批量删除
        account_id = account_id.replace(/([^,]{32})(,)?/gi,"'$1'$2");
        var execArr = [
            {sql:"DELETE FROM "+table+" WHERE "+mainKey+" in ("+account_id+")"}];
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
     * 封存账目结算
     * @param account_id 账目结算id
     * @param callback
     */
    encaseAccount:function(account_id,callback){
        //将id列表（id,id,id）替换成'id','id','id'便于使用in语句进行批量删除
        account_id = account_id.replace(/([^,]{32})(,)?/gi,"'$1'$2");
        var execArr = [
            {sql:"update "+table+" set is_encased=1 WHERE "+mainKey+" in ("+account_id+")"}];
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
     * 解除封存账目结算
     * @param account_id 账目结算id
     * @param callback
     */
    unencaseAccount:function(account_id,callback){
        //将id列表（id,id,id）替换成'id','id','id'便于使用in语句进行批量删除
        account_id = account_id.replace(/([^,]{32})(,)?/gi,"'$1'$2");
        var execArr = [
            {sql:"update "+table+" set is_encased=0 WHERE "+mainKey+" in ("+account_id+")"}];
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