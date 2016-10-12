/**
 * 修改密码模块
 */
var frameworkBase = require('./framework/framework-base');
require('../../stylesheets/modules/password-modify.scss');
require('../../stylesheets/easyui.css');
var PasswordModify = function(){ };

//继承自框架基类
PasswordModify.prototype = $.extend({},frameworkBase);
PasswordModify.prototype.id = 'password-modify';


/**
 * 模块初始化入口<br>
 * @method init
 * @param options 参数对象
 */
PasswordModify.prototype.init = function(options){
    var that = this;
    this.options = $.extend({},options);
    that.setTitle('修改密码').setHeight(240).setWidth(400);
    frameworkBase.init.call(this,options);
    this.loadBaseView();
    this.bindEvents();
};

PasswordModify.prototype.loadBaseView = function(options){
    var html = require('../../../../views/modules/password-modify.html');
    this.render(html);
};

PasswordModify.prototype.bindEvents = function(){
    var that = this;
    $('#confirmBtn',this.dom).click(function(){
        var oldPassword = $('#oldpassword',that.dom).val();
        var newPassword = $('#newpassword',that.dom).val();
        var rePassword = $('#repassword',that.dom).val();
        if($.trim(oldPassword) === '' ){
            swal("提示", "请输入原始密码!", "warning");
            return;
        }
        if($.trim(newPassword) === '' ){
            swal("提示", "请输入新密码!", "warning");
            return;
        }
        if($.trim(rePassword) !== $.trim(newPassword) ){
            swal("提示", "确认密码与新密码不一致!", "warning");
            return;
        }
        that.save('/user/passwordmodify',{
            oldPassword:oldPassword,
            newPassword:newPassword
        },function(data){
            if(data.success){
                swal("成功", '修改成功', "success");
                that.finish();
            }else{
                swal("抱歉", data.message, "error");
            }
        });

    });
    $('#cancelBtn',this.dom).click(function(){
        that.finish();
    });
    $('#oldpassword',this.dom)[0].focus();
};

module.exports = new PasswordModify();