/**
 * 菜单列表查询路由
 */
var express = require('express');
var router = express.Router();
var menuDao = require('../daos/menuDao');
var fs = require("fs");
var utils = require('../libs/utils');
var websocket = require('../framework/websocket');
var Events = require('../framework/framework-events');
var Calendar = require('../libs/calendar');

/**
 * 菜单列表查询
 */
router.get('/menu/list', function (req, res, next) {
    if (req.session.isLogin) {
        menuDao.menuSearch(function(err,data){
            res.json(utils.returns(arguments));
        });
    }
});


module.exports = router;
