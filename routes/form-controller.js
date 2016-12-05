/**
 * 自定义表单管理路由
 */
var express = require('express');
var router = express.Router();
var formDao = require('../daos/formDao');
var fs = require("fs");
var utils = require('../libs/utils');

/**
 * 自定义表单列表查询
 */
router.get('/form/list', function (req, res, next) {
    if (req.session.isLogin) {
        var key = req.query.key;
        formDao.formSearch({
            key:key?key:null
        },function(err,data){
            res.json(utils.returns(arguments));
        });
    }
});


var MODIFYCOLUMNS = ['form_id','form_title','form_html','form_text','create_time','update_time'];
/**
 * 自定义表单保存
 */
router.post('/form/save', function (req, res, next) {
    if (req.session.isLogin) {
        var action = req.body.action;
        if(action == '001'){//新增
            var form_id = req.body.form_id,
                form_title = req.body.form_title,
                form_html = req.body.form_html,
                form_text = req.body.form_text;
            formDao.addForm({
                form_id:form_id,
                form_title:form_title,
                form_html:form_html,
                form_text:form_text
            },function(err,data){
                res.json(utils.returns(arguments));
            });
        }else if(action == '002'){//修改
            var params = {};
            for(var key in req.body){
                if(MODIFYCOLUMNS.indexOf(key)!=-1)
                    params[key] = req.body[key];
            }
            formDao.modifyForm(params,function(err,data){
                if(err){
                    res.json(utils.returns(false,err.message));
                }else{
                    res.json(utils.returns(true,data));
                }
            });
        }else if(action == '003'){//删除
            var form_id = req.body.form_id;
            formDao.removeForm(form_id,function(err,data){
                res.json(utils.returns(arguments));
            });
        }
    }
});

/**
 * 根据自定义表单项id自定义表单项查询
 */
router.get('/form/search/:form_id', function (req, res, next) {
    var form_id = req.params.form_id;
    formDao.formSearchById(form_id,function(){
        res.json(utils.returns(arguments));
    });
});

module.exports = router;
