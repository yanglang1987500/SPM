/**
 * 新增修改角色模块
 */
var frameworkBase = require('../framework/framework-base');
require('../../stylesheets/modules/role-add-modify.scss');
var RoleAddModify = function(){ };

//继承自框架基类
RoleAddModify.prototype = $.extend({},frameworkBase);
RoleAddModify.prototype.id = 'role-add-modify';

var ACTIONS = {
    '001':{title:'添加角色',height:150},
    '002':{title:'编辑角色',height:150}
};
/**
 * 模块初始化入口<br>
 * @method init
 * @param options 参数对象
 */
RoleAddModify.prototype.init = function(options){
    var that = this;
    this.options = $.extend({action:'001'},options);
    that.setTitle(ACTIONS[this.options.action].title).setHeight(ACTIONS[this.options.action].height).setWidth(400);
    frameworkBase.init.call(this,options);
    this.loadBaseView();
    this.bindEvents();
    if(this.options.action == '002' ){
        this.restoreData();
    }
};

RoleAddModify.prototype.loadBaseView = function(options){
    var html = require('../../../../views/modules/role-add-modify.html');
    this.render(html);
};

RoleAddModify.prototype.bindEvents = function(){
    var that = this;
    $('#confirmBtn',this.dom).click(function(){
        var role_name = $('#role_name',that.dom).val();
        if($.trim(role_name) === '' ){
            swal("提示", "请输入角色名!", "warning");
            return;
        }
        var params = {
            action:that.options.action,
            role_id:that.options.role_id,
            role_name:role_name
        };
        that.save('/role/save',params,function(data){
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

RoleAddModify.prototype.restoreData = function() {
    var that = this;
    this.query('/role/search/'+this.options.role_id,function(data){
        if(!data.success){
            that.toast(data.message);
            return;
        }
        data = data.data;
        $('#role_name',that.dom).val(data.role_name);
    });
};

/**
 * 销毁方法
 * 由框架调用，主要用于销毁订阅的事件
 */
RoleAddModify.prototype.finish = function () {
    frameworkBase.finish.apply(this,arguments);
};

module.exports = new RoleAddModify();