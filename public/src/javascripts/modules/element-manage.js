/**
 * Created by yanglang on 2016/4/13.
 * 页面元素管理
 */

var frameworkBase = require('../framework/framework-base');
require('../libs/easyui-lang-zh_CN.js');
require('../libs/ztree/jquery.ztree.all.min');
require('../libs/ztree/css/zTreeStyle/zTreeStyle.css');
require('../../stylesheets/modules/element-manage.scss');
require('../../stylesheets/easyui.css');
var ElementManage = function () {};

//继承自框架基类
ElementManage.prototype = $.extend({}, frameworkBase);
ElementManage.prototype.id = 'element-manage';


/**
 * 模块初始化入口<br>
 * @method init
 * @param options 参数对象
 */
ElementManage.prototype.init = function (options) {
    var that = this;
    this.options = $.extend({}, options);
    that.setTitle('页面元素管理').setHeight(700).setWidth(780);
    frameworkBase.init.call(this, options);
    this.loadBaseView();
};

ElementManage.prototype.loadBaseView = function () {
    var that = this;
    this.loadFragment('/views/modules/element-manage.html').then(function(html){
        that.render(html);
        $('.tablecontainer',that.dom).height(that.dom.height()-55);
        that.initTable();
        that.initMenuTree();
        that.bindEvents();
    });
};

ElementManage.prototype.initTable = function () {
    var that = this;
    $('.easyui-linkbutton',this.dom).linkbutton();
    var columns = require('../../../../configs/modules/element-manage-Column.js');
    that.$table = $('#dataTable',this.dom).datagrid({
        url: '/element/list',
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
        fitColumns: true,
        loadFilter: function (data) {
            if(!data.success){
                that.toast(data.message);
            }
            return {rows: data.data, total: data.data.length};
        },
        onDblClickRow: function (rowIndex, rowData) {
            Events.require('element-add-modify').addCallback(function(flag){
                if(flag)
                    Events.notify('onRefresh:element-manage');
            }).init({showType:'Pop',action:'002',element_id:rowData.element_id});
        },
        toolbar: '#element-manage-toolbar'
    });

    var searchBox = $('#element-manage #home-easyui-searchbox',that.dom).searchbox({
        searcher: function (value, name) {
            Events.notify('onRefresh:element-manage');
        },
        prompt: '请输关键字，如元素名称或编码'
    });

    //订阅刷新消息
    Events.subscribe('onRefresh:element-manage',function(menu_id){
        that.$table.datagrid('load',{
            menu_id:selectMenuId,
            key:searchBox.searchbox('getValue')
        });
    });
};

var selectMenuId;
ElementManage.prototype.initMenuTree = function(){
    var that = this;
    this.query('/menu/list',function(data){
        if(!data.success){
            that.toast(data.message);
            return;
        }
        data.data.push({'menu_id':'0','menu_parent_id':null,'menu_title':'根节点','menu_url':''});
        var setting = {
            data:{
                keep:{
                    parent:true,
                    leaf:true
                },
                simpleData:{
                    enable:true,
                    idKey:'menu_id',
                    pIdKey:'menu_parent_id',
                    rootPId:null
                },
                key:{
                    name:'menu_title',
                    title:'menu_title'
                }
            },
            callback:{
                onClick:function(event, treeId, treeNode){
                    selectMenuId = treeNode.menu_id;
                    Events.notify('onRefresh:element-manage');
                }
            }
        };

        that.ztreeObj = $.fn.zTree.init($("#menuTree",that.dom), setting,data.data);
        that.ztreeObj.expandNode(that.ztreeObj.getNodes()[0], true, false, true);
        selectMenuId = that.ztreeObj.getNodes()[0].menu_id;
        that.ztreeObj.selectNode(that.ztreeObj.getNodes()[0], false, false);
        Events.notify('onRefresh:element-manage');
    });
};

/**
 * 绑定按钮点击事件
 */
ElementManage.prototype.bindEvents = function () {
    var that = this;

    //添加元素
    $('#add_element_btn',this.dom).click(function(){
        var nodes = that.ztreeObj.getSelectedNodes();
        if(nodes.length == 0){
            swal("提示", "请先选择一个菜单节点!", "warning");
            return;
        }
        if(nodes[0].menu_id == '0'){
            swal("提示", "根菜单节点上不允许创建元素!", "warning");
            return;
        }
        Events.require('element-add-modify').addCallback(function(flag){
            if(flag)
                Events.notify('onRefresh:element-manage');
        }).init({showType:'Pop',menu_id:nodes[0].menu_id});
    });
    //修改元素
    $('#modify_element_btn',this.dom).click(function(){
        var rowData;
        if(!(rowData = getSelectRow()))
            return;
        Events.require('element-add-modify').addCallback(function(flag){
            if(flag)
                Events.notify('onRefresh:element-manage');
        }).init({showType:'Pop',action:'002',element_id:rowData.element_id});
    });
    //删除元素
    $('#delete_element_btn',this.dom).click(function(){
        var rowData;
        if(!(rowData = getSelectRow()))
            return;
        that.save('/element/save',{action:'003',element_id:rowData.element_id},function(data){
            if(data.success){
                that.toast("删除信息成功!");
                Events.notify('onRefresh:element-manage');
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
ElementManage.prototype.finish = function () {
    Events.unsubscribe('onRefresh:element-manage');
    frameworkBase.finish.apply(this,arguments);
};

var elementManage = new ElementManage();
Events.subscribe('onWindowResize',function(){
    if(!elementManage.dom)
        return;
    $('.tablecontainer',elementManage.dom).height(elementManage.dom.height()-55);
});

module.exports = elementManage;
