/**
 * Created by yanglang on 2016/4/13.
 * 公司管理
 */

var frameworkBase = require('./framework/framework-base');
require('../libs/easyui-lang-zh_CN.js');
require('../../stylesheets/modules/company-manage.scss');
require('../../stylesheets/easyui.css');
var Exchange = require('../libs/datagrid-exchange');
var CompanyManage = function () {};

//继承自框架基类
CompanyManage.prototype = $.extend({}, frameworkBase);
CompanyManage.prototype.id = 'company-manage';


/**
 * 模块初始化入口<br>
 * @method init
 * @param options 参数对象
 */
CompanyManage.prototype.init = function (options) {
    var that = this;
    this.options = $.extend({}, options);
    that.setTitle('公司管理').setHeight(700).setWidth(780);
    frameworkBase.init.call(this, options);
    this.loadBaseView();
};

CompanyManage.prototype.loadBaseView = function () {
    var that = this;
    this.loadFragment('/views/modules/company-manage.html').then(function(html){
        that.render(html);
        $('.tablecontainer',that.dom).height(that.dom.height()-55);
        that.initTable();
        that.bindEvents();
    });
};

CompanyManage.prototype.initTable = function () {
    var that = this;
    $('.easyui-linkbutton',that.dom).linkbutton();
    var columns = require('../../../../configs/modules/company-manage-Column.js');
    that.$table = $('#dataTable',that.dom).datagrid({
        url: '/company/list',
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
            if(!data){
                that.toast('查询失败');
            }
            return {rows: data, total: data.length};
        },
        onDblClickRow: function (rowIndex, rowData) {
            Events.require('company-add-modify').addCallback(function(flag){
                if(flag)
                    Events.notify('onRefresh:company-manage');
            }).init({showType:'Pop',action:'002',company_id:rowData.company_id});
        },
        toolbar: '#company-manage-toolbar'
    });
    that.$table.datagrid({
        onDrop:function(targetRow, sourceRow, point) {
            alert(sourceRow.company_title+'&'+targetRow.company_title);
        }
    })
    var searchBox = $('#company-manage #home-easyui-searchbox',that.dom).searchbox({
        searcher: function (value, name) {
            Events.notify('onRefresh:company-manage');
        },
        prompt: '请输关键字，如公司名称或渲染用户名'
    });


    //订阅刷新公司
    Events.subscribe('onRefresh:company-manage',function(){
        that.$table.datagrid('load',{
            key:searchBox.searchbox('getValue')
        });
    });
};
/**
 * 绑定按钮点击事件
 */
CompanyManage.prototype.bindEvents = function () {
    var that = this;
    //添加公司
    $('#add_company_btn',this.dom).click(function(){
        Events.require('company-add-modify').addCallback(function(flag){
            if(flag)
                Events.notify('onRefresh:company-manage');
        }).init({showType:'Pop'});
    });
    //修改公司
    $('#modify_company_btn',this.dom).click(function(){
        var rowData;
        if(!(rowData = getSelectRow()))
            return;
        Events.require('company-add-modify').addCallback(function(flag){
            if(flag)
                Events.notify('onRefresh:company-manage');
        }).init({showType:'Pop',action:'002',company_id:rowData.company_id});
    });
    //删除公司
    $('#delete_company_btn',this.dom).click(function(){
        var rows;
        if(!(rows = getCheckRow()))
            return;
        that.save('/company/save',{action:'003',company_id:function(){
            var ids = [];
            rows.forEach(function(item){
                ids.push(item.company_id);
            });
            return ids.join(',');
        }()},function(data){
            if(data.success){
                that.toast("删除公司成功!");
                Events.notify('onRefresh:company-manage');
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
CompanyManage.prototype.finish = function () {
    Events.unsubscribe('onRefresh:company-manage');
    frameworkBase.finish.apply(this,arguments);
};

var companyManage = new CompanyManage();
Events.subscribe('onWindowResize',function(){
    if(!companyManage.dom)
        return;
    $('.tablecontainer',companyManage.dom).height(companyManage.dom.height()-15-$('.condition-wrap',companyManage.dom).height());
    companyManage.$table.datagrid('resize');
});

module.exports = companyManage;