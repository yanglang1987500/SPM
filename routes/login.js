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
    var username = req.body.username,usercode;
    var password = req.body.password;
    var remember = req.body.remember;
    if(context.isLocal()){
        usercode = username;
        doCheck(username,utils.md5('123456'));
    }else{
        userDao.queryUserInfoMapByNickname(username,function(maps){
            if(maps.length == 0){
                //用户名不存在
                res.render('login',{error:'用户名不存在'});
            }else{
                usercode = maps[0].code;
                userDao.queryUserInfoByName(usercode,function(userinfos){
                    if(userinfos.length == 0){
                        //用户名不存在
                        res.render('login',{error:'用户编号不存在'});
                    }else{
                        //若存在，则看是否修改过密码（默认密码都是123456），修改密码会在UserPassword表中生成一条记录
                        userDao.queryUserPasswordByName(usercode,function(userPasswords){
                            if(userPasswords.length == 0){
                                //尚未修改过密码，使用默认密码123456进行判断
                                doCheck(usercode,utils.md5(userDao.defaultPassword));
                            }else{
                                //已经修改过密码
                                var userPassword = userPasswords[0];
                                doCheck(userPassword.username,userPassword.password);
                            }
                        });
                    }
                });
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
