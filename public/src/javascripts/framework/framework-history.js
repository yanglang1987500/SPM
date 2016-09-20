/**
 * 浏览器历史行为控制<br>
 * @author yanglang
 * @version 1.0
 * @module historycontrol-base
 */

/**
 * history状态触发回调方法
 * @method historyStateChange
 */
require('../libs/jquery-history');
var Events = require('../framework/framework-events');

function historyStateChange() {
    setTimeout(function(){
        var historyData = History.getState().data;
        console.log(historyData);
        if (!historyData)
            return;
        var modelId = historyData.model;
        if (modelId) {
            !/^\.\.\/modules\/.*$/.test(modelId) && (modelId = './modules/'+modelId);
            var options = $.extend({},historyData.options,{from:'history'});
            var module = Events.notify('onSelectMenu',modelId,options).require(modelId);
            module.init(options);
        }
    },10);

}

function replaceParam(key, value) {
    var params = $.getUrlParamArray(), result = [];
    for (var i = 0, len = params.length; i < len; i++) {
        if (params[i].key === key) {
            params[i].value = value;
            break;
        }
    }
    for (var i = 0, len = params.length; i < len; i++) {
        //兼容IE7 IE8的处理
        if (params[i].key !== '_suid')
            result.push(params[i].key + "=" + params[i].value);
    }
    if (result.length == 0)
        result.push(key + '=' + value);
    return result.join('&');
}


Events.subscribe('init',function(){
    var that = this;
    if (this.getShowType && this.getShowType() !== 'Normal')
        return;
    setTimeout(function(){
        History.Adapter.unbind(window, 'statechange');
        var params = replaceParam('init', that.id);
        console.log('push state:'+that.id);
        if(that.options && that.options.from != 'history')
            History.pushState({model: that.id, options: that.options},  that.getTitle()+ '-' +that.baseTitle , "?" + params);
        History.Adapter.bind(window, 'statechange', historyStateChange);
    },10);

});













