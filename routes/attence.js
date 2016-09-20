var express = require('express');
var router = express.Router();
var attenceDao = require('../daos/attenceDao');
var fs = require("fs");
var guid = require('guid');
var utils = require('../libs/utils');

router.get('/attence-search', function (req, res, next) {
    if (req.session.isLogin) {
        var page = req.query.page,
            rows = req.query.rows,
            key = req.query.key,
            type = req.query.type,
            startdate = req.query.startdate,
            enddate   = req.query.enddate;
        attenceDao.attenceSearch(parseInt(page),parseInt(rows),{
            key:key?key:null,
            type:type!=undefined?type:null,
            startdate:startdate?startdate:null,
            enddate:enddate?enddate:null
        },function(err,data){
            res.json(utils.returns(arguments));
        });
    }
});

router.get('/attence-analyse', function (req, res, next) {
    if (req.session.isLogin) {
        var action = req.query.action;
        switch(action){
            case '001':
                var type = req.query.type,
                    startdate = req.query.startdate,
                    enddate   = req.query.enddate;
                attenceDao.attenceAnalyse({
                    type:type!=undefined?type:'1',
                    startdate:startdate?startdate:null,
                    enddate:enddate?enddate:null
                },false,function(data){
                    res.json(utils.returns(arguments));
                });
                break;
            case '002':
                var startdate = req.query.startdate,
                    enddate   = req.query.enddate;
                attenceDao.attenceAnalyse({
                    type:'1',
                    startdate:startdate?startdate:null,
                    enddate:enddate?enddate:null
                },true,function(err,data){
                    if(err){
                        res.json(utils.returns(arguments));
                        return;
                    }
                    attenceDao.attenceAnalyse({
                        type:'0',
                        startdate:startdate?startdate:null,
                        enddate:enddate?enddate:null
                    },true,function(err,data2){
                        res.json(utils.returns([err,data.concat(data2)]));
                    });
                });
                break;
        }

    }
});
module.exports = router;
