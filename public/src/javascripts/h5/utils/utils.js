/**
 * Created by 杨浪 on 2016/10/14.
 *
 * 辅助工具类
 * 目前路由动画只支持浏览器原生后退三级 更多级目前不支持
 */


/**=======================================扩展动画===========================================**/
var Velocity = require('../../libs/velocity.min');
var isReturn = false;
Events.subscribe('route:isReturn',function(flag){
    isReturn = flag;
});
var count = 999, prePath = '',currentPath = '',DURATION = 400;
var fns = {
    beforeEnter:function(el){
        debugger;
        if(prePath == this.$route.matched[0].path){
            isReturn = true;
            setTimeout(function(){
                isReturn = false;
            },2);
        }else{
            prePath = currentPath;
        }
        currentPath = this.$route.matched[0].path;
        !isReturn && $(el).css('z-index',count++);
        $(el).css({
            'position':'absolute',
            'min-height':window.HEIGHT+'px',
            'opacity':isReturn?1:0
        });
        Velocity(el, { translateX: isReturn?'0%':'100%' }, { duration: 0 });
    },
    afterEnter:function(el){
        $(el).css({
            position:'static',
            transform:null
        });
        $("body").scrollTop(0);
    },
    enter:function(el,done){
        setTimeout(function(){
            $(el).css({
                opacity:1
            });
        },50);
        Velocity(el, { translateX: '0%' },{complete:done,duration: isReturn?0:DURATION});
    },
    leave:function(el,done){
        Velocity(el, { translateX: isReturn?'100%':'0%' },{complete:done,duration: DURATION});
    },
    beforeLeave:function(el){
        var $el = $(el);
        $el.css({
            position:'absolute',
            transform:null
        });
    }
};
var fns_homepage = {
    beforeEnter:function(el){
        Events.notify('route:isReturn',true);
        setTimeout(function(){
            Events.notify('route:isReturn',false);
        },2);
        prePath = '';
        currentPath = '';
        $(el).css({
            'z-index':'0',
            'position':'absolute',
            'min-height':window.HEIGHT+'px'
        });
        $("body").scrollTop(0);
        Velocity(el, { translateX: '0%' }, { duration: 0 });
    },
    afterEnter:function(el){
        console.log('end');
        $(el).css({
            position:'static'
        });
    },
    enter:function(el,done){
        Velocity(el, { translateX: '0%' },{complete:done,duration: DURATION});
    },
    leave:function(el,done){
        Velocity(el, { translateX: '0%' },{complete:done,duration: DURATION});
    },
    beforeLeave:function(el){
        var $el = $(el);
        $el.css({
            position:'absolute',
            transform:null
        });
    }
};
/**=======================================扩展动画===========================================**/





/**=======================================扩展AJAX===========================================**/
var AJAX = {
    /**
     * get查询，异步执行，<br>
     * 返回json。<br>
     * @method query
     * @async
     * @param {String} url 查询地址
     * @param _param 参数对象 可选
     * @param {Function} _callback 回调方法 可选
     */
    query: function (url, _param, _callback) {
        var that = this, aLen = arguments.length, callback, param;
        if (aLen == 2) {
            if ($.isFunction(_param)) {
                callback = _param;
            }
        } else if (aLen == 3) {
            param = _param, callback = _callback;
        }
        return this._doGetJson(url, param, callback, true);
    },
    /**
     * get查询 同步执行<br>
     * 返回json<br>
     * @method querySync
     * @param {String} url 查询地址
     * @param _param 参数对象 可选
     * @param {Function} _callback 回调方法 可选
     */
    querySync: function (url, _param, _callback) {
        var that = this, aLen = arguments.length, callback, param;
        if (aLen == 2) {
            if ($.isFunction(_param)) {
                callback = _param;
            }
        } else if (aLen == 3) {
            param = _param, callback = _callback;
        }
        return this._doGetJson(url, param, callback, false);
    },
    /**
     * post保存，异步执行，<br>
     * 返回json。<br>
     * @method save
     * @async
     * @param {String} url 查询地址
     * @param _param 参数对象 可选
     * @param {Function} _callback 回调方法 可选
     */
    save: function (url, _param, _callback) {
        var that = this, aLen = arguments.length, callback, param;
        if (aLen == 2) {
            if ($.isFunction(_param)) {
                callback = _param;
            }
        } else if (aLen == 3) {
            param = _param, callback = _callback;
        }
        return this._doPostJson(url, param, callback, true);
    },
    /**
     * post保存 同步执行<br>
     * 返回json<br>
     * @method saveSync
     * @param {String} url 查询地址
     * @param _param 参数对象 可选
     * @param {Function} _callback 回调方法 可选
     */
    saveSync: function (url, _param, _callback) {
        var that = this, aLen = arguments.length, callback, param;
        if (aLen == 2) {
            if ($.isFunction(_param)) {
                callback = _param;
            }
        } else if (aLen == 3) {
            param = _param, callback = _callback;
        }
        return this._doPostJson(url, param, callback, false);
    },
    /**
     * 执行post查询<br>
     * 返回json<br>
     * 内部使用<br>
     * @method _doPostJson
     * @private
     * @param {String} url 查询地址
     * @param param 参数对象
     * @param {Function} callback 回调方法
     * @param {Boolean} async 是否异步
     */
    _doPostJson: function (url, param, callback, async) {
        var ajax = $.ajax({
            url: url,
            type: 'post',
            dataType: 'json',
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            async: async,
            data: param,
            cache:false,
            success: function (json) {
                if (callback)
                    callback(json);
            },
            error: function(){
                console.log("error");
            }
        });
        return ajax;
    },
    /**
     * 执行post查询<br>
     * 返回json<br>
     * 内部使用<br>
     * @method _doPostJson
     * @private
     * @param {String} url 查询地址
     * @param param 参数对象
     * @param {Function} callback 回调方法
     * @param {Boolean} async 是否异步
     */
    _doGetJson: function (url, param, callback, async) {
        var ajax = $.ajax({
            url: url,
            type: 'get',
            dataType: 'json',
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            async: async,
            cache:false,
            data: param,
            success: function (json) {
                if (callback)
                    callback(json);
            },
            error: function(){
                console.log("error");
            }
        });
        return ajax;
    }
};
/**=======================================扩展AJAX===========================================**/

//扩展加密解密
var Crypto = require('../../../../../libs/crypto');



module.exports = {
    animation:{
        process:function(methods){
            $.extend(methods,fns);
        },
        processHomepage:function(methods){
            $.extend(methods,fns_homepage);
        },
        DURATION:DURATION
    },
    ajax:AJAX,
    crypto:Crypto
};