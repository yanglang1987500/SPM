/**
 * 公司新增修改模块
 */
var frameworkBase = require('./framework/framework-base');
require('../../stylesheets/modules/company-add-modify.scss');
require('../../stylesheets/easyui.css');
require('../libs/ztree/jquery.ztree.all.min');
require('../libs/ztree/css/zTreeStyle/zTreeStyle.css');
var CompanyAddModify = function(){ };

//继承自框架基类
CompanyAddModify.prototype = $.extend({},frameworkBase);
CompanyAddModify.prototype.id = 'company-add-modify';


/**
 * 模块初始化入口<br>
 * @method init
 * @param options 参数对象
 */
CompanyAddModify.prototype.init = function(options){
    var that = this;
    this.options = $.extend({action:'001'},options);
    that.setTitle(this.options.action == '001'?'添加公司':'编辑公司').setHeight(this.options.action == '001'?400:400).setWidth(400);
    frameworkBase.init.call(this,options);
    this.loadBaseView();
    this.bindEvents();
    if(this.options.action == '002'){
        this.restoreData();
    }
};

CompanyAddModify.prototype.loadBaseView = function(options){
    var that = this;
    var html = require('../../../../views/modules/company-add-modify.html');
    this.render(html);
};

CompanyAddModify.prototype.bindEvents = function(){
    var that = this;
    $('#confirmBtn',this.dom).click(function(){
        var company_name = $('#company_name',that.dom).val();
        var company_address = $('#company_address',that.dom).val();
        var render_username = $('#render_username',that.dom).val();
        var render_price = $('#render_price',that.dom).val();
        var company_mark = $('#company_mark',that.dom).val();
        if($.trim(company_name) === '' ){
            swal("提示", "请输入公司名称!", "warning");
            return;
        }
        that.save('/company/save',{
            action:that.options.action,
            company_id:that.options.company_id,
            company_name:company_name,
            company_address:company_address,
            render_username:render_username,
            render_price:render_price,
            company_mark:company_mark,
        },function(data){
            if(!data.success){
                that.toast(data.message);
                return;
            }
            that.finish(true);
        });

    });
    $('#cancelBtn',this.dom).click(function(){
        that.finish(false);
    });
};

CompanyAddModify.prototype.restoreData = function() {
    var that = this;
    this.query('/company/search/'+this.options.company_id,function(data){
        if(!data.success){
            that.toast(data.message);
            return;
        }
        data = data.data;
        $('#company_name',that.dom).val(data.company_name);
        $('#company_address',that.dom).val(data.company_address);
        $('#render_username',that.dom).val(data.render_username);
        $('#render_price',that.dom).val(data.render_price);
        $('#company_mark',that.dom).val(data.company_mark);
    });
};

/**
 * 销毁方法
 * 由框架调用，主要用于销毁订阅的事件
 */
CompanyAddModify.prototype.finish = function () {
    frameworkBase.finish.apply(this,arguments);
};

module.exports = new CompanyAddModify();