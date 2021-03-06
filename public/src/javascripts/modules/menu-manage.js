/**
 * Created by yanglang on 2016/4/13.
 * 菜单管理
 */

var frameworkBase = require('./framework/framework-base');
require('../libs/easyui-lang-zh_CN.js');
require('../../stylesheets/modules/menu-manage.scss');
require('../../stylesheets/easyui.css');
var Exchange = require('../libs/datagrid-exchange');
var MenuManage = function () {};

//继承自框架基类
MenuManage.prototype = $.extend({}, frameworkBase);
MenuManage.prototype.id = 'menu-manage';


/**
 * 模块初始化入口<br>
 * @method init
 * @param options 参数对象
 */
MenuManage.prototype.init = function (options) {
    var that = this;
    this.options = $.extend({}, options);
    that.setTitle('菜单管理').setHeight(700).setWidth(780);
    frameworkBase.init.call(this, options);
    this.loadBaseView();
};

MenuManage.prototype.loadBaseView = function () {
    var that = this;
    this.loadFragment('/views/modules/menu-manage.html').then(function(html){
        that.render(html);
        $('.tablecontainer',that.dom).height(that.dom.height()-55);
        that.initTable();
        that.bindEvents();
    });
};

MenuManage.prototype.initTable = function () {
    var that = this, $tableMenu = $('#table-context-menu');
    that.$tableMenu = $tableMenu;
    $('.easyui-linkbutton',that.dom).linkbutton();
    var columns = require('../../../../configs/modules/menu-manage-Column.js');
    that.$table = $('#dataTable',that.dom).datagrid({
        url: '/menu/list',
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
            Events.require('menu-add-modify').addCallback(function(flag){
                if(flag)
                    Events.notify('onRefresh:menu-manage');
            }).init({showType:'Pop',action:'002',menu_id:rowData.menu_id});
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
        toolbar: '#menu-manage-toolbar'
    });
    $tableMenu.menu({
        onClick:function(item){
            var _id = item.id, id = _id.replace('context_','');
            $('#'+id,that.dom).click();
        },
        hideOnUnhover:false
    });
 
    var searchBox = $('#menu-manage #home-easyui-searchbox',that.dom).searchbox({
        searcher: function (value, name) {
            Events.notify('onRefresh:menu-manage');
        },
        prompt: '请输关键字，如菜单标题、菜单url'
    });

    //绑定下拉框事件 通知刷新菜单
    $('#show_type,#menu_type,#menu_device',that.dom).on('change',function(){
        Events.notify('onRefresh:menu-manage');
    });

    //订阅刷新菜单
    Events.subscribe('onRefresh:menu-manage',function(){
        that.$table.datagrid('load',{
            key:searchBox.searchbox('getValue'),
            show_type:$('#show_type',that.dom).val(),
            menu_device:$('#menu_device',that.dom).val(),
            menu_type:$('#menu_type',that.dom).val()
        });
    });
};
/**
 * 绑定按钮点击事件
 */
MenuManage.prototype.bindEvents = function () {
    var that = this;
    //添加菜单
    $('#add_menu_btn',this.dom).click(function(){
        Events.require('menu-add-modify').addCallback(function(flag){
            if(flag)
                Events.notify('onRefresh:menu-manage');
        }).init({showType:'Pop'});
    });
    //修改菜单
    $('#modify_menu_btn',this.dom).click(function(){
        var rowData;
        if(!(rowData = getSelectRow()))
            return;
        Events.require('menu-add-modify').addCallback(function(flag){
            if(flag)
                Events.notify('onRefresh:menu-manage');
        }).init({showType:'Pop',action:'002',menu_id:rowData.menu_id});
    });
    //删除菜单
    $('#delete_menu_btn',this.dom).click(function(){
        var rows;
        if(!(rows = getCheckRow()))
            return;
        that.save('/menu/save',{action:'003',menu_id:function(){
            var ids = [];
            rows.forEach(function(item){
                ids.push(item.menu_id);
            });
            return ids.join(',');
        }()},function(data){
            if(data.success){
                that.toast("删除菜单成功!");
                Events.notify('onRefresh:menu-manage');
            }else{
                that.toast(data.message);
            }
        });
    });

    $('#moveup_menu_btn',this.dom).click(function(){
        var rowData;
        if(!(rowData = getSelectRow()))
            return;
        var exRow = Exchange.moveupRow(that.$table,rowData);
        exchangeOrder(rowData,exRow);
    });

    $('#movedown_menu_btn',this.dom).click(function(){
        var rowData;
        if(!(rowData = getSelectRow()))
            return;
        var exRow = Exchange.movedownRow(that.$table,rowData);
        exchangeOrder(rowData,exRow);
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

    function exchangeOrder(rowData,rowData2){
        var tmpOrder = rowData.menu_order;
        rowData.menu_order = rowData2.menu_order;
        rowData2.menu_order = tmpOrder;
        that.save('/menu/save',{
            action:'002',
            menu_id:rowData.menu_id,
            menu_order:rowData.menu_order,
        },function(data){
            if(!data.success){
                that.toast(data.message);
                return;
            }
        });
        that.save('/menu/save',{
            action:'002',
            menu_id:rowData2.menu_id,
            menu_order:rowData2.menu_order,
        },function(data){
            if(!data.success){
                that.toast(data.message);
                return;
            }
        });
    }
};

/**
 * 销毁方法
 * 由框架调用，主要用于销毁订阅的事件
 */
MenuManage.prototype.finish = function () {
    Events.unsubscribe('onRefresh:menu-manage');
    this.$tableMenu && this.$tableMenu.menu('destroy');
    frameworkBase.finish.apply(this,arguments);
};

var menuManage = new MenuManage();
Events.subscribe('onWindowResize',function(){
    if(!menuManage.dom)
        return;
    $('.tablecontainer',menuManage.dom).height(menuManage.dom.height()-15-$('.condition-wrap',menuManage.dom).height());
    menuManage.$table.datagrid('resize');
});

module.exports = menuManage;