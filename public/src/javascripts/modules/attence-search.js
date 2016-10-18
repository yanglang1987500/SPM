/**
 * Created by yanglang on 2016/4/13.
 * 学生考勤查询
 */

var frameworkBase = require('./framework/framework-base');
require('../libs/easyui-lang-zh_CN.js');
require('../../stylesheets/modules/attence-search.scss');
require('../../stylesheets/easyui.css');
var AttenceSearch = function () {};

//继承自框架基类
AttenceSearch.prototype = $.extend({}, frameworkBase);
AttenceSearch.prototype.id = 'attence-search';


/**
 * 模块初始化入口<br>
 * @method init
 * @param options 参数对象
 */
AttenceSearch.prototype.init = function (options) {
    var that = this;
    this.options = $.extend({}, options);
    that.setTitle('学生考勤查询').setHeight(700).setWidth(780);
    frameworkBase.init.call(this, options);
    this.loadBaseView();
};

AttenceSearch.prototype.loadBaseView = function () {
    var that = this;
    this.loadFragment('/views/modules/attence-search.html').then(function(html){
        that.render(html);
        var columns = require('../../../../configs/modules/attence-search-Column.js');
        var $table = that.$table = $('#dataTable',that.dom).datagrid({
            url: '/attence/search',
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
                return data.data;
            },
            onDblClickRow: function (rowIndex, rowData) {
            }
        });

        var searchBox = $('#attence-search #home-easyui-searchbox',that.dom).searchbox({
            searcher: function (value, name) {
                Events.notify('onRefresh:attence-search');
            },
            menu:'#attence-type-select',
            prompt: '请输关键字，如学生名字'
        });

        var startDate = $("#startdate",that.dom).datetimebox({
            editable:false ,
            formatter: function (date) {
                return Calendar.getInstance(date).format('yyyy-MM-dd HH:mm:ss');
            },
            onChange:function(date){
                Events.notify('onRefresh:attence-search');
            }
        });
        var endDate = $("#enddate",that.dom).datetimebox({
            editable:false ,
            formatter: function (date) {
                return Calendar.getInstance(date).format('yyyy-MM-dd HH:mm:ss');
            },
            onChange:function(date){
                Events.notify('onRefresh:attence-search');
            }
        });

        Events.subscribe('onRefresh:attence-search',function(){
            $table.datagrid('load',{
                key:searchBox.searchbox('getValue'),
                type:searchBox.searchbox('getName'),
                startdate:startDate.combo('getValue').replace(/-/gi,''),
                enddate:endDate.combo('getValue').replace(/-/gi,'')
            });
        });
    });

};

/**
 * 销毁方法
 * 由框架调用，主要用于销毁订阅的事件
 */
AttenceSearch.prototype.finish = function () {
    Events.unsubscribe('onRefresh:attence-search');
    frameworkBase.finish.apply(this,arguments);
};

var attenceSearch = new AttenceSearch();
Events.subscribe('onWindowResize',function(){
    if(!attenceSearch.dom)
        return;
    $('.tablecontainer',attenceSearch.dom).height(attenceSearch.dom.height()-15-$('.condition-wrap',attenceSearch.dom).height());
    attenceSearch.$table.datagrid('resize');
});

module.exports = attenceSearch;