/**
 * 影视功能
 */
var express = require('express');
var router = express.Router();
var videoDao = require('../../daos/video/videoDao');
var utils = require('../../libs/utils');

/**
 * 影视查询
 */
router.get('/video/search', function(req, res, next) {
    var key = req.query.s;
    videoDao.searchByKey(key, function(err, data) {
        res.jsonp(data);
    });
});

/**
 * 影视详情
 */
router.get('/video/detail', function(req, res, next) {

    var _res = req.query.res;
    videoDao.searchDetail(_res, function(err, data) {
        res.jsonp(data);
    });
});

module.exports = router;