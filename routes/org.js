/**
 * 组织机构列表查询路由
 */
var express = require('express');
var router = express.Router();
var orgDao = require('../daos/orgDao');
var fs = require("fs");
var utils = require('../libs/utils');

/**
 * 组织列表查询
 */
router.get('/org/list', function (req, res, next) {
    if (req.session.isLogin) {
        orgDao.orgListSearch(function(err,data){
            res.json(utils.returns(arguments));
        });
    }
});

/**
 * 根据父组织id进行列表查询
 */
router.get('/org/listbypid', function (req, res, next) {
    if (req.session.isLogin) {
        var org_id = req.query.org_id;
        orgDao.orgListSearchByPId(org_id?org_id:0,function(err,data){
            res.json(data);
        });
    }
});

/**
 * 根据组织id查询组织下用户列表
 */
router.get('/org/orguser', function (req, res, next) {
    if (req.session.isLogin) {
        var org_id = req.query.org_id,
            page = req.query.page || 1,
            rows = req.query.rows || 20,
            key = req.query.key,
            startdate = req.query.startdate,
            enddate   = req.query.enddate;
        orgDao.orgUserListSearchByOrgId(page,rows,org_id?org_id:0,{
            key:key,
            startdate:startdate,
            enddate:enddate
        },function(err,data){
            res.json(utils.returns(arguments));
        });
    }
});

/**
 * 根据组织id保存组织下用户列表
 */
router.post('/org/orguser', function (req, res, next) {
    if (req.session.isLogin) {
        var org_id = req.body.org_id;
        var user_ids = req.body.user_ids;
        var user_id_arr = user_ids?user_ids.split(';'):[];
        orgDao.orgUserListSaveByOrgId(org_id,user_id_arr,function(){
            res.json(utils.returns(arguments));
        });
    }
});

var MODIFYCOLUMNS = ['org_id','org_title','org_parent_id'];
/**
 * 组织机构保存
 */
router.post('/org/save', function (req, res, next) {
    if (req.session.isLogin) {
        var action = req.body.action;
        if(action == '001'){//新增
            var org_title = req.body.org_title,
                org_parent_id = req.body.org_parent_id;
            orgDao.addOrg({
                org_title:org_title,
                org_parent_id:org_parent_id
            },function(err,data){
                res.json(utils.returns(arguments));
            });
        }else if(action == '002'){//修改
            var params = {};
            for(var key in req.body){
                if(MODIFYCOLUMNS.indexOf(key)!=-1)
                    params[key] = req.body[key];
            }
            orgDao.modifyOrg(params,function(err,data){
                if(err){
                    res.json(utils.returns(false,err.message));
                }else{
                    res.json(utils.returns(true,data));
                }
            });
        }else if(action == '003'){//删除
            var org_id = req.body.org_id;
            //首先判断该组织机构有没有子孙节点 有的话不允许删除
            orgDao.orgListSearchByPId(org_id,function(err,data){
                if(err){
                    console.log(err);
                    return;
                }
                if(data.length>0){
                    res.json(utils.returnJson(false,'该组织机构存在子组织机构，不能删除。'));
                }else{
                    orgDao.removeOrg(org_id,function(err,data){
                        res.json(utils.returns(arguments));
                    });
                }
            });
        }
    }
});

/**
 * 根据组织机构id查询
 */
router.get('/org/search/:org_id', function (req, res, next) {
    var org_id = req.params.org_id;
    orgDao.orgListSearchById(org_id,function(){
        res.json(utils.returns(arguments));
    });
});

module.exports = router;
