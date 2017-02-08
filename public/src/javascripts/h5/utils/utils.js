/**
 * Created by 杨浪 on 2016/10/14.
 *
 * 辅助工具类
 * 目前路由动画只支持浏览器原生后退三级 更多级目前不支持
 */


/**=======================================扩展动画===========================================**/
var Velocity = require('../../libs/velocity.min');
var isReturn = false, intervene = false;//是否主动介入 主动介入由isReturn控制，否则根据prePath currentPath控制（有缺陷）
Events.subscribe('route:isReturn',function(flag){
    isReturn = flag;
    intervene = true;
    setTimeout(function(){
        intervene = false;
        isReturn = false;
    },50);
});
var count = 999, prePath = '',currentPath = '',DURATION = 300;
var fns = {
    beforeEnter:function(el){
        //console.log('1prePath：'+prePath+' this.$route.matched[0].path：'+this.$route.matched[0].path);
        if(prePath == this.$route.matched[0].path && !intervene){
            isReturn = true;
            setTimeout(function(){
                isReturn = false;
            },2);
        }else{
            prePath = currentPath;
        }
        currentPath = this.$route.matched[0].path;
        !isReturn && $(el).css('z-index',count++);
        //console.log('2是否后退：'+isReturn+' 是否强制介入：'+intervene);
        $(el).css({
            'position':'fixed',
            'height':'0px',
            'opacity':isReturn?1:0
        });
        //console.log('3currentPath：'+currentPath+' prePath：'+prePath);
        //console.log(isReturn);
        Velocity(el, { translateX: isReturn?'-20%':'100%' }, { duration: 0 });
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
                opacity:1,
                'min-height':window.HEIGHT+'px',
                'height':'auto'
            });
        },50);
        Velocity(el, { translateX: '0%' },{complete:done,duration: isReturn?DURATION:DURATION});
    },
    leave:function(el,done){
        Velocity(el, { translateX: isReturn?'100%':'-20%' },{complete:done,duration: DURATION});
    },
    beforeLeave:function(el){
        var $el = $(el);
        $el.css({
            position:'fixed',
            transform:null
        });
        $("body").scrollTop(0);
    },
    routerClick:function(){
        Events.notify('route:isReturn',false);
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
            'position':'fixed',
            'min-height':window.HEIGHT+'px'
        });
        $("body").scrollTop(0);
        Velocity(el, { translateX: '-20%' }, { duration: 0 });
    },
    afterEnter:function(el){
        $(el).css({
            position:'static'
        });
    },
    enter:function(el,done){
        Velocity(el, { translateX: '0%' },{complete:done,duration: DURATION});
    },
    leave:function(el,done){
        Velocity(el, { translateX: '-20%' },{complete:done,duration: DURATION});
    },
    beforeLeave:function(el){
        var $el = $(el);
        $el.css({
            position:'fixed',
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
var store = require('./store');
/**
 * 解析权限表达式
 * @param expr 表达式 比如menu:/modules/homepage 或 element:/modules/org-manage:addOrg
 */
function parseExpr(expr){
    var obj = {};
    if(!expr)
        return obj;
    var matches = expr.match(/^(menu|element):([^:]*):?([^:]*)$/);
    obj['auth_type'] = matches[1];
    obj['auth_url'] = matches[2];
    obj['auth_code'] = matches[3];
    return obj;
}

module.exports = {
    animation:{
        process:function(methods){
            $.extend(methods,fns);
        },
        processHomepage:function(methods){
            $.extend(methods,fns_homepage);
        },
        DURATION:DURATION+200
    },
    date:{
        process:function(methods){
            $.extend(methods,{
                format:function(time,formatter){
                    return Calendar.getInstance(time).format(formatter);
                }
            });
        }
    },
    ajax:AJAX,
    crypto:Crypto,
    /**
     * 将字符串hash化
     * @param str
     * @returns {number}
     */
    djb2Code : function(str){
        var hash = 5381;
        for (i = 0; i < str.length; i++) {
            char = str.charCodeAt(i);
            hash = ((hash << 5) + hash) + char; /* hash * 33 + c */
        }
        return hash;
    },
    colors:['#8FEDD1','#D3ED8F','#EFC08D','#F09D8C','#8BC6F1',
            '#8A8FF2','#AC89F3','#F48891','#89F3AC','#95C0E8'],
    parseAuthority:function(){
        var that = this;
        $('sec-authorize').each(function (i, item) {
            var url = $(this).attr('url');
            //鉴权
            var ret = that.isPermission(url);
            ret && ($(this).children().insertAfter($(this)));
        }).remove();
    },
    /**
     * 鉴权
     * @param roles
     * @param expr
     * @returns {boolean}
     */
    isPermission:function(expr){
        var roles = store.state.userRoles,
            roleAuthorityMap = store.state.roleAuthorityMap;
        for(var i = 0;i<roles.length;i++){
            var resources = roleAuthorityMap[roles[i].role_id];
            if(!resources)
                continue;
            if(expr.indexOf(':')==-1){
                //资源id鉴权
                for(var j = 0;j<resources.length;j++){
                    if(resources[j].resource_id == expr){
                        return true;
                    }
                }
            }else{
                //权限表达式鉴权
                var expObj = parseExpr(expr);
                for(var j = 0;j<resources.length;j++){
                    if(expObj.auth_type == 'menu'){
                        //菜单鉴权
                        if(resources[j].auth_url == expObj.auth_url){
                            return true;
                        }
                    }else if(expObj.auth_type == 'element'){
                        //元素鉴权
                        if(resources[j].auth_url == expObj.auth_url && resources[j].auth_code == expObj.auth_code){
                            return true;
                        }
                    }
                }
            }
        }
        return false;
    }
};