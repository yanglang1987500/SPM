/**
 * 菜单Dao
 */
var Calendar = require('../libs/calendar');
var mySqlPool = require('../database/mysqlpool');
var utils = require('../libs/utils');
var table = 'sys_menu', mainKey = 'menu_id';
module.exports = {
    /**
     * 菜单列表查询
     * @param callback 回调
     */
    menuSearch:function(params,callback){
        
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
            _params.key && condition.push(' (t1.menu_title like \'%'+_params.key+'%\' or t1.menu_url like \'%'+_params.key+'%\') ');
            (_params.show_type && _params.show_type!= '0') && condition.push(' t1.show_type = ' + _params.show_type);
            (_params.menu_type && _params.menu_type!= '0') && condition.push(' t1.menu_type = ' + _params.menu_type);
            (_params.menu_device && _params.menu_device!= '0') && condition.push(' t1.menu_device = ' + _params.menu_device);
        }

        condition = condition.join(' and ');
        var selectSql = 'select t1.*,ifnull(t2.menu_title,\'根菜单\') menu_parent_title ',fromSql = 'from '+table+' t1 left join '+table+' t2 on t1.menu_parent_id=t2.menu_id where '+condition+' order by t1.menu_order desc';

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
     * 根据菜单id查询菜单
     * @param menu_id 菜单id
     * @param callback 回调
     */
    menuSearchById:function(menu_id,callback){
        var selectSql = "select t1.*,ifnull(t2.menu_title,\'根菜单\') menu_parent_title from "+table+" t1 left join "+table+" t2 on t1.menu_parent_id=t2.menu_id where t1."+mainKey+" = '"+menu_id+"'";
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
     * 添加菜单
     * 同时写入sys_auth权限表
     * @param params
     * @param callback
     */
    addMenu:function(params,callback){
        params[mainKey] = utils.guid();
        params['menu_order'] = utils.generatorOrder();
        var insertSql = 'INSERT INTO '+table+' set ?';

        var execArr = [
            {sql:insertSql,params:params},
            {sql:"insert into sys_auth set ?",params:{
                auth_id:utils.guid(),
                auth_type:'menu',
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
     * 修改菜单数据
     * @param params 参数包
     * @param callback 回调
     */
    modifyMenu:function(params,callback){
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
     * 删除菜单
     * @param menu_id 菜单id
     * @param callback
     */
    removeMenu:function(menu_id,callback){
        //将id列表（id,id,id）替换成'id','id','id'便于使用in语句进行批量删除
        menu_id = menu_id.replace(/([^,]{32})(,)?/gi,"'$1'$2");
        var execArr = [
            {sql:"DELETE FROM "+table+" WHERE "+mainKey+" in ("+menu_id+")"},
            {sql:"DELETE FROM sys_auth WHERE resource_id in ("+menu_id+")"}];
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