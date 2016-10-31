/**
 * Created by yanglang on 2016/4/13.
 * 用户管理模块
 */

var frameworkBase = require('./framework/framework-base');
require('../libs/easyui-lang-zh_CN.js');
require('../../stylesheets/modules/user-manage.scss');
require('../../stylesheets/easyui.css');
var UserManage = function () {};

//继承自框架基类
UserManage.prototype = $.extend({}, frameworkBase);
UserManage.prototype.id = 'user-manage';


/**
 * 模块初始化入口<br>
 * @method init
 * @param options 参数对象
 */
UserManage.prototype.init = function (options) {
    var that = this;
    this.options = $.extend({}, options);
    that.setTitle('用户管理').setHeight(700).setWidth(780);
    frameworkBase.init.call(this, options);
    this.loadBaseView();
};

UserManage.prototype.loadBaseView = function () {
    var that = this;
    this.loadFragment('/views/modules/user-manage.html').then(function(html){
        that.render(html);
        $('.tablecontainer',that.dom).height(that.dom.height()-55);
        that.initTable();
        that.bindEvents();
    });
};

UserManage.prototype.initTable = function () {
    var that = this;
    $('.easyui-linkbutton',this.dom).linkbutton();
    var columns = require('../../../../configs/modules/user-manage-Column.js');
    that.$table = $('#dataTable',this.dom).datagrid({
        url: '/user/list',
        method: 'get',
        columns: [columns],
        cache:false,
        pagination: true,
        pageSize: 20,
        ctrlSelect: true,
        checkOnSelect: true,
        selectOnCheck: true,
        loadMsg: '正在查询，请稍候……',
        striped: true,
        fit: true,
        fitColumns: true,
        loadFilter: function (data) {
            if(!data.success){
                that.toast(data.message);
            }
            return data.data;
        },
        onDblClickRow: function (rowIndex, rowData) {
            Events.require('user-add-modify').addCallback(function(flag){
                if(flag)
                    Events.notify('onRefresh:user-manage');
            }).init({showType:'Pop',action:'002',user_id:rowData.user_id});
        },
        toolbar: '#user-manage-toolbar'
    });

    var searchBox = $('#user-manage #home-easyui-searchbox',that.dom).searchbox({
        searcher: function (value, name) {
            Events.notify('onRefresh:user-manage');
        },
        prompt: '请输关键字，如用户名'
    });

    var startDate = $("#startdate",that.dom).datebox({
        editable:false ,
        formatter: function (date) {
            return Calendar.getInstance(date).format('yyyy-MM-dd');
        },
        onChange:function(date){
            Events.notify('onRefresh:user-manage');
        }
    });
    var endDate = $("#enddate",that.dom).datebox({
        editable:false ,
        formatter: function (date) {
            return Calendar.getInstance(date).format('yyyy-MM-dd');
        },
        onChange:function(date){
            Events.notify('onRefresh:user-manage');
        }
    });

    //订阅刷新消息
    Events.subscribe('onRefresh:user-manage',function(){
        that.$table.datagrid('load',{
            key:searchBox.searchbox('getValue'),
            startdate:startDate.combo('getValue').replace(/-/gi,''),
            enddate:endDate.combo('getValue').replace(/-/gi,'')
        });
    });
};

/**
 * 绑定按钮点击事件
 */
UserManage.prototype.bindEvents = function () {
    var that = this;
    //添加用户
    $('#add_user_btn',this.dom).click(function(){
        Events.require('user-add-modify').addCallback(function(flag){
            if(flag)
                Events.notify('onRefresh:user-manage');
        }).init({showType:'Pop'});
    });
    //修改用户
    $('#modify_user_btn',this.dom).click(function(){
        var rowData;
        if(!(rowData = getSelectRow()))
            return;
        Events.require('user-add-modify').addCallback(function(flag){
            if(flag)
                Events.notify('onRefresh:user-manage');
        }).init({showType:'Pop',action:'002',user_id:rowData.user_id});
    });
    //修改密码
    $('#modify_password_btn',this.dom).click(function(){
        var rowData;
        if(!(rowData = getSelectRow()))
            return;
        Events.require('user-add-modify').addCallback(function(flag){
            if(flag)
                Events.notify('onRefresh:user-manage');
        }).init({showType:'Pop',action:'003',user_id:rowData.user_id});
    });
    //删除用户
    $('#delete_user_btn',this.dom).click(function(){
        var rows;
        if(!(rows = getCheckRow()))
            return;
        swal({
            title: "确认",
            text: "删除选中用户将会清空此用户所属于组织机构以及其所拥有的角色关联数据，确认删除吗？",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "删除",
            cancelButtonText: "取消",
            closeOnConfirm: true
        }, function () {
            that.save('/user/save',{action:'004',user_id:function(){
                var ids = [];
                rows.forEach(function(item){
                    ids.push(item.user_id);
                });
                return ids.join(',');
            }()},function(data){
                if(data.success){
                    that.toast("删除用户成功!");
                    Events.notify('onRefresh:user-manage');
                }else{
                    that.toast(data.message);
                }
            });
        });

    });
    /**
     * 为用户分配角色
     */
    $('#auth_role_btn',this.dom).click(function(){
        var rowData;
        if(!(rowData = getSelectRow()))
            return;
        Events.require('role2user').init({showType:'Pop',user_id:rowData.user_id});
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
UserManage.prototype.finish = function () {
    Events.unsubscribe('onRefresh:user-manage');
    frameworkBase.finish.apply(this,arguments);
};

var userManage = new UserManage();
Events.subscribe('onWindowResize',function(){
    if(!userManage.dom)
        return;
    $('.tablecontainer',userManage.dom).height(userManage.dom.height()-15-$('.condition-wrap',userManage.dom).height());
    userManage.$table.datagrid('resize');
});

module.exports = userManage;

