/**
 * 字典项新增或修改模块
 */
var frameworkBase = require('./framework/framework-base');
require('../../stylesheets/modules/dim-add-modify.scss');
require('../../stylesheets/easyui.css');
require('../libs/ztree/jquery.ztree.all.min');
require('../libs/ztree/css/zTreeStyle/zTreeStyle.css');
var DimAddModify = function(){ };

//继承自框架基类
DimAddModify.prototype = $.extend({},frameworkBase);
DimAddModify.prototype.id = 'dim-add-modify';


/**
 * 模块初始化入口<br>
 * @method init
 * @param options 参数对象
 */
DimAddModify.prototype.init = function(options){
    var that = this;
    this.options = $.extend({action:'001'},options);
    that.setTitle(this.options.action == '001'?'添加字典项':'编辑字典项').setHeight(340).setWidth(400);
    frameworkBase.init.call(this,options);
    this.loadBaseView();
    this.bindEvents();
    if(this.options.action == '002'){
        this.restoreData();
    }
};

DimAddModify.prototype.loadBaseView = function(options){
    var that = this;
    var html = require('../../../../views/modules/dim-add-modify.html');
    this.render(html);
};

DimAddModify.prototype.bindEvents = function(){
    var that = this;
    $('#confirmBtn',this.dom).click(function(){
        var dim_id = $('#dim_id',that.dom).val();
        var dim_name = $('#dim_name',that.dom).val();
        var dim_value = $('#dim_value',that.dom).val();
        var group_id = $('#group_id',that.dom).val();
        var group_name = $('#group_name',that.dom).val();
        if($.trim(dim_id) === '' ){
            swal("提示", "请输入字典项id!", "warning");
            return;
        }
        if($.trim(dim_name) === '' ){
            swal("提示", "请输入字典项名称!", "warning");
            return;
        }
        if($.trim(dim_value) === '' ){
            swal("提示", "请输入字典项值!", "warning");
            return;
        }
        if($.trim(group_id) === '' ){
            swal("提示", "请输入分组id!", "warning");
            return;
        }
        if($.trim(group_name) === '' ){
            swal("提示", "请输入分组名称!", "warning");
            return;
        }
        that.save('/dim/save',{
            action:that.options.action,
            id:that.options.id,
            dim_id:dim_id,
            dim_name:dim_name,
            dim_value:dim_value,
            group_id:group_id,
            group_name:group_name
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

DimAddModify.prototype.restoreData = function() {
    var that = this;
    this.query('/dim/search/'+this.options.id,function(data){
        if(!data.success){
            that.toast(data.message);
            return;
        }
        data = data.data;
        $('#dim_id',that.dom).val(data.dim_id);
        $('#dim_name',that.dom).val(data.dim_name);
        $('#dim_value',that.dom).val(data.dim_value);
        $('#group_id',that.dom).val(data.group_id);
        $('#group_name',that.dom).val(data.group_name);
    });
};

/**
 * 销毁方法
 * 由框架调用，主要用于销毁订阅的事件
 */
DimAddModify.prototype.finish = function () {
    frameworkBase.finish.apply(this,arguments);
};

module.exports = new DimAddModify();