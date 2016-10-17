/**
 * 报修信息查看模块
 * @author yanglang
 * @type {Framework}
 */
var WIDGETS = [
    {container:'#report-view-container',module:'report-list',id:''}];

var frameworkBase = require('./framework/framework-base');
require('../../stylesheets/modules/report-view.scss');
var ReportView = function(){ };

//继承自框架基类
ReportView.prototype = $.extend({},frameworkBase);
ReportView.prototype.id = 'report-view';


/**
 * 模块初始化入口<br>
 * @method init
 * @param options 参数对象
 */
ReportView.prototype.init = function(options){
    var that = this;
    this.options = $.extend({action:'001'},options);
    that.setTitle('报修信息查看').setHeight(400).setWidth(680);
    frameworkBase.init.call(this,options);
    this.loadBaseView();
    this.bindEvents();
    this.restoreData();
};

ReportView.prototype.loadBaseView = function(options){
    var html = require('../../../../views/modules/report-view.html');
    this.render(html);
    var reportList = require('./report-list');
    WIDGETS[0].id = this.options.report_id;
    reportList.loadWidgets(WIDGETS);
};

/**
 * 修改状态返显数据
 */
ReportView.prototype.restoreData = function () {
    var that = this;

};

ReportView.prototype.bindEvents = function () {
    var that = this;
    $('#closeBtn',this.dom).click(function(){
        that.finish();
    });
};

/**
 * 销毁方法
 * 由框架调用，主要用于销毁订阅的事件
 */
ReportView.prototype.finish = function () {
    try{
        frameworkBase.finish.apply(this,arguments);
    }catch(e){
        console.log(e);
    }
};

var messagePublish = new ReportView();


module.exports = messagePublish;