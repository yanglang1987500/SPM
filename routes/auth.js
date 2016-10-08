/**
 * 权限配置查询路由
 */
var express = require('express');
var router = express.Router();
var authDao = require('../daos/authDao');
var utils = require('../libs/utils');
var menuDao = require('../daos/menuDao');
var sessionUtil = require('../framework/sessionUtil');
var authority = require('../framework/authority');

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
 * 菜单权限列表保存
 */
router.post('/auth/menu', function (req, res, next) {
    if (req.session.isLogin) {
        var role_id = req.body.role_id;
        var auth_ids = req.body.auth_ids;

        var auth_id_arr = auth_ids?auth_ids.split(';'):[];
        authDao.menuAuthTreeSave(role_id,auth_id_arr,function(err,data){
            authority.reloadAuthorities();
            res.json(utils.returns(arguments));
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
            menu_type = req.query.menu_type;
        menuDao.menuSearch({
            key:key?key:null,
            show_type:show_type!=undefined?show_type:null,
            menu_type:menu_type!=undefined?menu_type:null
        },function(err,data){
            var sessionUserInfo = sessionUtil.createUserInfo(req.session.userInfo);
            data = data.filter(function(menu){
                var ret = sessionUserInfo.getRoles().isPermission(menu.menu_id);
                console.log('--------------'+ret);
                return ret;
            });
            res.json(utils.returnJson(true,data));
        });
    }
});

module.exports = router;
