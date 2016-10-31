/**
 * 元素Dao
 */
var Calendar = require('../libs/calendar');
var mySqlPool = require('../database/mysqlpool');
var utils = require('../libs/utils');
var table = 'sys_element', mainKey = 'element_id';

module.exports = {
    /**
     * 元素列表查询
     * @param callback 回调
     */
    elementSearch:function(params,callback){
        
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
            params.key && condition.push(' (t1.element_desc like \'%'+params.key+'%\' or t1.element_code like \'%'+params.key+'%\') ');
            params.menu_id && condition.push(' t1.menu_id =\''+params.menu_id+'\' ');
        }

        condition = condition.join(' and ');
        var selectSql = 'select t1.*',fromSql = 'from '+table+' t1  where '+condition;

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
     * 根据元素id查询元素
     * @param element_id 元素id
     * @param callback 回调
     */
    elementSearchById:function(element_id,callback){
        var selectSql = "select t1.* from "+table+" t1  where t1."+mainKey+" = '"+element_id+"'";
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
     * 添加元素
     * 同时写入sys_auth权限表
     * @param params
     * @param callback
     */
    addElement:function(params,callback){
        params[mainKey] = utils.guid();
        var insertSql = 'INSERT INTO '+table+' set ?';

        var execArr = [
            {sql:insertSql,params:params},
            {sql:"insert into sys_auth set ?",params:{
                auth_id:utils.guid(),
                auth_type:'element',
                resource_id:params[mainKey]
            }}];
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
     * 修改元素数据
     * @param params 参数包
     * @param callback 回调
     */
    modifyElement:function(params,callback){
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
     * 删除元素
     * @param element_id 元素id
     * @param callback
     */
    removeElement:function(element_id,callback){
        //将id列表（id,id,id）替换成'id','id','id'便于使用in语句进行批量删除
        element_id = element_id.replace(/([^,]{32})(,)?/gi,"'$1'$2");
        var execArr = [
            {sql:"DELETE FROM "+table+" WHERE "+mainKey+" in ("+element_id+")"},
            {sql:"DELETE FROM sys_auth WHERE resource_id in ("+element_id+")"}];
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