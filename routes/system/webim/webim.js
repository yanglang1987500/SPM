var express = require('express');
var router = express.Router();
var userDao = require('../../../daos/userDao');
var appConfig = require('../../../configs/appConfig');
var webIMDao = require('../../../daos/webim/webIMDao');
var groupDao = require('../../../daos/webimGroupDao');
var utils = require('../../../libs/utils');

router.get('/webim/users/:key', function (req, res, next) {
    if (req.session.isLogin) {
        var page = 1,
            rows = 9999999,
            key = req.params.key;
        userDao.userListSearch(parseInt(page),parseInt(rows),{
            key:key?key:null,
            type:1
        },function(err,data){
            res.json(utils.returns(arguments));
        });
    }
});

router.get('/webim/userbynames', function (req, res, next) {
    if (req.session.isLogin) {
        var names = req.query.names;
        userDao.userListByNames(names,function(err,data){
            res.json(utils.returns(arguments));
        });
    }
});

router.get('/webim/groups/:key', function (req, res, next) {
    if (req.session.isLogin) {
        var page = 1,
            rows = 9999999,
            key = req.params.key;
        groupDao.groupListSearch(parseInt(page),parseInt(rows),{
            key:key?key:null
        },function(err,data){
            res.json(utils.returns(arguments));
        });
    }
});

/**
 * 新增群组
 */
router.post('/webim/groups', function (req, res, next) {
    if (req.session.isLogin) {
        var name = req.body.name,
            desc = req.body.desc,
            members = req.body.members;
        var params = {
            "name":name, //群组名称，此属性为必须的
            "desc":desc, //群组描述，此属性为必须的
            "members":members, //群组成员，此属性为可选的，但是如果加了此项，数组元素至少一个（注：群主jma1不需要写入到members里面）
            "owner":req.session.userInfo.username //群组的管理员，此属性为必须的
        };
        if(!members || members.length == 0)
            delete params.members;
        webIMDao.addGroup(params,function(data){
            groupDao.addGroup({
                id:appConfig.WEBIM == 'Ease'?data.data.groupid:data.tid,
                name:name,
                description:desc,
                owner:req.session.userInfo.username
            },function(err,data){
                res.json(utils.returns(arguments));
            });
        });
    }
});

/**
 * 新增用户到群组
 */
router.post('/webim/groups/adduser', function (req, res, next) {
    if (req.session.isLogin) {
        var userName = req.body.userName,
            groupId = req.body.groupId;
        webIMDao.addUser2Group(groupId,userName,function(data){
            console.log(data);
            if(data.data && data.data.result)
                res.json(utils.returnJson(true,'加入群组成功'));
            else
                res.json(utils.returnJson(false,'加入群组失败：'+data.error_description));

        });
    }
});

module.exports = router;
