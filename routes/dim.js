/**
 * 字典管理路由
 */
var express = require('express');
var router = express.Router();
var dimDao = require('../daos/dimDao');
var fs = require("fs");
var utils = require('../libs/utils');
var dimTagResolver = require('../framework/tag-resolvers/dim-tag-resolver');

/**
 * 字典列表查询
 */
router.get('/dim/list', function (req, res, next) {
    if (req.session.isLogin) {
        var key = req.query.key,
            group_id = req.query.group_id;
        dimDao.dimSearch({
            key:key?key:null,
            group_id:group_id!=undefined?group_id:null
        },function(err,data){
            res.json(utils.returns(arguments));
        });
    }
});


var MODIFYCOLUMNS = ['id','dim_id','dim_name','dim_value','group_id','group_name'];
/**
 * 菜单保存
 */
router.post('/dim/save', function (req, res, next) {
    if (req.session.isLogin) {
        var action = req.body.action;
        if(action == '001'){//新增
            var dim_id = req.body.dim_id,
                dim_name = req.body.dim_name,
                dim_value = req.body.dim_value,
                group_id = req.body.group_id,
                group_name = req.body.group_name;
            dimDao.addDim({
                dim_id:dim_id,
                dim_name:dim_name,
                dim_value:dim_value,
                group_id:group_id,
                group_name:group_name
            },function(err,data){
                dimTagResolver.loadData();
                res.json(utils.returns(arguments));
            });
        }else if(action == '002'){//修改
            var params = {};
            for(var key in req.body){
                if(MODIFYCOLUMNS.indexOf(key)!=-1)
                    params[key] = req.body[key];
            }
            dimDao.modifyDim(params,function(err,data){
                if(err){
                    res.json(utils.returns(false,err.message));
                }else{
                    dimTagResolver.loadData();
                    res.json(utils.returns(true,data));
                }
            });
        }else if(action == '003'){//删除
            var id = req.body.id;
            dimDao.removeDim(id,function(err,data){
                dimTagResolver.loadData();
                res.json(utils.returns(arguments));
            });
        }
    }
});

/**
 * 根据菜单id菜单查询
 */
router.get('/dim/search/:id', function (req, res, next) {
    var id = req.params.id;
    dimDao.dimSearchById(id,function(){
        res.json(utils.returns(arguments));
    });
});

module.exports = router;
