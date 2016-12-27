/**
 * Created by yanglang on 2016/4/13.
 * 页面元素管理
 */

var frameworkBase = require('./framework/framework-base');
require('../libs/easyui-lang-zh_CN.js');
require('../libs/ztree/jquery.ztree.all.min');
require('../libs/ztree/css/zTreeStyle/zTreeStyle.css');
require('../../stylesheets/modules/element-manage.scss');
require('../../stylesheets/easyui.css');
var table2TreeDragUtil = require('../libs/table2TreeDragUtil');
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
    var that = this, $tableMenu = $('#table-context-menu');
    that.$tableMenu = $tableMenu;
    $('.easyui-linkbutton',this.dom).linkbutton();
    var columns = require('../../../../configs/modules/element-manage-Column.js');
    that.$table = $('#dataTable',this.dom).datagrid({
        url: '',
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
        toolbar: '#element-manage-toolbar'
    });
    $tableMenu.menu({
        onClick:function(item){
            var _id = item.id, id = _id.replace('context_','');
            $('#'+id,that.dom).click();
        },
        hideOnUnhover:false
    });

    var searchBox = $('#element-manage #home-easyui-searchbox',that.dom).searchbox({
        searcher: function (value, name) {
            Events.notify('onRefresh:element-manage');
        },
        prompt: '请输关键字，如元素名称或编码'
    });

    //订阅刷新消息
    Events.subscribe('onRefresh:element-manage',function(menu_id){
        var opts = that.$table.datagrid("options");
        opts.url = "/element/list";
        that.$table.datagrid('load',{
            menu_id:selectMenuId,
            key:searchBox.searchbox('getValue')
        });
    });
};

var selectMenuId;
ElementManage.prototype.initMenuTree = function(){
    var that = this;
    this.query('/menu/list',{menu_device:'0'},function(data){
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
        table2TreeDragUtil.init({
            table:that.$table,
            tree:that.ztreeObj,
            titleField:'element_desc',
            callback:function(list,treeNode,isCopy){
                var nodes = that.ztreeObj.getSelectedNodes();
                if(treeNode == nodes[0]){
                    return;
                }
                if(treeNode.menu_parent_id == null){
                    that.toast("根节点下不允许配置元素!");
                    return;
                }
                that.save('/element/save',{action:'004',is_copy:isCopy,menu_id:treeNode.menu_id,element_id:function(){
                    var ids = [];
                    list.forEach(function(item){
                        ids.push(item.element_id);
                    });
                    return ids.join(',');
                }()},function(data){
                    if(data.success){
                        that.toast("元素已"+(isCopy?'复制':'移动')+"到【"+treeNode.menu_title+"】下。");
                        Events.notify('onRefresh:element-manage');
                    }else{
                        that.toast(data.message);
                    }
                });
            }
        });
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
        var rows;
        if(!(rows = getCheckRow()))
            return;
        that.save('/element/save',{action:'003',element_id:function(){
            var ids = [];
            rows.forEach(function(item){
                ids.push(item.element_id);
            });
            return ids.join(',');
        }()},function(data){
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
ElementManage.prototype.finish = function () {
    Events.unsubscribe('onRefresh:element-manage');
    this.$tableMenu && this.$tableMenu.menu('destroy');
    frameworkBase.finish.apply(this,arguments);
};

var elementManage = new ElementManage();
Events.subscribe('onWindowResize',function(){
    if(!elementManage.dom)
        return;
    $('.tablecontainer',elementManage.dom).height(elementManage.dom.height()-15-$('.condition-wrap',elementManage.dom).height());
    elementManage.$table.datagrid('resize');
});

module.exports = elementManage;

