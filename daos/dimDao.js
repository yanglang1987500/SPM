/**
 * 字典Dao
 */
var Calendar = require('../libs/calendar');
var mySqlPool = require('../database/mysqlpool');
var utils = require('../libs/utils');
var table = 't_dim', mainKey = 'id';

module.exports = {
    /**
     * 字典列表查询
     * @param callback 回调
     */
    dimSearch:function(params,callback){
        
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
            params.key && condition.push(' (t1.dim_name like \'%'+params.key+'%\' or t1.dim_value like \'%'+params.key+'%\') ');
            (params.group_id && params.group_id!= '0') && condition.push(' t1.group_id = ' + params.group_id);
        }

        condition = condition.join(' and ');
        var selectSql = 'select t1.* ',fromSql = 'from '+table+' t1  where '+condition+' order by t1.group_id asc';

        mySqlPool.getConnection(function(connection){
            connection.query(selectSql+fromSql,function(err,result){
                if(err){
                    _callback && _callback(err);
                    return;
                }
                _callback && _callback(false,result);
                connection.release();
            });
        });

    },
    /**
     * 根据字典id查询字典项
     * @param id 字典id
     * @param callback 回调
     */
    dimSearchById:function(id,callback){
        var selectSql = "select t1.* from "+table+" t1  where t1."+mainKey+" = '"+id+"'";
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
     * 根据字典分组id查询字典项
     * @param group_id 字典分组id
     * @param callback 回调
     */
    dimSearchByGroupId:function(group_id,callback){
        var selectSql = "select t1.* from "+table+" t1  where t1.group_id = '"+group_id+"'";
        mySqlPool.getConnection(function(connection){
            connection.query(selectSql,function(err,result){
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
     * 查询所有分组
     * @param callback 回调
     */
    dimGroupSearch:function(callback){
        var selectSql = "select distinct t1.group_id,t1.group_name from "+table+" t1  ";
        mySqlPool.getConnection(function(connection){
            connection.query(selectSql,function(err,result){
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
     * 添加字典
     * 同时写入sys_auth权限表
     * @param params
     * @param callback
     */
    addDim:function(params,callback){
        params[mainKey] = utils.guid();
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
     * 修改字典数据
     * @param params 参数包
     * @param callback 回调
     */
    modifyDim:function(params,callback){
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
                    return;
                }
                callback && callback(false,result);
                connection.release();
            });
        });
    },
    /**
     * 删除字典
     * @param id 字典id
     * @param callback
     */
    removeDim:function(id,callback){
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