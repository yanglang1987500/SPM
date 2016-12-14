/**
 * 账目新增修改模块
 */
var frameworkBase = require('./framework/framework-base');
require('../../stylesheets/easyui.css');
require('../libs/ztree/jquery.ztree.all.min');
require('../libs/ztree/css/zTreeStyle/zTreeStyle.css');
var AccountAddModify = function(){ };

//继承自框架基类
AccountAddModify.prototype = $.extend({},frameworkBase);
AccountAddModify.prototype.id = 'account-add-modify';

 
/**
 * 模块初始化入口<br>
 * @method init
 * @param options 参数对象
 */
AccountAddModify.prototype.init = function(options){
    var that = this;
    this.options = $.extend({action:'001'},options);
    that.setTitle(this.options.action == '001'?'添加账目':'编辑账目').setHeight(330).setWidth(400);
    frameworkBase.init.call(this,options);
    this.loadBaseView();
    this.bindEvents();
    if(that.options.action == '002'){
        that.restoreData();
    }
};

AccountAddModify.prototype.loadBaseView = function(options){
    var that = this;
    var html = require('../../../../views/modules/account-add-modify.html');
    this.render(html);
};

AccountAddModify.prototype.bindEvents = function(){
    var that = this;
    var account_startdate = $("#account_startdate",that.dom).datebox({
        editable:false ,
        formatter: function (date) {
            return Calendar.getInstance(date).format('yyyy-MM-dd');
        }
    });
    var account_enddate = $("#account_enddate",that.dom).datebox({
        editable:false ,
        formatter: function (date) {
            return Calendar.getInstance(date).format('yyyy-MM-dd');
        }
    });
    $('#confirmBtn',this.dom).click(function(){
        var account_name = $('#account_name',that.dom).val();
        var payed = $('#payed',that.dom).val();
        var owed = $('#owed',that.dom).val();
        var startdate = account_startdate.combo('getValue').replace(/-/gi,'');
        var enddate = account_enddate.combo('getValue').replace(/-/gi,'');
        if($.trim(account_name) === '' ){
            swal("提示", "请输入账目名称!", "warning");
            return;
        }
        that.save('/account/save',{
            action:that.options.action,
            account_id:that.options.account_id,
            account_name:account_name,
            payed:payed,
            owed:owed,
            account_startdate:startdate,
            account_enddate:enddate,
            company_id:that.options.company_id
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


AccountAddModify.prototype.restoreData = function() {
    var that = this;
    this.query('/account/search/'+this.options.account_id,function(data){
        if(!data.success){
            that.toast(data.message);
            return;
        }
        data = data.data;
        $('#account_name',that.dom).val(data.account_name);
        data.account_startdate && $('#account_startdate',that.dom).datebox("setValue",Calendar.getInstance(data.account_startdate).format('yyyy-MM-dd'));
        data.account_enddate && $('#account_enddate',that.dom).datebox("setValue",Calendar.getInstance(data.account_enddate).format('yyyy-MM-dd'));
        $('#payed',that.dom).val(data.payed);
        $('#owed',that.dom).val(data.owed);
    });
};

/**
 * 销毁方法
 * 由框架调用，主要用于销毁订阅的事件
 */
AccountAddModify.prototype.finish = function () {
    frameworkBase.finish.apply(this,arguments);
};

module.exports = new AccountAddModify();