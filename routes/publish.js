var express = require('express');
var router = express.Router();
var publishDao = require('../daos/publishDao');
var fs = require("fs");
var utils = require('../libs/utils');
var websocket = require('../framework/websocket');
var Calendar = require('../libs/calendar');

/**
 * 学校信息发布查询
 */
router.get('/publish/search', function (req, res, next) {
    if (req.session.isLogin) {
        var detail = req.query.detail,
            page = req.query.page || 1,
            rows = req.query.rows || 20,
            key = req.query.key,
            is_show = req.query.is_show,
            is_publish = req.query.is_publish,
            startdate = req.query.startdate,
            enddate   = req.query.enddate;
        publishDao.publishSearch(parseInt(page),parseInt(rows),{
            detail:detail,
            key:key?key:null,
            is_show:is_show!=undefined?is_show:null,
            is_publish:is_publish!=undefined?is_publish:null,
            startdate:startdate?startdate:null,
            enddate:enddate?enddate:null
        },function(err,data){
            res.json(utils.returns(arguments));
        });
    }
});

/**
 * 学校信息发布查询 指定id
 */
router.get('/publish/search-id', function (req, res, next) {
    if (req.session.isLogin) {
        var publish_id = req.query.publish_id;
        publishDao.publishSearchById(publish_id,function(err,data){
            res.json(utils.returns(arguments));
        });
    }
});

var MODIFYCOLUMNS = ['publish_id','publish_title','publish_content','publish_content_pure','is_show','is_publish'];
/**
 * 信息保存
 */
router.post('/publish/save', function (req, res, next) {
    if (req.session.isLogin) {
        var action = req.body.action;
        if(action == '001'){//新增
            var publish_title = req.body.publish_title,
                publish_content = req.body.publish_content,
                publish_content_pure = req.body.publish_content_pure,
                userCode = req.session.userInfo.usercode;
            publishDao.addPublish({
                publish_title:publish_title,
                publish_content:publish_content,
                publish_content_pure:publish_content_pure,
                user_id:userCode
            },function(err,data){
                res.json(utils.returns(arguments));
                if(!err){
                    websocket.broadcast('websocket:message-publish-new',{
                        publish_title:publish_title,
                        publish_content_pure:publish_content_pure,
                        update_time:Calendar.getInstance().format('yyyyMMdd HH:mm:ss'),
                        publish_content:publish_content
                    });
                }
            });
        }else if(action == '002'){//修改
            var params = {};
            for(var key in req.body){
                if(MODIFYCOLUMNS.indexOf(key)!=-1)
                    params[key] = req.body[key];
            }
            publishDao.modifyPublish(params,function(err,data){
                if(err){
                    res.json(utils.returns(false,err.message));
                }else{
                    res.json(utils.returns(true,data));
                }
            });
        }else if(action == '003'){//删除
            var publish_id = req.body.publish_id;
            publishDao.removePublish(publish_id,function(err,data){
                res.json(utils.returns(arguments));
            });
        }
    }
});

module.exports = router;
