/**
 * 元素列表查询路由
 */
var express = require('express');
var router = express.Router();
var elementDao = require('../../../daos/elementDao');
var fs = require("fs");
var utils = require('../../../libs/utils');

/**
 * 元素列表查询
 */
router.get('/element/list', function (req, res, next) {
    if (req.session.isLogin) {
        var key = req.query.key,
            menu_id = req.query.menu_id;
        elementDao.elementSearch({
            key:key?key:null,
            menu_id:menu_id?menu_id:null
        },function(err,data){
            res.json(utils.returns(arguments));
        });
    }
});


var MODIFYCOLUMNS = ['element_id','element_desc','element_code','menu_id'];
/**
 * 元素保存
 */
router.post('/element/save', function (req, res, next) {
    if (req.session.isLogin) {
        var action = req.body.action;
        if(action == '001'){//新增
            var element_desc = req.body.element_desc,
                element_code = req.body.element_code,
                menu_id = req.body.menu_id;
            elementDao.addElement({
                element_desc:element_desc,
                element_code:element_code,
                menu_id:menu_id
            },function(err,data){
                res.json(utils.returns(arguments));
            });
        }else if(action == '002'){//修改
            var params = {};
            for(var key in req.body){
                if(MODIFYCOLUMNS.indexOf(key)!=-1)
                    params[key] = req.body[key];
            }
            elementDao.modifyElement(params,function(err,data){
                if(err){
                    res.json(utils.returns(false,err.message));
                }else{
                    res.json(utils.returns(true,data));
                }
            });
        }else if(action == '003'){//删除
            var element_id = req.body.element_id;
            elementDao.removeElement(element_id,function(err,data){
                res.json(utils.returns(arguments));
            });
        }else if(action == '004'){//批量修改所属菜单
            var element_id = req.body.element_id;
            var menu_id = req.body.menu_id;
            var is_copy = req.body.is_copy == 'true';
            is_copy ? elementDao.copyElementMenu(element_id,menu_id,function(err,data){
                res.json(utils.returns(arguments));
            }):elementDao.modifyElementMenu(element_id,menu_id,function(err,data){
                res.json(utils.returns(arguments));
            });
        }
    }
});

/**
 * 根据元素id元素查询
 */
router.get('/element/search/:element_id', function (req, res, next) {
    var element_id = req.params.element_id;
    elementDao.elementSearchById(element_id,function(){
        res.json(utils.returns(arguments));
    });
});

module.exports = router;
