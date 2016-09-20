var mysql = require('mysql');
var Calendar = require('./libs/calendar.js');
var guid = require('guid');

var connection = mysql.createConnection({
    host     : 'localhost',
    port:'3306',
    database:'spm',
    user     : 'root',
    password : ''
});
var am = Calendar.getInstance('20160910 08:29:20');
var pm = Calendar.getInstance('20160910 16:28:00');
connection.query('select * from t_student',function(error,result){
    var arrlog=[]
    for(var i = 0,len = result.length;i<len;i++){
        arrlog.push([guid.raw().replace(/-/gi,''),
            result[i].rfid,
            1,
            am.add(Calendar.SECOND,i%20==0?3:0).format('yyyyMMdd HH:mm:ss')]);
        arrlog.push([guid.raw().replace(/-/gi,''),
            result[i].rfid,
            0,
            pm.add(Calendar.SECOND,i%20==0?3:0).format('yyyyMMdd HH:mm:ss')]);
    }
    var logsql = 'INSERT INTO t_rflog(id,rfid ,type,create_time) VALUES ?';
    connection.query(logsql,[arrlog],function(err){console.log(err);});
});
