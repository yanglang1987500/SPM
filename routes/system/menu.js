/**
 * 菜单列表查询路由
 */
var express = require('express');
var router = express.Router();
var menuDao = require('../../daos/menuDao');
var fs = require("fs");
var utils = require('../../libs/utils');
var websocket = require('../../framework/websocket');
var Events = require('../../framework/framework-events');
var Calendar = require('../../libs/calendar');
/**
 * 菜单列表查询
 */
router.get('/menu/list', function (req, res, next) {
    if (req.session.isLogin) {
        var key = req.query.key,
            show_type = req.query.show_type,
            menu_device = req.query.menu_device,
            menu_type = req.query.menu_type;
        menuDao.menuSearch({
            key:key?key:null,
            show_type:show_type!=undefined?show_type:null,
            menu_device:menu_device!=undefined?menu_device:'1',
            menu_type:menu_type!=undefined?menu_type:null
        },function(err,data){
            res.json(utils.returns(arguments));
        });
    }
});


var MODIFYCOLUMNS = ['menu_id','menu_title','menu_url','menu_icon','show_type','menu_type','menu_device','menu_parent_id','menu_order'];
/**
 * 菜单保存
 */
router.post('/menu/save', function (req, res, next) {
    if (req.session.isLogin) {
        var action = req.body.action;
        if(action == '001'){//新增
            var menu_title = req.body.menu_title,
                menu_url = req.body.menu_url,
                menu_icon = req.body.menu_icon,
                show_type = req.body.show_type,
                menu_type = req.body.menu_type,
                menu_device = req.body.menu_device,
                menu_parent_id = req.body.menu_parent_id;
            menuDao.addMenu({
                menu_title:menu_title,
                menu_url:menu_url,
                menu_icon:menu_icon,
                show_type:show_type,
                menu_type:menu_type,
                menu_device:menu_device,
                menu_parent_id:menu_parent_id
            },function(err,data){
                res.json(utils.returns(arguments));
            });
        }else if(action == '002'){//修改
            var params = {};
            for(var key in req.body){
                if(MODIFYCOLUMNS.indexOf(key)!=-1)
                    params[key] = req.body[key];
            }
            menuDao.modifyMenu(params,function(err,data){
                if(err){
                    res.json(utils.returns(false,err.message));
                }else{
                    res.json(utils.returns(true,data));
                }
            });
        }else if(action == '003'){//删除
            var menu_id = req.body.menu_id;
            menuDao.removeMenu(menu_id,function(err,data){
                res.json(utils.returns(arguments));
            });
        }
    }
});

/**
 * 根据菜单id菜单查询
 */
router.get('/menu/search/:menu_id', function (req, res, next) {
    var menu_id = req.params.menu_id;
    menuDao.menuSearchById(menu_id,function(){
        res.json(utils.returns(arguments));
    });
});

module.exports = router;
