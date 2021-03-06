/**
 * Created by yanglang on 2016/4/13.
 * 角色管理模块
 */

var frameworkBase = require('./framework/framework-base');
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
};

RoleManage.prototype.loadBaseView = function () {
    var that = this;
    this.loadFragment('/views/modules/role-manage.html').then(function(html){
        that.render(html);
        $('.tablecontainer',that.dom).height(that.dom.height()-55);
        that.initTable();
        that.bindEvents();
    });
};

RoleManage.prototype.initTable = function () {
    var that = this, $tableMenu = $('#table-context-menu');
    that.$tableMenu = $tableMenu;
    $('.easyui-linkbutton',this.dom).linkbutton();
    var columns = require('../../../../configs/modules/role-manage-Column.js');
    that.$table = $('#dataTable',this.dom).datagrid({
        url: '/role/list',
        method: 'get',
        columns: [columns],
        cache:false,
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
        onRowContextMenu:function(event,rowIndex,rowData){
            if(!rowData)
                return;
            event.preventDefault();
            that.$table.datagrid('unselectAll',rowIndex);
            that.$table.datagrid('selectRow',rowIndex);
            $tableMenu.menu('show',{
                left: event.clientX,
                top: event.clientY
            });
        },
        toolbar: '#role-manage-toolbar'
    });
    $tableMenu.menu({
        onClick:function(item){
            var _id = item.id, id = _id.replace('context_','');
            $('#'+id,that.dom).click();
        },
        hideOnUnhover:false
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
    //赋权
    $('#authority_btn',this.dom).click(function(){
        var rowData;
        if(!(rowData = getSelectRow()))
            return;
        Events.require('authority-control').addCallback(function(flag){
        }).init({showType:'Pop',role_id:rowData.role_id});
    });
    //设置属于当前角色的用户
    $('#role_user_btn',this.dom).click(function(){
        var rowData;
        if(!(rowData = getSelectRow()))
            return;
        Events.require('user2role').addCallback(function(flag){
        }).init({showType:'Pop',role_id:rowData.role_id});
    });
    //删除信息
    $('#delete_role_btn',this.dom).click(function(){
        var rows;
        if(!(rows = getCheckRow()))
            return;
        swal({
            title: "确认",
            text: "删除选中角色将会清空此角色所关联的组织机构与用户关系，确认删除吗？",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "删除",
            cancelButtonText: "取消",
            closeOnConfirm: true
        }, function () {
            that.save('/role/save',{action:'003',role_id:function(){
                var ids = [];
                rows.forEach(function(item){
                    ids.push(item.role_id);
                });
                return ids.join(',');
            }()},function(data){
                if(data.success){
                    that.toast("删除角色成功!");
                    Events.notify('onRefresh:role-manage');
                }else{
                    that.toast(data.message);
                }
            });
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
    function getCheckRow(){
        var rows = that.$table.datagrid('getChecked');
        if(rows.length == 0){
            swal("提示", "请至少选择一条数据!", "warning");
            return;
        }
        return rows;
    }
};

/**
 * 销毁方法
 * 由框架调用，主要用于销毁订阅的事件
 */
RoleManage.prototype.finish = function () {
    Events.unsubscribe('onRefresh:role-manage');
    this.$tableMenu && this.$tableMenu.menu('destroy');
    frameworkBase.finish.apply(this,arguments);
};

var roleManage = new RoleManage();
Events.subscribe('onWindowResize',function(){
    if(!roleManage.dom)
        return;
    $('.tablecontainer',roleManage.dom).height(roleManage.dom.height()-15-$('.condition-wrap',roleManage.dom).height());
    roleManage.$table.datagrid('resize');
});

module.exports = roleManage;

