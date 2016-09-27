/**
 * Created by yanglang on 2016/4/13.
 * 学生考勤统计
 */

var frameworkBase = require('../framework/framework-base');

require('../libs/easyui-lang-zh_CN.js');
require('../../stylesheets/modules/attence-analyse.scss');
require('../../stylesheets/easyui.css');
var AttenceAnalyse = function(){ };

//继承自框架基类
AttenceAnalyse.prototype = $.extend({},frameworkBase);
AttenceAnalyse.prototype.id = 'attence-analyse';

//子模块配置
var WIDGETS = [
    {container:'#attence-analyse-chart1',module:'./attence-analyse-widgets/attence-analyse-chart1'},
    {container:'#attence-analyse-chart2',module:'./attence-analyse-widgets/attence-analyse-chart2'},
    {container:'#attence-analyse-chart3',module:'./attence-analyse-widgets/attence-analyse-chart3'}];
/**
 * 模块初始化入口<br>
 * @method init
 * @param options 参数对象
 */
AttenceAnalyse.prototype.init = function(options){
    var that = this;
    this.options = $.extend({},options);
    that.setTitle('学生考勤统计').setHeight(700).setWidth(780);
    frameworkBase.init.call(this,options);
    this.loadBaseView();
};

/**
 * 加载基础视图
 */
AttenceAnalyse.prototype.loadBaseView = function(){
    var that = this;
    this.loadFragment('/views/modules/attence-analyse.html').then(function(html){
        that.render(html);
        that.bindEvents();
        that.loadWidgets();
    });
};

/**
 * 加载插件
 */
AttenceAnalyse.prototype.loadWidgets = function(temp){
    this.widgets = [];
    var widgetArray = [];
    if(temp && $.isArray(temp)){
        temp.forEach(function(i){
            WIDGETS.forEach(function(j){
               if(i.module == j.module){
                   widgetArray.push(i);
                   return false;
               }
            });
        });
    }else
        widgetArray = WIDGETS;
    for(var i = 0,len = widgetArray.length;i<len;i++){
        var widget = require(widgetArray[i].module);
        widget.init({container:$(widgetArray[i].container)});
        this.widgets.push(widget);
    }
    Events.notify('onRefresh:attence-analyse',{type:0});
};


AttenceAnalyse.prototype.bindEvents = function(){
    var that = this;
    $('#jobHistoryGrainSelector',this.dom).on('change',function(){
        var value = $(this).val();
        Events.notify('onRefresh:attence-analyse',{type:value});
    });
    var startDate = $("#startdate",that.dom).datebox({
        editable:false ,
        formatter: function (date) {
            return Calendar.getInstance(date).format('yyyy-MM-dd');
        },
        onChange:function(date){
            Events.notify('onRefresh:attence-analyse',{
                startdate:startDate.combo('getValue').replace(/-/gi,''),
                enddate:endDate.combo('getValue').replace(/-/gi,'')
            });
        }
    });
    var endDate = $("#enddate",that.dom).datebox({
        editable:false ,
        formatter: function (date) {
            return Calendar.getInstance(date).format('yyyy-MM-dd');
        },
        onChange:function(date){
            Events.notify('onRefresh:attence-analyse',{
                startdate:startDate.combo('getValue').replace(/-/gi,''),
                enddate:endDate.combo('getValue').replace(/-/gi,'')
            });
        }
    });
};

/**
 * 调整widgets尺寸
 */
AttenceAnalyse.prototype.resizeWidgets = function () {
    attenceAnalyse.widgets.forEach(function(widget){
        widget.resize();
    });
};

/**
 * 销毁方法
 * 由框架调用，主要用于销毁订阅的事件
 */
AttenceAnalyse.prototype.finish = function () {
    Events.unsubscribe('onRefresh:attence-analyse');
    frameworkBase.finish.call(this);
};
var attenceAnalyse = new AttenceAnalyse();
Events.subscribe('onWindowResize',function(){
    if(!attenceAnalyse.dom || !attenceAnalyse.widgets)
        return;
    $('.charts-container',attenceAnalyse.dom).height(attenceAnalyse.dom.height()-55);
    attenceAnalyse.widgets.forEach(function(widget){
        widget.resize();
    });
});

module.exports = attenceAnalyse;