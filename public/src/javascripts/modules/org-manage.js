/**
 * Created by yanglang on 2016/4/13.
 * 组织机构管理
 */

var frameworkBase = require('./framework/framework-base');
require('../libs/easyui-lang-zh_CN.js');
require('../libs/ztree/jquery.ztree.all.min');
require('../libs/ztree/css/zTreeStyle/zTreeStyle.css');
require('../../stylesheets/modules/org-manage.scss');
require('../../stylesheets/easyui.css');
var OrgManage = function () {};

//继承自框架基类
OrgManage.prototype = $.extend({}, frameworkBase);
OrgManage.prototype.id = 'org-manage';


/**
 * 模块初始化入口<br>
 * @method init
 * @param options 参数对象
 */
OrgManage.prototype.init = function (options) {
    var that = this;
    this.options = $.extend({}, options);
    that.setTitle('组织机构管理').setHeight(700).setWidth(780);
    frameworkBase.init.call(this, options);
    this.loadBaseView();

};

OrgManage.prototype.loadBaseView = function () {
    var that = this;
    this.loadFragment('/views/modules/org-manage.html').then(function(html){
        that.render(html);
        $('.tablecontainer',that.dom).height(that.dom.height()-55);
        that.initTable();
        that.initOrgTree();
        that.bindEvents();
    });
};

OrgManage.prototype.initTable = function () {
    var that = this;
    $('.easyui-linkbutton',this.dom).linkbutton();
    var columns = require('../../../../configs/modules/org-manage-Column.js');
    that.$table = $('#dataTable',this.dom).datagrid({
        url: '/org/orguser',
        method: 'get',
        columns: [columns],
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
        },
        toolbar: '#org-manage-toolbar'
    });

    var searchBox = $('#org-manage #home-easyui-searchbox',that.dom).searchbox({
        searcher: function (value, name) {
            Events.notify('onRefresh:org-manage');
        },
        prompt: '请输关键字，如用户名'
    });

    var startDate = $("#startdate",that.dom).datebox({
        editable:false ,
        formatter: function (date) {
            return Calendar.getInstance(date).format('yyyy-MM-dd');
        },
        onChange:function(date){
            Events.notify('onRefresh:org-manage');
        }
    });
    var endDate = $("#enddate",that.dom).datebox({
        editable:false ,
        formatter: function (date) {
            return Calendar.getInstance(date).format('yyyy-MM-dd');
        },
        onChange:function(date){
            Events.notify('onRefresh:org-manage');
        }
    });

    //订阅刷新消息
    Events.subscribe('onRefresh:org-manage',function(org_id){
        that.$table.datagrid('load',{
            org_id:selectOrgId,
            key:searchBox.searchbox('getValue'),
            startdate:startDate.combo('getValue').replace(/-/gi,''),
            enddate:endDate.combo('getValue').replace(/-/gi,'')
        });
    });
};

var ztreeObj = null, selectOrgId, firstRefresh = false;
OrgManage.prototype.initOrgTree = function(){
    var that = this;
    firstRefresh = false;
    var setting = {
        async:{
            enable:true,
            url:'/org/listbypid',
            autoParam:['org_id'],
            type:'get'
        },
        edit:{
            enable:true,
            showRemoveBtn:false,
            showRenameBtn:false,
            drag:{
                prev:false,
                next:false,
                inner:true,
                isMove:true,
                isCopy:false
            }
        },
        data:{
            key:{
                name:'org_title',
                title:'org_title'
            },
            simpleData:{
                idKey:'org_id',
                pIdKey:'org_parent_id'
            },
            keep:{
                parent:true
            }
        },
        callback:{
            onClick:function(event, treeId, treeNode){
                selectOrgId = treeNode.org_id;
                Events.notify('onRefresh:org-manage');
            },
            onAsyncSuccess:function(){
                if(firstRefresh)
                    return;
                selectOrgId = ztreeObj.getNodes()[0].org_id;
                ztreeObj.selectNode(ztreeObj.getNodes()[0], false, false);
                Events.notify('onRefresh:org-manage');
                firstRefresh = true;
            },
            onDrop:function(event, treeId, treeNodes, targetNode, moveType){
                that.save('/org/save',{
                    action:'002',
                    org_id:treeNodes[0].org_id,
                    org_parent_id:targetNode?targetNode.org_id:'0'
                },function(data){
                    if(!data.success){
                        that.toast(data.message);
                        return;
                    }
                });
            }
        }
    };
    ztreeObj = $.fn.zTree.init($("#orgTree",this.dom), setting);
};

/**
 * 绑定按钮点击事件
 */
OrgManage.prototype.bindEvents = function () {
    var that = this;
    //添加组织机构
    $('#addOrgBtn',this.dom).click(function(){
        var nodes = ztreeObj.getSelectedNodes(),org_parent_id;
        if(nodes.length>0){
            org_parent_id = nodes[0].org_id;
        }
        Events.require('org-add-modify').addCallback(function(flag,_org_id){
            if(flag){
                //TODO 添加新节点
                if(_org_id == '0'){
                    ztreeObj.reAsyncChildNodes(null, "refresh");
                }else{
                    var nodes = ztreeObj.getNodesByParam("org_id", _org_id, null);
                    ztreeObj.reAsyncChildNodes(nodes[0], "refresh");
                }
                that.toast('保存成功！');
            }
        }).init({showType:'Pop',org_parent_id:org_parent_id});
    });
    //编辑组织机构
    $('#modifyOrgBtn',this.dom).click(function(){
        var nodes = ztreeObj.getSelectedNodes(),org_id,org_parent_id;
        if(nodes.length>0){
            org_id = nodes[0].org_id;
            org_parent_id = nodes[0].org_parent_id;
        }else{
            swal("提示", "请先选择一条数据!", "warning");
            return;
        }
        Events.require('org-add-modify').addCallback(function(flag,_org_id){
            if(flag){
                //TODO 添加新节点
                if(_org_id == '0'){
                    ztreeObj.reAsyncChildNodes(null, "refresh");
                }else{
                    var nodes = ztreeObj.getNodesByParam("org_id", org_id, null);
                    ztreeObj.reAsyncChildNodes(nodes[0].getParentNode(), "refresh");
                }
                that.toast('保存成功！');
            }
        }).init({showType:'Pop',action:'002',org_id:org_id,org_parent_id:org_parent_id});
    });
    //删除组织机构
    $('#removeOrgBtn', this.dom).click(function () {
        var nodes = ztreeObj.getSelectedNodes();
        if (nodes.length == 0) {
            swal("提示", "请先选择一条数据!", "warning");
            return;
        }
        swal({
            title: "确认",
            text: "删除该组织机构将会清空其所关联的角色与用户关系，确认删除吗？",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "删除",
            cancelButtonText: "取消",
            closeOnConfirm: true
        }, function () {
            that.save('/org/save', {action:'003',org_id: nodes[0].org_id}, function (data) {
                if (!data.success) {
                    that.toast(data.message);
                    return;
                }
                ztreeObj.removeNode(nodes[0]);
                that.toast('删除成功！');
            });
        });

    });
    //编辑组织机构用户
    $('#modify_org_user_btn',this.dom).click(function(){
        var nodes = ztreeObj.getSelectedNodes();
        if (nodes.length == 0) {
            swal("提示", "请先选择要操作的组织机构数据!", "warning");
            return;
        }
        Events.require('user2org').addCallback(function(flag){
            if(flag)
                Events.notify('onRefresh:org-manage');
        }).init({showType:'Pop',org_id:nodes[0].org_id});
    });

    //添加用户
    $('#add_user_btn',this.dom).click(function(){
        var nodes = ztreeObj.getSelectedNodes();
        if (nodes.length == 0) {
            swal("提示", "请先选择组织机构数据!", "warning");
            return;
        }
        Events.require('user-add-modify').addCallback(function(flag){
            if(flag)
                Events.notify('onRefresh:org-manage');
        }).init({showType:'Pop',org_id:nodes[0].org_id});
    });
    //修改信息
    $('#modify_user_btn',this.dom).click(function(){
        var rowData;
        if(!(rowData = getSelectRow()))
            return;
        Events.require('user-add-modify').addCallback(function(flag){
            if(flag)
                Events.notify('onRefresh:org-manage');
        }).init({showType:'Pop',action:'002',user_id:rowData.user_id});
    });
    //修改密码
    $('#modify_password_btn',this.dom).click(function(){
        var rowData;
        if(!(rowData = getSelectRow()))
            return;
        Events.require('user-add-modify').addCallback(function(flag){
            if(flag)
                Events.notify('onRefresh:org-manage');
        }).init({showType:'Pop',action:'003',user_id:rowData.user_id});
    });
    //删除信息
    $('#delete_user_btn',this.dom).click(function(){
        var rowData;
        if(!(rowData = getSelectRow()))
            return;
        swal({
            title: "确认",
            text: "删除该用户将会清空此用户所属于组织机构以及其所拥有的角色关联数据，确认删除吗？",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "删除",
            cancelButtonText: "取消",
            closeOnConfirm: true
        }, function () {
            that.save('/user/save',{action:'004',user_id:rowData.user_id},function(data){
                if(data.success){
                    that.toast("删除用户成功!");
                    Events.notify('onRefresh:org-manage');
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
    /**
     * 为组织机构分配角色
     */
    $('#authRoleOrgBtn',this.dom).click(function(){
        var nodes = ztreeObj.getSelectedNodes();
        if (nodes.length == 0) {
            swal("提示", "请先选择要操作的组织机构数据!", "warning");
            return;
        }
        Events.require('role2org').init({showType:'Pop',org_id:nodes[0].org_id});
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
OrgManage.prototype.finish = function () {
    Events.unsubscribe('onRefresh:org-manage');
    frameworkBase.finish.apply(this,arguments);
};

var orgManage = new OrgManage();
Events.subscribe('onWindowResize',function(){
    if(!orgManage.dom)
        return;
    $('.tablecontainer',orgManage.dom).height(orgManage.dom.height()-55);
});

module.exports = orgManage;

