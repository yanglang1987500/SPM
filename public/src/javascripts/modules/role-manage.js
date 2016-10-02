/**
 * Created by yanglang on 2016/4/13.
 * 角色管理
 */

var frameworkBase = require('../framework/framework-base');
require('../libs/easyui-lang-zh_CN.js');
require('../../stylesheets/modules/role-manage.scss');
require('../../stylesheets/easyui.css');
var Calendar = require('../libs/calendar');
var RoleManage = function () {};

//继承自框架基类
RoleManage.prototype = $.extend({}, frameworkBase);
RoleManage.prototype.id = 'role-manage';


/**
 * 模块初始化入口<br>
 * @method init
 * @param options 参数对象
 */
RoleManage.prototype.init = function (options) {
    var that = this;
    this.options = $.extend({}, options);
    that.setTitle('角色管理').setHeight(700).setWidth(780);
    frameworkBase.init.call(this, options);
    this.loadBaseView();
    this.bindEvents();
};

RoleManage.prototype.loadBaseView = function () {
    var that = this;
    var html = require('../../../../views/modules/role-manage.html');
    this.render(html);
    $('.tablecontainer',this.dom).height(this.dom.height()-55);
    $('.easyui-linkbutton',this.dom).linkbutton();
    var columns = require('../../../../configs/modules/role-manage-Column.js');
    that.$table = $('#dataTable',this.dom).datagrid({
        url: '/role/list',
        method: 'get',
        columns: [columns],
        pagination: false,
        pageSize: 20,
        ctrlSelect: true,
        checkOnSelect: true,
        selectOnCheck: true,
        loadMsg: '正在查询，请稍候……',
        striped: true,
        fit: true,
        fitColumns: false,
        loadFilter: function (data) {
            if(!data.success){
                that.toast(data.message);
            }
            return {rows: data.data, total: data.data.length};
        },
        onDblClickRow: function (rowIndex, rowData) {
            Events.require('role-add-modify').addCallback(function(flag){
                if(flag)
                    Events.notify('onRefresh:role-manage');
            }).init({showType:'Pop',action:'002',role_id:rowData.role_id});
        },
        toolbar: '#role-manage-toolbar'
    });

    var searchBox = $('#role-manage #home-easyui-searchbox',that.dom).searchbox({
        searcher: function (value, name) {
            Events.notify('onRefresh:role-manage');
        },
        prompt: '请输关键字，如角色名'
    });


    //订阅刷新消息
    Events.subscribe('onRefresh:role-manage',function(){
        that.$table.datagrid('load',{
            key:searchBox.searchbox('getValue')
        });
    });
    
    
};

/**
 * 绑定按钮点击事件
 */
RoleManage.prototype.bindEvents = function () {
    var that = this;
    //添加信息
    $('#add_role_btn',this.dom).click(function(){
        Events.require('role-add-modify').addCallback(function(flag){
            if(flag)
                Events.notify('onRefresh:role-manage');
        }).init({showType:'Pop'});
    });
    //修改信息
    $('#modify_role_btn',this.dom).click(function(){
        var rowData;
        if(!(rowData = getSelectRow()))
            return;
        Events.require('role-add-modify').addCallback(function(flag){
            if(flag)
                Events.notify('onRefresh:role-manage');
        }).init({showType:'Pop',action:'002',role_id:rowData.role_id});
    });
    //修改密码
    $('#authority_btn',this.dom).click(function(){
        var rowData;
        if(!(rowData = getSelectRow()))
            return;

    });
    //删除信息
    $('#delete_role_btn',this.dom).click(function(){
        var rowData;
        if(!(rowData = getSelectRow()))
            return;
        that.save('/role/save',{action:'003',role_id:rowData.role_id},function(data){
            if(data.success){
                that.toast("删除角色成功!");
                Events.notify('onRefresh:role-manage');
            }else{
                that.toast(data.message);
            }
        });
    });
   

    function getSelectRow(){
        var rowData = that.$table.datagrid('getSelected');
        if(!rowData){
            swal("提示", "请先选择一条数据!", "warning");
            return;
        }
        return rowData;
    }
};

/**
 * 销毁方法
 * 由框架调用，主要用于销毁订阅的事件
 */
RoleManage.prototype.finish = function () {
    Events.unsubscribe('onRefresh:role-manage');
    frameworkBase.finish.apply(this,arguments);
};

var roleManage = new RoleManage();
Events.subscribe('onWindowResize',function(){
    if(!roleManage.dom)
        return;
    $('.tablecontainer',roleManage.dom).height(roleManage.dom.height()-55);
});

module.exports = roleManage;

