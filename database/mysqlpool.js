var mysql = require('mysql');
var async = require('async');

var pool  = mysql.createPool({
    host     : 'localhost',
    port:'3306',
    user     : 'root',
    password : '',
    database : 'spm'
});

var pool4Kernal  = mysql.createPool({
    host     : 'localhost',
    port:'3306',
    user     : 'root',
    password : '',
    database : 'db_user'
});

module.exports = {
    getConnection:function(callback){
        pool.getConnection(function(err,connection){
            if(err){
                console.log(err);
                return;
            }
            callback && callback(connection);
        });
    },
    getConnection4Kernal:function(callback){
        pool4Kernal.getConnection(function(err,connection){
            if(err){
                console.log(err);
                return;
            }
            callback && callback(connection);
        });
    },
    execTrans:function(sqlparamsEntities, callback) {
        pool.getConnection(function (err, connection) {
            if (err) {
                return callback(err, null);
            }
            connection.beginTransaction(function (err) {
                if (err) {
                    connection.release();
                    return callback(err, null);
                }
                console.log("开始执行transaction，共执行" + sqlparamsEntities.length + "条数据");
                var funcAry = [];
                sqlparamsEntities.forEach(function (sql_param) {
                    var temp = function (cb) {
                        var sql = sql_param.sql;
                        var param = sql_param.params||{};
                        connection.query(sql, param, function (tErr, rows, fields) {
                            if (tErr) {
                                connection.rollback(function () {
                                    console.log("事务失败，" + sql_param + "，ERROR：" + tErr);
                                    return cb(tErr,null);
                                });
                            } else {
                                return cb(null, 'ok');
                            }
                        })
                    };
                    funcAry.push(temp);
                });

                async.series(funcAry, function (err, result) {
                    console.log("transaction error: " + err);
                    if (err) {
                        connection.rollback(function (err2) {
                            connection.release();
                            return callback(err, null);
                        });
                    } else {
                        connection.commit(function (err, info) {
                            console.log("transaction info: " + JSON.stringify(info));
                            if (err) {
                                console.log("执行事务失败，" + err);
                                connection.rollback(function (err) {
                                    console.log("transaction error: " + err);
                                    connection.release();
                                    return callback(err, null);
                                });
                            } else {
                                connection.release();
                                return callback(null, info);
                            }
                        });
                    }
                })
            });
        });
    }
};