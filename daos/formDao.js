/**
 * 自定义表单Dao
 */
var Calendar = require('../libs/calendar');
var mySqlPool = require('../database/mysqlpool');
var utils = require('../libs/utils');
var table = 'sys_wf_form', mainKey = 'form_id';

module.exports = {
    /**
     * 自定义表单列表查询
     * @param callback 回调
     */
    formSearch:function(params,callback){
        
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
            params.key && condition.push(' (t1.form_title like \'%'+params.key+'%\' ');
        }

        condition = condition.join(' and ');
        var selectSql = 'select t1.* ',fromSql = 'from '+table+' t1  where '+condition+' order by t1.update_time desc';

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
     * 根据自定义表单id查询自定义表单项
     * @param id 自定义表单id
     * @param callback 回调
     */
    formSearchById:function(id,callback){
        var selectSql = "select t1.* from "+table+" t1  where t1."+mainKey+" = '"+id+"'";
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
     * 添加自定义表单
     * @param params
     * @param callback
     */
    addForm:function(params,callback){
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
     * 修改自定义表单数据
     * @param params 参数包
     * @param callback 回调
     */
    modifyForm:function(params,callback){
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
     * 删除自定义表单
     * @param id 自定义表单id
     * @param callback
     */
    removeForm:function(id,callback){
        //将id列表（id,id,id）替换成'id','id','id'便于使用in语句进行批量删除
        id = id.replace(/([^,]{32})(,)?/gi,"'$1'$2");
        var execArr = [
            {sql:"DELETE FROM "+table+" WHERE "+mainKey+" in ("+id+")"}];
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