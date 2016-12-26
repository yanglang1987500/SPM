/**
 * 账目结算列表查询路由
 */
var express = require('express');
var router = express.Router();
var accountDao = require('../../daos/accountDao');
var fs = require("fs");
var utils = require('../../libs/utils');
var websocket = require('../../framework/websocket');
var Events = require('../../framework/framework-events');
var Calendar = require('../../libs/calendar');
/**
 * 账目结算列表查询
 */
router.get('/account/list', function (req, res, next) {
    if (req.session.isLogin) {
        var key = req.query.key,
            startdate = req.query.startdate,
            enddate = req.query.enddate,
            company_id = req.query.company_id;
        accountDao.accountSearch({
            key:key?key:null,
            startdate:startdate?startdate:null,
            enddate:enddate?enddate:null,
            company_id:company_id?company_id:null
        },function(err,data){
            res.json(utils.returns(arguments));
        });
    }
});

var MODIFYCOLUMNS = ['account_id','account_name','payed','owed','account_startdate','account_enddate','is_encased','company_id','create_time','update_time'];
/**
 * 账目结算保存
 */
router.post('/account/save', function (req, res, next) {
    if (req.session.isLogin) {
        var action = req.body.action;
            if(action == '001'){//新增
            var account_name = req.body.account_name,
                payed = req.body.payed,
                owed = req.body.owed,
                account_startdate = req.body.account_startdate,
                account_enddate = req.body.account_enddate,
                is_encased = req.body.is_encased,
                company_id = req.body.company_id;
            accountDao.addAccount({
                account_name:account_name,
                payed:payed,
                owed:owed,
                account_startdate:account_startdate,
                account_enddate:account_enddate,
                is_encased:is_encased,
                company_id:company_id
            },function(err,data){
                res.json(utils.returns(arguments));
            });
        }else if(action == '002'){//修改
            var params = {};
            for(var key in req.body){
                if(MODIFYCOLUMNS.indexOf(key)!=-1)
                    params[key] = req.body[key];
            }
            accountDao.modifyAccount(params,function(err,data){
                if(err){
                    res.json(utils.returns(false,err.message));
                }else{
                    res.json(utils.returns(true,data));
                }
            });
        }else if(action == '003'){//删除
            var account_id = req.body.account_id;
            accountDao.removeAccount(account_id,function(err,data){
                res.json(utils.returns(arguments));
            });
        }else if(action == '004'){//封存
            var account_id = req.body.account_id;
            accountDao.encaseAccount(account_id,function(err,data){
                res.json(utils.returns(arguments));
            });
        }else if(action == '005'){//解除封存
            var account_id = req.body.account_id;
            accountDao.unencaseAccount(account_id,function(err,data){
                res.json(utils.returns(arguments));
            });
        }
    }
});

/**
 * 根据账目结算id账目结算查询
 */
router.get('/account/search/:account_id', function (req, res, next) {
    var account_id = req.params.account_id;
    accountDao.accountSearchById(account_id,function(){
        res.json(utils.returns(arguments));
    });
});

module.exports = router;
