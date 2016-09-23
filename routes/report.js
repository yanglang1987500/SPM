/**
 * 报修信息路由
 */
var express = require('express');
var router = express.Router();
var reportDao = require('../daos/reportDao');
var fs = require("fs");
var utils = require('../libs/utils');
var websocket = require('../framework/websocket');
var Events = require('../framework/framework-events');
var Calendar = require('../libs/calendar');

/**
 * 报修信息查询
 */
router.get('/report-search', function (req, res, next) {
    if (req.session.isLogin) {
        var detail = req.query.detail,
            page = req.query.page || 1,
            rows = req.query.rows || 20,
            key = req.query.key,
            is_handle = req.query.is_handle,
            startdate = req.query.startdate,
            enddate   = req.query.enddate;
        reportDao.reportSearch(parseInt(page),parseInt(rows),{
            detail:detail,
            key:key?key:null,
            is_handle:is_handle!=undefined?is_handle:null,
            startdate:startdate?startdate:null,
            enddate:enddate?enddate:null
        },function(err,data){
            res.json(utils.returns(arguments));
        });
    }
});

/**
 * 报修信息查询 指定id
 */
router.get('/report-search-id', function (req, res, next) {
    if (req.session.isLogin) {
        var report_id = req.query.report_id;
        reportDao.reportSearchById(report_id,function(err,data){
            res.json(utils.returns(arguments));
        });
    }
});

var MODIFYCOLUMNS = ['report_id','report_title','report_content','is_handle'];
/**
 * 信息保存
 */
router.post('/report-save', function (req, res, next) {
        var action = req.body.action;
        if(action == '001'){//新增
            var report_title = req.body.report_title,
                report_content = req.body.report_content,
                photos = req.body.photos,
                userCode = '001';
            reportDao.addReport({
                report_title:report_title,
                report_content:report_content,
                photos:photos,
                user_id:userCode
            },function(err,data){
                res.json(utils.returns(arguments));
                if(!err){
                    websocket.broadcast('websocket:report-new',{
                        report_title:report_title,
                        update_time:Calendar.getInstance().format('yyyyMMdd HH:mm:ss'),
                        report_content:report_content,
                        photos:photos
                    });
                }
            });
        }else if(action == '002'){//修改
            var params = {};
            for(var key in req.body){
                if(MODIFYCOLUMNS.indexOf(key)!=-1)
                    params[key] = req.body[key];
            }
            reportDao.modifyReport(params,function(err,data){
                if(err){
                    res.json(utils.returns(false,err.message));
                }else{
                    res.json(utils.returns(true,data));
                }
            });
        }else if(action == '003'){//删除
            var report_id = req.body.report_id;
            reportDao.removeReport(report_id,function(err,data){
                res.json(utils.returns(arguments));
            });
        }
});
/*function sleep(milliSeconds) {
    var startTime = new Date().getTime();
    while (new Date().getTime() < startTime + milliSeconds);
};
Events.subscribe('helloworld',function(data){
    console.log(data.callbackId);
    console.log(data.data);
    var i = 0;
    while(i<10){
        sleep(2000);
        websocket.call(data.clientId,data.callbackId,{name:data.data.name+' haha'+i});
        i++;
    }
});*/

module.exports = router;
