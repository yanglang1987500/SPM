
var frameworkBase = require('./framework/framework-base');
require('../../stylesheets/modules/helloworld.scss');
var Helloworld = function(){ };

//继承自框架基类
Helloworld.prototype = $.extend({},frameworkBase);
Helloworld.prototype.id = 'helloworld';


/**
 * 模块初始化入口<br>
 * @method init
 * @param options 参数对象
 */
Helloworld.prototype.init = function(options){ 
    var that = this;
    this.options = $.extend({},options);
    that.setTitle('关于我们').setHeight(700).setWidth(780);
    frameworkBase.init.call(this,options);
    this.loadBaseView();
};

Helloworld.prototype.loadBaseView = function(options){
    var html = require('../../../../views/modules/helloworld.html');
    this.render(html);


    //TODO 

    

};

module.exports = new Helloworld();