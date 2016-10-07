var express = require('express');
var router = express.Router();
var roleDao = require('../daos/roleDao');
var utils = require('../libs/utils');

router.get('/role/list', function(req, res, next) {
    if (req.session.isLogin) {
        var key = req.query.key;
        roleDao.roleListSearch({
            key:key?key:null
        },function(err,data){
            res.json(utils.returns(arguments));
        });
    }
});

/**
 * 根据角色id角色查询
 */
router.get('/role/search/:role_id', function (req, res, next) {
    var role_id = req.params.role_id;
    roleDao.roleListSearchById(role_id,function(){
        res.json(utils.returns(arguments));
    });
});

/**
 * 根据用户id查询其角色
 */
router.get('/role/userrole', function (req, res, next) {
    var user_id = req.query.user_id;
    roleDao.userRoleListSearchByUserId(user_id,function(){
        res.json(utils.returns(arguments));
    });
});

/**
 * 根据用户id查询保存角色
 */
router.post('/role/userrole', function (req, res, next) {
    var user_id = req.body.user_id;
    var role_ids = req.body.role_ids;
    var role_id_arr = role_ids?role_ids.split(';'):[];
    roleDao.userRoleListSaveByUserId(user_id,role_id_arr,function(){
        res.json(utils.returns(arguments));
    });
});

/**
 * 根据角色id查询其用户
 */
router.get('/role/roleuser', function (req, res, next) {
    var role_id = req.query.role_id;
    roleDao.roleUserListSearchByRoleId(role_id,function(){
        res.json(utils.returns(arguments));
    });
});

/**
 * 根据角色id查询保存用户
 */
router.post('/role/roleuser', function (req, res, next) {
    var role_id = req.body.role_id;
    var user_ids = req.body.user_ids;
    var user_id_arr = user_ids?user_ids.split(';'):[];
    roleDao.roleUserListSaveByRoleId(role_id,user_id_arr,function(){
        res.json(utils.returns(arguments));
    });
});

/**
 * 根据组织机构id查询其角色
 */
router.get('/role/orgrole', function (req, res, next) {
    var org_id = req.query.org_id;
    roleDao.orgRoleListSearchByOrgId(org_id,function(){
        res.json(utils.returns(arguments));
    });
});

/**
 * 根据组织机构id保存其角色
 */
router.post('/role/orgrole', function (req, res, next) {
    var org_id = req.body.org_id;
    var role_ids = req.body.role_ids;
    var role_id_arr = role_ids?role_ids.split(';'):[];
    roleDao.orgRoleListSaveByOrgId(org_id,role_id_arr,function(){
        res.json(utils.returns(arguments));
    });
});

var MODIFYCOLUMNS = ['role_id','role_name'];
/**
 * 角色保存
 */
router.post('/role/save', function (req, res, next) {
    if (req.session.isLogin) {
        var action = req.body.action;
        if(action == '001'){//新增
            var role_name = req.body.role_name;
            roleDao.addRole({
                role_name:role_name
            },function(err,data){
                res.json(utils.returns(arguments));
            });
        }else if(action == '002'){//修改
            var params = {};
            for(var key in req.body){
                if(MODIFYCOLUMNS.indexOf(key)!=-1)
                    params[key] = req.body[key];
            }
            roleDao.modifyRole(params,function(err,data){
                if(err){
                    res.json(utils.returns(false,err.message));
                }else{
                    res.json(utils.returns(true,data));
                }
            });
        }else if(action == '003'){
            //删除
            var role_id = req.body.role_id;
            roleDao.removeRole(role_id,function(err,data){
                res.json(utils.returns(arguments));
            });
        }
    }
});




module.exports = router;
