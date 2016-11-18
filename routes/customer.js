/**
 * 客户列表查询路由
 */
var express = require('express');
var router = express.Router();
var customerDao = require('../daos/customerDao');
var fs = require("fs");
var utils = require('../libs/utils');
var websocket = require('../framework/websocket');
var Events = require('../framework/framework-events');
var Calendar = require('../libs/calendar');
var xlsx = require('node-xlsx');
/**
 * 客户列表查询
 */
router.get('/customer/list', function (req, res, next) {
    if (req.session.isLogin) {
        var key = req.query.key,
            company_id = req.query.company_id;
        customerDao.customerSearch({
            key:key?key:null,
            company_id:company_id?company_id:null
        },function(err,data){
            res.json(utils.returns(arguments));
        });
    }
});

var MODIFYCOLUMNS = ['customer_id','customer_code','customer_name','customer_job','tel','qq','mail','customer_mark','company_id','create_time','update_time'];
/**
 * 客户保存
 */
router.post('/customer/save', function (req, res, next) {
    if (req.session.isLogin) {
        var action = req.body.action;
        if(action == '001'){//新增
            var customer_code = req.body.customer_code,
                customer_name = req.body.customer_name,
                customer_job = req.body.customer_job,
                tel = req.body.tel,
                qq = req.body.qq,
                mail = req.body.mail,
                customer_mark = req.body.customer_mark,
                company_id = req.body.company_id;
            customerDao.addCustomer({
                customer_code:customer_code,
                customer_name:customer_name,
                customer_job:customer_job,
                tel:tel,
                qq:qq,
                mail:mail,
                customer_mark:customer_mark,
                company_id:company_id
            },function(err,data){
                res.json(utils.returns(arguments));
            });
        }else if(action == '002'){//修改
            var params = {};
            for(var key in req.body){
                if(MODIFYCOLUMNS.indexOf(key)!=-1)
                    params[key] = req.body[key];
            }
            customerDao.modifyCustomer(params,function(err,data){
                if(err){
                    res.json(utils.returns(false,err.message));
                }else{
                    res.json(utils.returns(true,data));
                }
            });
        }else if(action == '003'){//删除
            var customer_id = req.body.customer_id;
            customerDao.removeCustomer(customer_id,function(err,data){
                res.json(utils.returns(arguments));
            });
        }else if(action == '004'){//批量修改所属公司
            var customer_id = req.body.customer_id;
            var company_id = req.body.company_id;
            var is_copy = req.body.is_copy == 'true';
            is_copy ? customerDao.copyCustomerCompany(customer_id,company_id,function(err,data){
                res.json(utils.returns(arguments));
            }):customerDao.modifyCustomerCompany(customer_id,company_id,function(err,data){
                res.json(utils.returns(arguments));
            });
        }
    }
});

/**
 * 根据客户id客户查询
 */
router.get('/customer/search/:customer_id', function (req, res, next) {
    var customer_id = req.params.customer_id;
    customerDao.customerSearchById(customer_id,function(){
        res.json(utils.returns(arguments));
    });
});

router.get('/customer/export', function (req, res, next) {
    if (req.session.isLogin) {
        var key = req.query.key,
            company_id = req.query.company_id;
        customerDao.customerSearch({
            key:key?key:null,
            company_id:company_id?company_id:null
        },function(err,data){
            if(err){
                res.json(utils.returns(arguments));
                return;
            }

            //加载表格列配置文件
            var _columns = require('../configs/modules/customer-manage-Column');
            var _columns2 = require('../configs/modules/company-manage-Column');
            var columns = _columns.slice(1);
            var columns2 = _columns2.slice(1);
            columns = columns.concat(columns2);
            var datas = [];
            var titles = [];
            columns.forEach(function (obj) {
                titles.push(obj.title);
            });
            datas.push(titles);
            for (var i = 0; i < data.length; i++) {
                var row = [];
                for (var j = 0; j < columns.length; j++) {
                    var formatter = columns[j].formatter_back ? columns[j].formatter_back : columns[j].formatter;
                    row.push(formatter ? formatter(data[i][columns[j].field],data[i]) : function(){
                        if(columns[j].field.indexOf('.')!=-1){
                            var tmps = columns[j].field.split('.');
                            return data[i][tmps[0]][tmps[1]];
                        }
                        return data[i][columns[j].field];
                    }());
                }
                datas.push(row);
            }

            res.setHeader('Content-Type', 'application/vnd.openxmlformats');
            res.setHeader("Content-Disposition", "attachment; filename=customer_"+utils.guid()+".xlsx");
            var buffer = xlsx.build([{name: "mySheetName", data: datas}]);
            res.end(buffer, 'binary');
        });
    }
});

module.exports = router;
