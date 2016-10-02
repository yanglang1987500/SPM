
var frameworkBase = require('../framework/framework-base');
require('../../stylesheets/modules/user-add-modify.scss');
var UserAddModify = function(){ };

//继承自框架基类
UserAddModify.prototype = $.extend({},frameworkBase);
UserAddModify.prototype.id = 'user-add-modify';

var ACTIONS = {
    '001':{title:'添加用户',height:240},
    '002':{title:'编辑用户',height:150},
    '003':{title:'修改密码',height:240}
};
/**
 * 模块初始化入口<br>
 * @method init
 * @param options 参数对象
 */
UserAddModify.prototype.init = function(options){
    var that = this;
    this.options = $.extend({action:'001'},options);
    that.setTitle(ACTIONS[this.options.action].title).setHeight(ACTIONS[this.options.action].height).setWidth(400);
    frameworkBase.init.call(this,options);
    this.loadBaseView();
    this.bindEvents();
    if(this.options.action == '002' || this.options.action == '003'){
        this.restoreData();
        if(this.options.action == '002'){
            $('#user_password,#user_repassword',this.dom).parent().hide();
        }else
            $('#user_name',this.dom).attr('disabled',true);
    }
};

UserAddModify.prototype.loadBaseView = function(options){
    var html = require('../../../../views/modules/user-add-modify.html');
    this.render(html);
};

UserAddModify.prototype.bindEvents = function(){
    var that = this;
    $('#confirmBtn',this.dom).click(function(){
        var user_name = $('#user_name',that.dom).val();
        var user_password = $('#user_password',that.dom).val();
        var user_repassword = $('#user_repassword',that.dom).val();
        if($.trim(user_name) === '' ){
            swal("提示", "请输入用户名!", "warning");
            return;
        }
        if($.trim(user_password) === '' && that.options.action!='002' ){
            swal("提示", "请输入密码!", "warning");
            return;
        }
        if(user_password != user_repassword && that.options.action!='002'){
            swal("提示", "请确认两次密码是否一致!", "warning");
            return;
        }
        var params = {
            action:that.options.action,
            user_id:that.options.user_id,
            user_name:user_name,
            user_password:user_password
        };
        if(that.options.action == '002'){
            //修改用户名不需要改动密码
            delete params.user_password;
        }
        that.save('/user/save',params,function(data){
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

UserAddModify.prototype.restoreData = function() {
    var that = this;
    this.query('/user/search/'+this.options.user_id,function(data){
        if(!data.success){
            that.toast(data.message);
            return;
        }
        data = data.data;
        $('#user_name',that.dom).val(data.user_name);
    });
};

/**
 * 销毁方法
 * 由框架调用，主要用于销毁订阅的事件
 */
UserAddModify.prototype.finish = function () {
    frameworkBase.finish.apply(this,arguments);
};

module.exports = new UserAddModify();