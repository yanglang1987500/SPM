/**
 * Created by yanglang on 2016/4/13.
 * homepage首页聚合模块
 */

var frameworkBase = require('../framework/framework-base');
require('../../stylesheets/modules/homepage.scss');
var HomePage = function(){ };

//继承自框架基类
HomePage.prototype = $.extend({},frameworkBase);
HomePage.prototype.id = 'homepage';

var WIDGETS = [
    {container:'#attence-analyse-chart1',module:'./attence-analyse-widgets/attence-analyse-chart1'},
    {container:'#attence-analyse-chart2',module:'./attence-analyse-widgets/attence-analyse-chart2'},
    {container:'#message-publish-list',module:'message-publish-list'}];

/**
 * 模块初始化入口<br>
 * @method init
 * @param options 参数对象
 */
HomePage.prototype.init = function(options){
    var that = this;
    this.options = $.extend({},options);
    that.setTitle('首页聚合').setHeight(700).setWidth(780);
    frameworkBase.init.call(this,options);
    this.loadBaseView();
};

HomePage.prototype.loadBaseView = function(){
    var that = this;
    this.loadFragment('/views/modules/homepage.html').then(function(html){
        that.render(html);
        that.loadWidgets();
    });
};

HomePage.prototype.loadWidgets = function(){
    this.widgets = [];
    this.widgets.push(require('./attence-analyse'));
    this.widgets.push(require('./message-publish-list'));
    this.widgets.forEach(function(widget){
        widget.loadWidgets(WIDGETS);
    });
};

var homePage = new HomePage();

Events.subscribe('onWindowResize',function(){
    if(homePage.dom)
        $('#message-publish-list',homePage.dom).height(homePage.dom.height()-55);
    if(homePage.widgets)
        homePage.widgets.forEach(function(widget){
            widget.resizeWidgets();
        });
});



module.exports = homePage;