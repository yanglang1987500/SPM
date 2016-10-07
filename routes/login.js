var express = require('express');
var router = express.Router();
var userDao = require('../daos/userDao');
var utils = require('../libs/utils');
var context = require('../framework/context');
var session = require('../framework/session');
var authDao = require('../daos/authDao');

/* GET home page. */
router.get('/login', function (req, res, next) {
    if(req.session.isLogin){
        res.redirect('/');
    }
    res.render('login', {title: 'Express', a: 'hello world'});
});

router.post('/login', function (req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    var remember = req.body.remember;
    userDao.userInfoSearchByUserName(username,function(err,result){
        if(!result){
            //用户名不存在
            res.render('login',{error:'用户名不存在'});
        }else{
            doCheck(result);
        }
    });

    
    function doCheck(userInfo){
        if(username == userInfo.user_name && utils.md5(password) == userInfo.user_password){
            var maxAge = 1000 * 60 * 60 * 2; //2小时
            if (remember) {
                maxAge = 1000 * 60 * 60 * 24 * 7; // 一周
            }
            req.sessionOptions.maxAge = new Date(Date.now() + maxAge);
            var sessionUserInfo = req.session.userInfo = session.createUserInfo({
                username:username,
                usercode:username,
                userid:userInfo.user_id
            });

            authDao.queryUserRoleByUserId(req.session.userInfo.userid,function(err,roles) {
                sessionUserInfo.setRoles(roles);
                req.session.isLogin = true;
                res.redirect('/');
            });
        }else{
            res.render('login',{error:'用户名或密码不正确'});
        }
    }
});

router.get('/logout', function (req, res, next) {
    if(req.session.isLogin){
        req.session.isLogin = false;
        delete req.session.userInfo;
        res.redirect('/login');
    }
});

module.exports = router;
