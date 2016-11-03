/**
 * 数据同步
 * 无界面模块，只负责同步数据，右下角可以弹信息框或者在屏幕中间弹进度框进行显示当前进度。
 * 不影响其它模块的运行，在进行数据同步时其它模块可以照常切换与运行。
 */
var frameworkBase = require('./framework/framework-base');
var AsyncData = function(){ };

//继承自框架基类
AsyncData.prototype = $.extend({},frameworkBase);
AsyncData.prototype.id = 'async-data';


/**
 * 模块初始化入口<br>
 * @method init
 * @param options 参数对象
 */
AsyncData.prototype.init = function(options){
    var that = this;
    this.options = $.extend({},options);
    frameworkBase.init.call(this,options);
    var count = 10;
    this.wsListen('websocket:async-data',{},function(){
            
    });
    window.setTimeout(function(){
        console.log('同步数据。。。'+count);
        count--;
        if(count>0)
            setTimeout(arguments.callee,1000);
    },1000);
};


module.exports = new AsyncData();