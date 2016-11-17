/**
 * 公司列表查询路由
 */
var express = require('express');
var router = express.Router();
var companyDao = require('../daos/companyDao');
var fs = require("fs");
var utils = require('../libs/utils');
var websocket = require('../framework/websocket');
var Events = require('../framework/framework-events');
var Calendar = require('../libs/calendar');
/**
 * 公司列表查询
 */
router.get('/company/list', function (req, res, next) {
    if (req.session.isLogin) {
        var key = req.query.key;
        companyDao.companySearch({key:key},function(err,data){
            res.json(data);
        });
    }
});

var MODIFYCOLUMNS = ['company_id','company_name','company_mark','company_address','owed','payed','payed_deadline','render_username','render_price','create_date','update_date'];
/**
 * 公司保存
 */
router.post('/company/save', function (req, res, next) {
    if (req.session.isLogin) {
        var action = req.body.action;
        if(action == '001'){//新增
            var company_name = req.body.company_name,
                company_mark = req.body.company_mark,
                company_address = req.body.company_address,
                render_username = req.body.render_username,
                render_price = req.body.render_price;
            companyDao.addCompany({
                company_name:company_name,
                company_mark:company_mark,
                company_address:company_address,
                render_username:render_username,
                render_price:render_price
            },function(err,data){
                res.json(utils.returns(arguments));
            });
        }else if(action == '002'){//修改
            var params = {};
            for(var key in req.body){
                if(MODIFYCOLUMNS.indexOf(key)!=-1)
                    params[key] = req.body[key];
            }
            companyDao.modifyCompany(params,function(err,data){
                if(err){
                    res.json(utils.returns(false,err.message));
                }else{
                    res.json(utils.returns(true,data));
                }
            });
        }else if(action == '003'){//删除
            var company_id = req.body.company_id;
            companyDao.removeCompany(company_id,function(err,data){
                res.json(utils.returns(arguments));
            });
        }
    }
});

/**
 * 根据公司id公司查询
 */
router.get('/company/search/:company_id', function (req, res, next) {
    var company_id = req.params.company_id;
    companyDao.companySearchById(company_id,function(){
        res.json(utils.returns(arguments));
    });
});
/**
 * 公司核时查询
 */
router.get('/company/kernal/:company_id', function (req, res, next) {
    if (req.session.isLogin) {
        var company_id = req.params.company_id;
        companyDao.queryKernal(company_id,function(){
            res.json(utils.returns(arguments));
        });
    }
});
module.exports = router;
