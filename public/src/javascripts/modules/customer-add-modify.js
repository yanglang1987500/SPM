/**
 * 客户新增修改模块
 */
var frameworkBase = require('./framework/framework-base');
require('../../stylesheets/modules/customer-add-modify.scss');
require('../../stylesheets/easyui.css');
require('../libs/ztree/jquery.ztree.all.min');
require('../libs/ztree/css/zTreeStyle/zTreeStyle.css');
var CustomerAddModify = function(){ };

//继承自框架基类
CustomerAddModify.prototype = $.extend({},frameworkBase);
CustomerAddModify.prototype.id = 'customer-add-modify';


/**
 * 模块初始化入口<br>
 * @method init
 * @param options 参数对象
 */
CustomerAddModify.prototype.init = function(options){
    var that = this;
    this.options = $.extend({action:'001'},options);
    that.setTitle(this.options.action == '001'?'添加客户':'编辑客户').setHeight(500).setWidth(400);
    frameworkBase.init.call(this,options);
    this.loadBaseView();
    this.bindEvents();
    if(that.options.action == '002'){
        that.restoreData();
    }
};

CustomerAddModify.prototype.loadBaseView = function(options){
    var that = this;
    var html = require('../../../../views/modules/customer-add-modify.html');
    this.render(html);
};

CustomerAddModify.prototype.bindEvents = function(){
    var that = this;
    $('#confirmBtn',this.dom).click(function(){
        var customer_code = $('#customer_code',that.dom).val();
        var customer_name = $('#customer_name',that.dom).val();
        var customer_job = $('#customer_job',that.dom).val();
        var tel = $('#tel',that.dom).val();
        var qq = $('#qq',that.dom).val();
        var mail = $('#mail',that.dom).val();
        var customer_mark = $('#customer_mark',that.dom).val();
        if($.trim(customer_name) === '' ){
            swal("提示", "请输入客户姓名!", "warning");
            return;
        }
        that.save('/customer/save',{
            action:that.options.action,
            customer_id:that.options.customer_id,
            customer_code:customer_code,
            customer_name:customer_name,
            customer_job:customer_job,
            tel:tel,
            qq:qq,
            mail:mail,
            company_id:that.options.company_id,
            customer_mark:customer_mark
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


CustomerAddModify.prototype.restoreData = function() {
    var that = this;
    this.query('/customer/search/'+this.options.customer_id,function(data){
        if(!data.success){
            that.toast(data.message);
            return;
        }
        data = data.data;
        $('#customer_code',that.dom).val(data.customer_code);
        $('#customer_name',that.dom).val(data.customer_name);
        $('#customer_job',that.dom).val(data.customer_job);
        $('#tel',that.dom).val(data.tel);
        $('#qq',that.dom).val(data.qq);
        $('#mail',that.dom).val(data.mail);
        $('#customer_mark',that.dom).val(data.customer_mark);
    });
};

/**
 * 销毁方法
 * 由框架调用，主要用于销毁订阅的事件
 */
CustomerAddModify.prototype.finish = function () {
    frameworkBase.finish.apply(this,arguments);
};

module.exports = new CustomerAddModify();