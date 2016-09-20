
var frameworkBase = require('../framework/framework-base');
require('../../stylesheets/modules/aboutus.scss');
var AboutUs = function(){ };

//继承自框架基类
AboutUs.prototype = $.extend({},frameworkBase);
AboutUs.prototype.id = 'aboutus';


/**
 * 模块初始化入口<br>
 * @method init
 * @param options 参数对象
 */
AboutUs.prototype.init = function(options){
    var that = this;
    this.options = $.extend({},options);
    that.setTitle('关于我们').setHeight(700).setWidth(780);
    frameworkBase.init.call(this,options);
    this.loadBaseView();
};

AboutUs.prototype.loadBaseView = function(options){
    var html = require('../../../../views/modules/aboutus.html');
    this.render(html);
};

module.exports = new AboutUs();