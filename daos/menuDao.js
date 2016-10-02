/**
 * 菜单Dao
 */
var Calendar = require('../libs/calendar');
var mySqlPool = require('../database/mysqlpool');
var guid = require('guid');
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
        if(_params)
            with(_params){
                key && condition.push(' (t1.menu_title like \'%'+key+'%\' or t1.menu_url like \'%'+key+'%\') ');
                (show_type == '1'||show_type == '2') && condition.push(' t1.show_type = ' + show_type);
                (menu_type == '1'||menu_type == '2') && condition.push(' t1.menu_type = ' + menu_type);
            }

        condition = condition.join(' and ');
        var selectSql = 'select t1.*,ifnull(t2.menu_title,\'根菜单\') menu_parent_title ',fromSql = 'from '+table+' t1 left join '+table+' t2 on t1.menu_parent_id=t2.menu_id where '+condition+' ';

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
                    return;
                }
                callback && callback(false,result[0]);
                connection.release();
            });
        });

    },
    /**
     * 添加菜单
     * @param params
     * @param callback
     */
    addMenu:function(params,callback){
        params[mainKey] = guid.raw().replace(/-/gi,'');
        var insertSql = 'INSERT INTO '+table+' set ?';
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
        mySqlPool.getConnection(function(connection){
            connection.query("DELETE FROM "+table+" WHERE "+mainKey+" = '"+menu_id+"'", function (err, result) {
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