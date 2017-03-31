/**
 * Created by 杨浪 on 2016/11/25.
 */

var log4js = require('log4js');
/*====================配置日志输出===============*/
log4js.configure({
    appenders: [
        {type: 'console'}, //控制台输出
        {
            "type": "dateFile",                 // 日志文件类型，可以使用日期作为文件名的占位符
            "filename": "./logs/",     // 日志文件名，可以设置相对路径或绝对路径
            "pattern": "yyyyMMdd.log",  // 占位符，紧跟在filename后面
            "alwaysIncludePattern": true,       // 文件名是否始终包含占位符
           // "category": "logInfo"               // 记录器名
        }
    ],
    //"levels":{ "logInfo": "DEBUG"},        // 设置记录器的默认显示级别，低于这个级别的日志，不会输出
    replaceConsole: true
});
var logger = log4js.getLogger('express');
logger.setLevel('DEBUG');

module.exports = {
    initExpress:function(app){
        app.use(log4js.connectLogger(logger, {level: 'auto'}));
    },
    logger : function(name){
        var logger = log4js.getLogger(name);
        logger.setLevel('DEBUG');
        return logger;
    }
};