/**
 * 权限配置查询路由
 */
var express = require('express');
var router = express.Router();
var authDao = require('../daos/authDao');
var utils = require('../libs/utils');

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
            res.json(utils.returns(arguments));
        });
    }
});


module.exports = router;
