var express = require('express');
var router = express.Router();
var userDao = require('../../daos/userDao');
var utils = require('../../libs/utils');
var context = require('../../framework/context');
var sessionUtil = require('../../framework/sessionUtil');
var webIMDao = require('../../daos/webIMDao');
var authority = require('../../framework/authority');
var logDao = require('../../daos/logDao');
var Calendar = require('../../libs/calendar');


/**
 * h5登陆
 */
router.get('/h5/regist', function (req, res, next) {
    if(!utils.isMobile(req)){
        res.redirect('/');
    }

    res.render('registh5');
});


router.post('/h5/regist', function (req, res, next) {
    var tel = req.body.tel;
    var nickname = req.body.nickname;
    var password = req.body.password;
    var repassword = req.body.repassword;
    if(!/^1[3|4|5|8|7][0-9]\d{8}$/.test(tel.trim())){
        res.render('registh5',{error:'手机号不合法',tel:tel,nickname:nickname});
        return;
    }
    if(nickname.trim()==''){
        res.render('registh5',{error:'昵称不能为空',tel:tel,nickname:nickname});
        return;
    }

    if(password.trim() === ''){
        res.render('registh5',{error:'密码不能为空',tel:tel,nickname:nickname});
        return;
    }

    if(password !== repassword){
        res.render('registh5',{error:'两次密码不一致，请确认',tel:tel,nickname:nickname});
        return;
    }
    var param = {
        user_name:tel,
        tel:tel,
        nickname:nickname,
        user_password:password,
        type:1,
        org_id:'d7c20355e7e27006065fd5a4a638f6d6'//默认写入组织机构为家长
    };
    userDao.addUser(param,function(err,data){
        if(err){
            res.render('registh5',{error:err.message});
            return;
        }
        var sessionUserInfo = req.session.userInfo = sessionUtil.createUserInfo({
            username:tel,
            usercode:tel,
            nickname:nickname,
            password:password,
            userid:param.user_id
        });
        logDao.addLog({
            user_id:param.user_id,
            user_name:tel,
            device_type:2,
            login_time:Calendar.getInstance().format('yyyyMMdd HH:mm:ss')
        });
        webIMDao.addUser(tel,password);
        authority.reloadUserRole(sessionUserInfo,function(){
            req.session.isLogin = true;
            res.redirect('/h5');
        });
    });

});
module.exports = router;
