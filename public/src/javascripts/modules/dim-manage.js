/**
 * Created by yanglang on 2016/4/13.
 * 字典管理
 */

var frameworkBase = require('../framework/framework-base');
require('../libs/easyui-lang-zh_CN.js');
require('../../stylesheets/modules/dim-manage.scss');
require('../../stylesheets/easyui.css');
var DimManage = function () {};

//继承自框架基类
DimManage.prototype = $.extend({}, frameworkBase);
DimManage.prototype.id = 'dim-manage';


/**
 * 模块初始化入口<br>
 * @method init
 * @param options 参数对象
 */
DimManage.prototype.init = function (options) {
    var that = this;
    this.options = $.extend({}, options);
    that.setTitle('字典管理').setHeight(700).setWidth(780);
    frameworkBase.init.call(this, options);
    this.loadBaseView();
};

DimManage.prototype.loadBaseView = function () {
    var that = this;
    this.loadFragment('/views/modules/dim-manage.html').then(function(html){
        that.render(html);
        $('.tablecontainer',that.dom).height(that.dom.height()-55);
        that.initTable();
        that.bindEvents();
    });
};

DimManage.prototype.initTable = function () {
    var that = this;
    $('.easyui-linkbutton',that.dom).linkbutton();
    var columns = require('../../../../configs/modules/dim-manage-Column.js');
    that.$table = $('#dataTable',that.dom).datagrid({
        url: '/dim/list',
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
            Events.require('dim-add-modify').addCallback(function(flag){
                if(flag)
                    Events.notify('onRefresh:dim-manage');
            }).init({showType:'Pop',action:'002',id:rowData.id});
        },
        toolbar: '#dim-manage-toolbar'
    });

    var searchBox = $('#dim-manage #home-easyui-searchbox',that.dom).searchbox({
        searcher: function (value, name) {
            Events.notify('onRefresh:dim-manage');
        },
        prompt: '请输关键字，如维度名称、维度值'
    });

    //绑定下拉框事件 通知刷新字典
    $('#group_id',that.dom).on('change',function(){
        Events.notify('onRefresh:dim-manage');
    });

    //订阅刷新字典
    Events.subscribe('onRefresh:dim-manage',function(){
        that.$table.datagrid('load',{
            key:searchBox.searchbox('getValue'),
            group_id:$('#group_id',that.dom).val()
        });
    });
};
/**
 * 绑定按钮点击事件
 */
DimManage.prototype.bindEvents = function () {
    var that = this;
    //添加字典项
    $('#add_dim_btn',this.dom).click(function(){
        Events.require('dim-add-modify').addCallback(function(flag){
            if(flag)
                Events.notify('onRefresh:dim-manage');
        }).init({showType:'Pop'});
    });
    //修改字典项
    $('#modify_dim_btn',this.dom).click(function(){
        var rowData;
        if(!(rowData = getSelectRow()))
            return;
        Events.require('dim-add-modify').addCallback(function(flag){
            if(flag)
                Events.notify('onRefresh:dim-manage');
        }).init({showType:'Pop',action:'002',id:rowData.id});
    });
    //删除字典项
    $('#delete_dim_btn',this.dom).click(function(){
        var rowData;
        if(!(rowData = getSelectRow()))
            return;
        that.save('/dim/save',{action:'003',id:rowData.id},function(data){
            if(data.success){
                that.toast("删除字典成功!");
                Events.notify('onRefresh:dim-manage');
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
DimManage.prototype.finish = function () {
    Events.unsubscribe('onRefresh:dim-manage');
    frameworkBase.finish.apply(this,arguments);
};

var dimManage = new DimManage();
Events.subscribe('onWindowResize',function(){
    if(!dimManage.dom)
        return;
    $('.tablecontainer',dimManage.dom).height(dimManage.dom.height()-55);
});

module.exports = dimManage;