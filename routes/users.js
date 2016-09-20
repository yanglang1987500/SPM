var express = require('express');
var router = express.Router();
var userDao = require('../daos/userDao');
var utils = require('../libs/utils');

/* GET users listing. */
router.post('/user/passwordmodify', function(req, res, next) {
    //1，根据当前用户名判断有没有修改过密码
    var oldPassword = req.body.oldPassword;
    var newPassword = req.body.newPassword;
    var userCode = req.session.userInfo.usercode;
    if(newPassword.trim()==''||newPassword.trim().length<6){
        res.json(utils.returnJson(false,'新密码不能为空，且必须大于6位'));
    }
    userDao.queryUserPasswordByName(userCode,function(userPasswords){
        if(userPasswords.length == 0){
            //尚未修改过密码，使用默认密码判断，此处需要MD5加密
            modifyPassword(utils.md5(userDao.defaultPassword),true);
        } else{
            //此处密码本身已经是MD5加密了的
            modifyPassword(userPasswords[0].password,false);
        }
    });


    function modifyPassword(_oldPassword,insert){
        if(utils.md5(oldPassword) !== _oldPassword ){
            res.json(utils.returnJson(false,'原始密码输入有误'));
        }else{
            insert?userDao.insertUserPassword(userCode,utils.md5(newPassword),function(data){
                res.json(utils.returns(arguments));
            }):userDao.modifyUserPasswordByName(userCode,utils.md5(newPassword),function(data){
                res.json(utils.returns(arguments));
            });
        }
    }
    
    
});

module.exports = router;
