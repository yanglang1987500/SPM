/**
 * Created by 杨浪 on 2016/11/25.
 */
/**
 * 登录日志列表查询路由
 */
var express = require('express');
var router = express.Router();
var logDao = require('../../../daos/logDao');
var utils = require('../../../libs/utils');

/**
 * 登录日志列表查询
 */
router.get('/log/list', function (req, res, next) {
    if (req.session.isLogin) {

        logDao.logSearch({
        },function(err,data){
            res.json(utils.returns(arguments));
        });
    }
});


module.exports = router;
