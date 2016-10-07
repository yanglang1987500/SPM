var express = require('express');
var router = express.Router();
var userDao = require('../daos/userDao');
var utils = require('../libs/utils');
var context = require('../framework/context');


/* GET home page. */
router.get('/login', function (req, res, next) {
    if(req.session.isLogin){
        res.redirect('/');
    }
    res.render('login', {title: 'Express', a: 'hello world'});
});

router.post('/login', function (req, res, next) {
    var username = req.body.username,usercode = username;
    var password = req.body.password;
    var remember = req.body.remember;
    if(context.isLocal()){
        doCheck(username,utils.md5('123456'));
    }else{
        userDao.userInfoSearchByUserName(username,function(err,result){
            if(!result){
                //用户名不存在
                res.render('login',{error:'用户名不存在'});
            }else{
                doCheck(result.user_name,result.user_password);
            }
        });
    }

    
    function doCheck(realusername,realpassword){
        if(usercode == realusername && utils.md5(password) == realpassword){
            var maxAge = 1000 * 60 * 60 * 2; //2小时
            if (remember) {
                maxAge = 1000 * 60 * 60 * 24 * 7; // 一周
            }
            req.sessionOptions.maxAge = new Date(Date.now() + maxAge);
            req.session.userInfo = {
                username:username,
                usercode:usercode
            };
            req.session.isLogin = true;
            res.redirect('/');
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
