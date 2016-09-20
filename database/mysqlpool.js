var mysql = require('mysql');

var pool  = mysql.createPool({
    host     : 'localhost',
    port:'3306',
    user     : 'root',
    password : '',
    database : 'spm'
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
    }
};