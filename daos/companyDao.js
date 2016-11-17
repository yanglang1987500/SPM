/**
 * 公司Dao
 */
var Calendar = require('../libs/calendar');
var mySqlPool = require('../database/mysqlpool');
var utils = require('../libs/utils');
var table = 't_company', mainKey = 'company_id';
module.exports = {
    /**
     * 公司列表查询
     * @param callback 回调
     */
    companySearch:function(params,callback){
        
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
            params.key && condition.push(' (t1.company_name like \'%'+params.key+'%\' or t1.render_username like \'%'+params.key+'%\') ');
        }

        condition = condition.join(' and ');
        var selectSql = 'select t1.*, 0 as pId ',fromSql = 'from '+table+' t1 where '+condition+'  order by t1.create_time desc';

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
     * 根据公司id查询公司
     * @param company_id 公司id
     * @param callback 回调
     */
    companySearchById:function(company_id,callback){
        var selectSql = "select t1.* from "+table+" t1  where t1."+mainKey+" = '"+company_id+"'";
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
     * 添加公司
     * @param params
     * @param callback
     */
    addCompany:function(params,callback){
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
     * 修改公司数据
     * @param params 参数包
     * @param callback 回调
     */
    modifyCompany:function(params,callback){
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
     * 删除公司
     * 并删除相关的客户
     * @param company_id 公司id
     * @param callback
     */
    removeCompany:function(company_id,callback){
        //将id列表（id,id,id）替换成'id','id','id'便于使用in语句进行批量删除
        company_id = company_id.replace(/([^,]{32})(,)?/gi,"'$1'$2");
        var execArr = [
            {sql:"DELETE FROM "+table+" WHERE "+mainKey+" in ("+company_id+")"},
            {sql:"DELETE FROM t_customer WHERE "+mainKey+" in ("+company_id+")"}];
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
     * 查询核时数据
     * @param company_id 公司id
     * @param callback
     */
    queryKernal:function(company_id,callback){
        this.companySearchById(company_id,function(error,data){
            mySqlPool.getConnection4Kernal(function(connection){
                connection.query("select * from userinfo where username = '"+data.render_username+"' ",function(err,result){
                    if(err){
                        callback && callback(err);
                        connection.release();
                        return;
                    }
                    if(result.length==0){
                        callback && callback({message:'未查询到核时记录'});
                        connection.release();
                        return;
                    }
                    callback && callback(false,{
                        kernal:result[0].ReKernelHours,
                        price:data.render_price
                    });
                    connection.release();
                });
            });
        });
    }
};