var express = require('express');
var router = express.Router();
var userDao = require('../daos/userDao');
var utils = require('../libs/utils');

router.get('/user/list', function(req, res, next) {
    if (req.session.isLogin) {
        var page = req.query.page || 1,
            rows = req.query.rows || 20,
            key = req.query.key,
            startdate = req.query.startdate,
            enddate   = req.query.enddate;
        userDao.userListSearch(parseInt(page),parseInt(rows),{
            key:key?key:null,
            startdate:startdate?startdate:null,
            enddate:enddate?enddate:null
        },function(err,data){
            res.json(utils.returns(arguments));
        });
    }
});

/**
 * 根据用户id用户查询
 */
router.get('/user/search/:user_id', function (req, res, next) {
    var user_id = req.params.user_id;
    userDao.userListSearchById(user_id,function(){
        res.json(utils.returns(arguments));
    });
});


var MODIFYCOLUMNS = ['user_id','user_name','user_password'];
/**
 * 用户保存
 */
router.post('/user/save', function (req, res, next) {
    if (req.session.isLogin) {
        var action = req.body.action;
        if(action == '001'){//新增
            var user_name = req.body.user_name,
                user_password = req.body.user_password
                org_id = req.body.org_id;
            userDao.addUser({
                user_name:user_name,
                user_password:utils.md5(user_password),
                org_id:org_id
            },function(err,data){
                res.json(utils.returns(arguments));
            });
        }else if(action == '002'){//修改
            var params = {};
            for(var key in req.body){
                if(MODIFYCOLUMNS.indexOf(key)!=-1)
                    params[key] = req.body[key];
            }
            userDao.modifyUser(params,function(err,data){
                if(err){
                    res.json(utils.returns(false,err.message));
                }else{
                    res.json(utils.returns(true,data));
                }
            });
        }else if(action == '003'){
            //修改密码
            var user_id = req.body.user_id;
            var user_password = req.body.user_password;
            userDao.modifyUser({user_id:user_id,user_password:utils.md5(user_password)},function(err,data){
                if(err){
                    res.json(utils.returns(false,err.message));
                }else{
                    res.json(utils.returns(true,data));
                }
            });
        }else if(action == '004'){
            //删除
            var user_id = req.body.user_id;
            userDao.removeUser(user_id,function(err,data){
                res.json(utils.returns(arguments));
            });
        }
    }
});

/**
 * 单个用户的修改密码功能
 */
router.post('/user/passwordmodify', function (req, res, next) {
    if (req.session.isLogin) {
        var user_id = req.session.userInfo.userid;
        var oldPassword = req.body.oldPassword;
        var newPassword = req.body.newPassword;
        userDao.passwordModify(user_id, oldPassword, newPassword, function (err, data) {
            res.json(utils.returns(arguments));
        });
    }
});

/**
 * 单个用户的查询密码功能
 */
router.get('/user/password', function (req, res, next) {
    if (req.session.isLogin) {
        var id = req.session.userInfo.userid;
        userDao.userListSearchById(id, function (err, data) {
            res.json(utils.returns(arguments));
        });
    }
});

module.exports = router;
