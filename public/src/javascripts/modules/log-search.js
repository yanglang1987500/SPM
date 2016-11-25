/**
 * Created by yanglang on 2016/4/13.
 * 登录日志列表查询
 */

var frameworkBase = require('./framework/framework-base');
require('../libs/easyui-lang-zh_CN.js');
require('../../stylesheets/modules/log-search.scss');
require('../../stylesheets/easyui.css');
var LogSearch = function () {};

//继承自框架基类
LogSearch.prototype = $.extend({}, frameworkBase);
LogSearch.prototype.id = 'log-search';


/**
 * 模块初始化入口<br>
 * @method init
 * @param options 参数对象
 */
LogSearch.prototype.init = function (options) {
    var that = this;
    this.options = $.extend({}, options);
    that.setTitle('登录日志列表查询').setHeight(700).setWidth(780);
    frameworkBase.init.call(this, options);
    this.loadBaseView();
};

LogSearch.prototype.loadBaseView = function () {
    var that = this;
    this.loadFragment('/views/modules/log-search.html').then(function(html){
        that.render(html);
        var columns = require('../../../../configs/modules/log-search-Column.js');
        var $table = that.$table = $('#dataTable',that.dom).datagrid({
            url: '/log/list',
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
            }
        });


        Events.subscribe('onRefresh:log-search',function(){
            $table.datagrid('load',{});
        });
    });

};

/**
 * 销毁方法
 * 由框架调用，主要用于销毁订阅的事件
 */
LogSearch.prototype.finish = function () {
    Events.unsubscribe('onRefresh:log-search');
    frameworkBase.finish.apply(this,arguments);
};

var attenceSearch = new LogSearch();
Events.subscribe('onWindowResize',function(){
    if(!attenceSearch.dom)
        return;
    $('.tablecontainer',attenceSearch.dom).height(attenceSearch.dom.height()-15-$('.condition-wrap',attenceSearch.dom).height());
    attenceSearch.$table.datagrid('resize');
});

module.exports = attenceSearch;