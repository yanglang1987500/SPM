var express = require('express');
var router = express.Router();
var userDao = require('../../daos/userDao');
var utils = require('../../libs/utils');
var context = require('../../framework/context');
var sessionUtil = require('../../framework/sessionUtil');
var authDao = require('../../daos/authDao');
var authority = require('../../framework/authority');
var logDao = require('../../daos/logDao');
var Calendar = require('../../libs/calendar');

/* GET home page. */
router.get('/login', function (req, res, next) {
    if(utils.isMobile(req)){
        res.redirect('/h5/login');
    }
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
        if(username == userInfo.user_name && password == userInfo.user_password){
            var maxAge = 1000 * 60 * 60 * 2; //2小时
            if (remember) {
                maxAge = 1000 * 60 * 60 * 24 * 7; // 一周
            }
            req.sessionOptions.maxAge = new Date(Date.now() + maxAge);
            var sessionUserInfo = req.session.userInfo = sessionUtil.createUserInfo({
                username:username,
                usercode:username,
                nickname:userInfo.nickname,
                password:password,
                userid:userInfo.user_id
            });
            logDao.addLog({
                user_id:userInfo.user_id,
                user_name:username,
                device_type:1,
                login_time:Calendar.getInstance().format('yyyyMMdd HH:mm:ss')
            });
            authority.reloadUserRole(sessionUserInfo,function(){
                req.session.isLogin = true;
                res.redirect('/');
            });
        }else{
            res.render('login',{error:'用户名或密码不正确'});
        }
    }
});

/**
 * h5登陆
 */
router.get('/h5/login', function (req, res, next) {
    if(!utils.isMobile(req)){
        res.redirect('/login');
    }
    if(req.session.isLogin){
        res.redirect('/h5');
    }
    res.render('loginh5', {title: 'Express', a: 'hello world'});
});


router.post('/h5/login', function (req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    var remember = req.body.remember;
    userDao.userInfoSearchByUserName(username,function(err,result){
        if(!result){
            //用户名不存在
            res.render('loginh5',{error:'用户名不存在'});
        }else{
            doCheck(result);
        }
    });


    function doCheck(userInfo){
        if(username == userInfo.user_name && password == userInfo.user_password){
            var maxAge = 1000 * 60 * 60 * 2; //2小时
            if (remember) {
                maxAge = 1000 * 60 * 60 * 24 * 7; // 一周
            }
            req.sessionOptions.maxAge = new Date(Date.now() + maxAge);
            var sessionUserInfo = req.session.userInfo = sessionUtil.createUserInfo({
                username:username,
                usercode:username,
                nickname:userInfo.nickname,
                password:password,
                userid:userInfo.user_id
            });
            logDao.addLog({
                user_id:userInfo.user_id,
                user_name:username,
                device_type:2,
                login_time:Calendar.getInstance().format('yyyyMMdd HH:mm:ss')
            });
            authority.reloadUserRole(sessionUserInfo,function(){
                req.session.isLogin = true;
                res.redirect('/h5');
            });
        }else{
            res.render('loginh5',{error:'用户名或密码不正确'});
        }
    }
});
//pc登出
router.get('/logout', function (req, res, next) {
    if(req.session.isLogin){
        req.session.isLogin = false;
        delete req.session.userInfo;
        res.redirect('/login');
    }
});
//h5登出
router.get('/h5/logout', function (req, res, next) {
    if(req.session.isLogin){
        req.session.isLogin = false;
        delete req.session.userInfo;
        res.redirect('/h5/login');
    }
});

module.exports = router;
