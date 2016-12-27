/**
 * 权限配置查询路由
 */
var express = require('express');
var router = express.Router();
var authDao = require('../../../daos/authDao');
var utils = require('../../../libs/utils');
var menuDao = require('../../../daos/menuDao');
var sessionUtil = require('../../../framework/sessionUtil');
var authority = require('../../../framework/authority');

/**
 * 菜单权限列表查询
 */
router.get('/auth/menu', function (req, res, next) {
    if (req.session.isLogin) {
        var role_id = req.query.role_id;
        authDao.menuAuthTreeSearch(role_id,function(err,data){
            res.json(utils.returns(arguments));
        });
    }
});

/**
 * 元素权限列表查询
 */
router.get('/auth/element', function (req, res, next) {
    if (req.session.isLogin) {
        var role_id = req.query.role_id;
        authDao.elementAuthTreeSearch(role_id,function(err,data){
            res.json(utils.returns(arguments));
        });
    }
});

/**
 * 权限列表保存
 */
router.post('/auth/save', function (req, res, next) {
    if (req.session.isLogin) {
        var role_id = req.body.role_id;
        var auth_menu_ids = req.body.auth_menu_ids;
        var auth_element_ids = req.body.auth_element_ids;

        var auth_menu_id_arr = auth_menu_ids?auth_menu_ids.split(';'):[];
        var auth_element_id_arr = auth_element_ids?auth_element_ids.split(';'):[];

        authDao.menuAuthTreeSave(role_id,auth_menu_id_arr,function(err,data){
            authDao.elementAuthTreeSave(role_id,auth_element_id_arr,function(err,data){
                authority.reloadAuthorities();
                res.json(utils.returns(arguments));
            });
        });

    }
});

/**
 * 菜单列表查询
 */
router.get('/auth/menu/list', function (req, res, next) {
    if (req.session.isLogin) {
        var key = req.query.key,
            show_type = req.query.show_type,
            menu_device = req.query.menu_device,
            menu_type = req.query.menu_type;
        menuDao.menuSearch({
            key:key?key:null,
            show_type:show_type!=undefined?show_type:null,
            menu_device:menu_device!=undefined?menu_device:null,
            menu_type:menu_type!=undefined?menu_type:null
        },function(err,data){
            var sessionUserInfo = sessionUtil.createUserInfo(req.session.userInfo);
            data = data.filter(function(menu){
                var ret = sessionUserInfo.getRoles().isPermission(menu.menu_id);
                return ret;
            });
            res.json(utils.returnJson(true,data));
        });
    }
});


/**
 * 查询客户端需要的所有鉴权数据
 * 包括角色所具备的所有权限对象与当前用户所有角色
 */
router.get('/auth/client', function (req, res, next) {
    if (req.session.isLogin) {
        var roleAuthorityMap = authority.getRoleAuthorityMap();
        var sessionUserInfo = sessionUtil.createUserInfo(req.session.userInfo);
        var userRoles = sessionUserInfo.roles;
        res.json(utils.returnJson(true,{
            roleAuthorityMap:roleAuthorityMap,
            userRoles:userRoles
        }));
    }
});

module.exports = router;
