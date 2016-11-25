/**
 * 登录日志Dao
 */
var Calendar = require('../libs/calendar');
var mySqlPool = require('../database/mysqlpool');
var utils = require('../libs/utils');
var table = 'sys_log', mainKey = 'log_id';

module.exports = {
    /**
     * 登录日志列表查询
     * @param callback 回调
     */
    logSearch:function(params,callback){

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
        }

        condition = condition.join(' and ');
        var selectSql = 'select t1.*',fromSql = 'from '+table+' t1  where '+condition + ' order by t1.login_time desc';

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
     * 添加登录日志
     * @param params
     * @param callback
     */
    addLog:function(params,callback){
        params[mainKey] = utils.guid();
        params.create_time = Calendar.getInstance().format('yyyyMMdd HH:mm:ss');
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
    }
};