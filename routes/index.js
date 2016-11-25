var express = require('express');
var Client = require('node-rest-client').Client;
var fs = require("fs");
var utils = require('../libs/utils');
var router = express.Router();
var client = new Client();
var ejs = require('ejs');
var menuDao = require('../daos/menuDao');
var authDao = require('../daos/authDao');
var sessionUtil = require('../framework/sessionUtil');
var logger = require('../framework/logger').logger('index');

/*function test() {
    fs.readFile('../views/index.html', 'utf-8', function (err, data) {
        var data = ejs.render('index');
    });

}
//test();*/

/* GET home page. */
router.get('/', function (req, res, next) {
    if(utils.isMobile(req)){
        res.redirect('/h5');
    }
    if (req.session.isLogin) {
        var sessionUserInfo = sessionUtil.createUserInfo(req.session.userInfo);
        menuDao.menuSearch({menu_device:1},function (err, data) {
            if (err) {
                console.log(err);
            }
            data = data.filter(function(menu){
                var ret = sessionUserInfo.getRoles().isPermission(menu.menu_id);
                return ret;
            });
            res.render('index', {menuList:data});

        });
    }else
        res.redirect('/login');
});

router.get('/reporth5', function (req, res, next) {
    res.render('reporth5');
});

router.get('/h5', function (req, res, next) {
    if(!utils.isMobile(req)){
        res.redirect('/');
    }
    if (req.session.isLogin) {
        res.render('h5');
    }else
        res.redirect('/h5/login');
});

module.exports = router;
