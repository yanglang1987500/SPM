var mysql = require('mysql');
var Calendar = require('./libs/calendar.js');
var guid = require('guid');
var xing = ['赵','钱','孙','李','杨','张','陈','刘','郑','彭','林','薛','梁','王','段','成','郁', '单', '杭', '洪', '包', '诸', '左', '石', '崔', '吉', '钮' ,'龚',
    '程', '嵇' ,'邢', '滑', '裴', '陆' ,'荣', '翁', '荀', '羊', '於', '惠',
    '甄' ,'麴' ,'家', '封', '芮', '羿' ,'储', '靳', '汲', '邴', '糜', '松',
    '井' ,'段' ,'富', '巫', '乌', '焦' ,'巴', '弓', '牧', '隗', '山', '谷',
    '车' ,'侯' ,'宓', '蓬', '全', '郗' ,'班', '仰', '秋', '仲', '伊', '宫',
    '宁' ,'仇' ,'栾', '暴', '甘', '钭', '历', '戎', '祖', '武', '符', '刘',
    '景' ,'詹', '束', '龙', '叶', '幸', '司', '韶', '郜', '黎', '蓟', '溥'];
var ming = ['梅','阳','林','妮','博','宝','冰','波','贝','才','超','初','成','程','晨','德','富','福','枫',
    '梵','刚','国','桂','罡','华','红','宏','辉','恒','慧','河','鸿','惠','桦','骅','剑','俊','杰','健','嘉',
    '静','洁','娇','纪','宽','苛','珂','灵','兰','良','玲','磊','明','玛','媚','娜','朋','秋','青','琪','勤',
    '晴','容','睿','蓉','胜','烁','堂','唯','伟','威','韦','雯','苇','香','兴','霞','萱','裕','颖','严','勇',
    '阅','彦','宇','韵','燕','艳','乐','雨','洋','志'];
var connection = mysql.createConnection({
    host     : 'localhost',
    port:'3306',
    database:'spm',
    user     : 'root',
    password : ''
});
function RandomNumBoth(Min,Max){
    var Range = Max - Min;
    var Rand = Math.random();
    var num = Min + Math.round(Rand * Range); //四舍五入
    return num;
}

connection.query("truncate t_student",function(err,result){
    connection.query("truncate t_rflog",function(err,result){
        var arr = [],arrlog=[];
        var am = Calendar.getInstance('20160913 08:25:00');
        var pm = Calendar.getInstance('20160913 16:25:00');
        for(var i = 0;i<3000;i++){
            var rfid = guid.raw().replace(/-/gi,'');
            arr.push([guid.raw().replace(/-/gi,''),
                xing[RandomNumBoth(0,xing.length-1)]+ming[RandomNumBoth(0,ming.length-1)]
                ,rfid]);
            arrlog.push([guid.raw().replace(/-/gi,''),
                        rfid,
                        1,
                am.add(Calendar.SECOND,i%20==0?3:0).format('yyyyMMdd HH:mm:ss')]);
            arrlog.push([guid.raw().replace(/-/gi,''),
                rfid,
                0,
                pm.add(Calendar.SECOND,i%20==0?3:0).format('yyyyMMdd HH:mm:ss')]);
        }

        var stusql = 'INSERT INTO t_student(stuid,stuname,rfid) VALUES ?';
        var logsql = 'INSERT INTO t_rflog(id,rfid ,type,create_time) VALUES ?';
        connection.query(stusql,[arr],function(err){console.log(err);});
        connection.query(logsql,[arrlog],function(err){console.log(err);});
    });
});