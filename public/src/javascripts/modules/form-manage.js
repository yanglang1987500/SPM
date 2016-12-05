/**
 * Created by yanglang on 2016/4/13.
 * 自定义表单管理
 */

var frameworkBase = require('./framework/framework-base');
require('../libs/easyui-lang-zh_CN.js');
require('../../stylesheets/modules/form-manage.scss');
require('../../stylesheets/easyui.css');
var FormManage = function () {};

//继承自框架基类
FormManage.prototype = $.extend({}, frameworkBase);
FormManage.prototype.id = 'form-manage';


/**
 * 模块初始化入口<br>
 * @method init
 * @param options 参数对象
 */
FormManage.prototype.init = function (options) {
    var that = this;
    this.options = $.extend({}, options);
    that.setTitle('自定义表单管理').setHeight(700).setWidth(780);
    frameworkBase.init.call(this, options);
    this.loadBaseView();
};

FormManage.prototype.loadBaseView = function () {
    var that = this;
    this.loadFragment('/views/modules/form-manage.html').then(function(html){
        that.render(html);
        that.bindEvents();
        var columns = require('../../../../configs/modules/form-manage-Column.js');
        $('.easyui-linkbutton',that.dom).linkbutton();
        var $table = that.$table = $('#dataTable',that.dom).datagrid({
            url: '/form/list',
            method: 'get',
            columns: [columns],
            pagination: true,
            cache:false,
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
                Events.require('form-designer').addCallback(function(flag){
                    if(flag)
                        Events.notify('onRefresh:form-manage');
                }).init({showType:'Pop',action:'002',form_id:rowData.form_id});
            },
            toolbar: '#form-manage-toolbar'
        });

        var searchBox = $('#home-easyui-searchbox',that.dom).searchbox({
            searcher: function (value, name) {
                Events.notify('onRefresh:form-manage');
            },
            prompt: '请输关键字，如自定义表单标题'
        });

        Events.subscribe('onRefresh:form-manage',function(){
            $table.datagrid('load',{
                key:searchBox.searchbox('getValue')
            });
        });
    });

};


/**
 * 绑定按钮点击事件
 */
FormManage.prototype.bindEvents = function () {
    var that = this;
    //添加自定义表单
    $('#add_form_btn',this.dom).click(function(){
        Events.require('form-designer').addCallback(function(flag){
            if(flag)
                Events.notify('onRefresh:form-manage');
        }).init({showType:'Pop'});
    });
    //修改自定义表单
    $('#modify_form_btn',this.dom).click(function(){
        var rowData;
        if(!(rowData = getSelectRow()))
            return;
        Events.require('form-designer').addCallback(function(flag){
            if(flag)
                Events.notify('onRefresh:form-manage');
        }).init({showType:'Pop',action:'002',form_id:rowData.form_id});
    });
    //删除自定义表单
    $('#delete_form_btn',this.dom).click(function(){
        var rows;
        if(!(rows = getCheckRow()))
            return;
        that.save('/form/save',{action:'003',form_id:function(){
            var ids = [];
            rows.forEach(function(item){
                ids.push(item.form_id);
            });
            return ids.join(',');
        }()},function(data){
            if(data.success){
                that.toast("删除表单成功!");
                Events.notify('onRefresh:form-manage');
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
FormManage.prototype.finish = function () {
    Events.unsubscribe('onRefresh:form-manage');
    frameworkBase.finish.apply(this,arguments);
};

var attenceSearch = new FormManage();
Events.subscribe('onWindowResize',function(){
    if(!attenceSearch.dom)
        return;
    $('.tablecontainer',attenceSearch.dom).height(attenceSearch.dom.height()-15-$('.condition-wrap',attenceSearch.dom).height());
    attenceSearch.$table.datagrid('resize');
});

module.exports = attenceSearch;