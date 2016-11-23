/**
 * 框架基类模块<br>
 * 提供一些基础的公共方法<br>
 * 所有模块都应继承自它<br>
 * @author yanglang
 * @version 1.0
 * @module framework-base
 */

require('../../libs/utils');
var Events = require('../../libs/framework-events');


/**
 * 当前模块对象
 * @private
 * @property {Framework} _currentModel
 */
var _currentModel = null;

var _fragmentCache = {};

/**
 * websocket
 */
var _websocket = null;
var EVENT_LISTEN_PREFIX = 'LISTENEVENT';

/**
 * 父模块列表
 */
var parentModels = [];
parentModels.hasModel = function (model) {
    var has = false;
    for (var i = 0; i < this.length; i++) {
        if (this[i] === model) {
            has = true;
            break;
        }
    }
    return has;
};

/**
 * 当前模块的上一个模块
 * 用于记录Pop类型的模块的上一个模块，用以还原currentModule的值
 * @type {null}
 * @private
 */
var _prevModule = null;


/**
 * 框架基类模块<br>
 * 提供一些基础的公共方法<br>
 * 所有模块都应继承自它<br>
 * 此基础模块将会接管所有子模块的展现工作<br>
 * 只需设置showType类型，就可以多种形态进行展现<br>
 * 目前支持弹窗与普通展现、无界面三种形式<br>
 * 此套架构的优点在于：解耦目前所有模块，功能上各模块互相提供API接口进行调用，各模块API由各自统一进行维护。<br>
 * 此外，由于采用CMD模式架构，所以理论上支持无限量模块数目进行加载，浏览器的加载速度仍然飞快，扩展性非常好。<br>
 * @version 1.0
 * @author 杨浪
 * @class Framework
 * @constructor
 *
 */
var Framework = function () {
    this.baseTitle = window.document.title;
};


Framework.prototype = {
    /**
     *
     * !!== 定义规范 ==!!，<br>
     * 必须实现此方法作为入口，<br>
     * @method init
     * @param {Object} options 初始参数(对象)
     *
     */
    init: function (options) {
        //初始化
        options = $.extend({},options);
        var _current = this.getCurrent();
        _current && (options.showType != 'Pop') && (!_current.finished) && _current.finish();
        _prevModule = _current;
        this.setCurrent();
        //由框架设置展现形式
        this.setShowType($.extend({}, options).showType);
        this.finished = false;
        Events.notifyWith('init',this, options);

    },
    /**
     * 对Framework框架进行扩展
     * @method extend 扩展模块
     * @param model 模块id 或 id列表
     * @param callback 回调方法
     */
    extend: function (model) {
        var that = this;
        var models = [];
        if (!$.isArray(model))
            models.push(model);
        else
            models = model;

        for(var i = 0;i<models.length;i++){
            if (!parentModels.hasModel(models[i])) {
                parentModels.push(models[i]);
            }
        }
    },
    /**
     * 移除扩展
     * @method excludeExtension
     * @param modelId 扩展id
     */
    excludeExtension: function (modelId) {
        var that = this;
        for (var i = 0; i < parentModels.length; i++) {
            if (parentModels[i].id == modelId) {
                parentModels.removeAt(i);
                i--;
            }
        }
    },
    /**
     * 批量移除扩展
     * @method excludeExtensions
     * @param modelIds 扩展id列表
     */
    excludeExtensions: function (modelIds) {
        for (var i = 0; i < modelIds.length; i++) {
            this.excludeExtension(modelIds[i]);
        }
    },
    /**
     * 执行扩展模块的接口方法
     * @method _callExtendInterface
     * @param funName 接口方法名
     * @param param 可选参数
     */
    _callExtendInterface: function (funName, param) {
        if (!parentModels)
            return;
        for (var i = 0; i < parentModels.length; i++) {
            if (parentModels[i][funName] && $.isFunction(parentModels[i][funName]))
                parentModels[i][funName].call(this, param);
        }
    },
    /**
     * 当前模块被切换掉时，模块可以选择拒绝，
     * 默认同意<br>
     * 这是一个预留接口<br>
     * 有相应需求的模块实现此方法即可。<br>
     * 目前只针对账户中心实现了这个接口的判断，以供左侧菜单使用<br>
     * @method onClose
     * @param {Function} callback 回调方法 同样返回true或false
     * @param {Boolean} isSame 是否仍然是同一个模块进行刷新操作
     * @return {Boolean} true同意 false拒绝
     */
    onClose: function (callback, isSame) {
        return true;
    },
    /**
     * 设置应用标题
     * @method setBaseTitle
     * @chainable
     * @param {String} baseTitle 标题
     * @return {Framework} self
     */
    setBaseTitle: function (baseTitle) {
        this.baseTitle = baseTitle;
        return this;
    },
    /**
     * 获取应用标题
     * @method getBaseTitle
     * @chainable
     * @return {String} baseTitle 标题
     */
    getBaseTitle: function () {
        return this.baseTitle ? this.baseTitle : '未知标题';
    },
    /**
     * 设置标题（仅弹窗时用）
     * @method setTitle
     * @chainable
     * @param {String} title 标题
     * @return {Framework} self
     */
    setTitle: function (title) {
        this.title = title;
        return this;
    },
    /**
     * 获取标题（仅弹窗时用）
     * @method getTitle
     * @chainable
     * @return {String} title 标题
     */
    getTitle: function () {
        return this.title ? this.title : '未知标题';
    },
    /**
     * 设置对话框宽度（仅弹窗时用）
     * @method setWidth
     * @chainable
     * @param {Number} width 弹窗宽度
     * @return {Framework} self
     */
    setWidth: function (width) {
        this.width = width;
        return this;
    },
    /**
     * 获取对话框宽度（仅弹窗时用）
     * @method getWidth
     * @chainable
     * @return {Number} width 弹窗宽度
     */
    getWidth: function () {
        return this.width ? this.width : 400;
    },
    /**
     * 设置对话框高度（仅弹窗时用）
     * @method setHeight
     * @chainable
     * @param {Number} height 弹窗高度
     * @return {Framework} self
     */
    setHeight: function (height) {
        this.height = height;
        return this;
    },
    /**
     * 获取对话框高度（仅弹窗时用）
     * @method getHeight
     * @chainable
     * @return {Number} height 弹窗高度
     */
    getHeight: function () {
        return this.height ? this.height : 400;
    },
    /**
     * 设置是否需要标题栏（仅弹窗时用）
     * @method setNeedtitle
     * @chainable
     * @param {Boolean} flag 弹窗是否需要显示标题
     * @return {Framework} self
     */
    setNeedtitle: function (flag) {
        this.needtitle = flag !== undefined ? flag : true;
        return this;
    },
    /**
     * 是否需要标题栏（仅弹窗时用）
     * @method isNeedtitle
     * @chainable
     * @return {Boolean}
     */
    isNeedtitle: function () {
        //默认有标题栏
        return this.needtitle === undefined ? true : this.needtitle;
    },
    /**
     * 设置展现形式
     * @method setShowType
     * @chainable
     * @param {String} type 模块展现形式
     * 'Normal' 账户中心mainview模式<br>
     * 'Pop' 弹出框模式<br>
     * 'Container' 自定义容器嵌入模式<br>
     * @returns {Framework} self
     */
    setShowType: function (type) {
        this.showType = (type ? type : 'Normal');
        return this;
    },
    /**
     * 获取展现形式<br>
     * 默认为Normal 账户中心的形式进行展现
     * @method getShowType
     * @chainable
     * @return {String} showType 模块展现形式
     */
    getShowType: function () {
        return this.showType === undefined ? 'Normal' : this.showType;
    },
    /**
     * 获取显示区域容器对象
     * @method getContainer
     * @return {Dom} dom容器对象
     */
    getContainer: function () {
        return this.dom;
    },
    /**
     * 加载页面片段
     * @param url
     * @param callback
     */
    loadFragment:function(url,callback){
        var $def = $.Deferred();
        if(_fragmentCache[url]){
            setTimeout(function(){
                callback&&callback(_fragmentCache[url]);
                $def.resolve(_fragmentCache[url]);
            });
        }else{
            url += (/\?/g.test(url)?'&':'?')+(new Date().getTime());
            $.get(url,function(data){
                if(!_fragmentCache[url])
                    _fragmentCache[url] = data;
                callback&&callback(data);
                $def.resolve(data);
            });
        }
        return $def.promise();
    },
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
    },
    stringifyParam:function(param,split1,split2){
        if(!param)
            return '';
        var arr = [];
        for(var key in param){
            arr.push(key+split1+param[key]);
        }
        return arr.join(split2);
    },
    /**
     * 设置显示区域容器的内容<br>
     * 当使用此方法时，会自动按照setShowType所设定的展现方式进行展现<br>
     * 当未设置setShowType时，默认使用Normal账户中心嵌入式进行展现<br>
     * 设置为Pop时，会使用弹窗控件进行弹窗展示
     * 设置为Container时，会使用传入的dom容器进行嵌入展示
     * @method setContainer
     * @param data html数据
     * @return {Dom} dom容器对象
     */
    render: function (data) {
        var that = this;
        switch (this.getShowType()) {
            case 'Normal':
                var $mainview = $("#framework-content-main");
                $mainview.html(data);
                that.dom = $mainview;
                break;
            case 'Pop':
                var pop = $('#framework_dialog').dialog({
                    title: this.getTitle(),
                    width: this.getWidth(),
                    height: this.getHeight(),
                    closed: false,
                    content:data,
                    modal: true,
                    collapsible:true,
                    minimizable:false,
                    maximizable:true,
                    maximized:false,
                    resizable:true,
                    onBeforeClose : function() {
                        that.finish();
                        return false;
                    },
                    onMove:function(left,top){
                        that.onMove(left,top);
                    }
                });
                that.dom = $('#framework_dialog>div');
                pop.parent().addClass('uk-animation-scale-up').next().addClass('uk-animation-scale-up');
                that.pop = pop;
                break;
            case 'NoUI':
                that.dom = null;
                break;
        }
        Events.notifyWith('onRendered',that, that.dom);
        setTimeout(function(){
            Events.notify('onWindowResize');
        },100);
        var $input = $('input[autofocus]',that.dom);
        $input.length>0&&$input[0].focus();
        return that.dom;
    },
    _closeDialog:function(){
        var that = this;
        if(this.pop){
            this.pop.parent().removeClass('uk-animation-scale-up').next().removeClass('uk-animation-scale-up');
            setTimeout(function(){
                that.pop.parent().addClass('uk-animation-reverse uk-animation-scale-up').next().addClass('uk-animation-reverse uk-animation-scale-up');
                setTimeout(function(){
                    that.pop.dialog('destroy');
                    that.pop = null;
                    $('<div id="framework_dialog"></div>').appendTo($('body'));
                },200);
            },50);

        }
    },
    /**
     * 当模块为弹出框形式时，拖动后的回调函数
     * 等待子类实现
     */
    onMove:function(left,top){},
    /**
     * 添加回调方法<br>
     * 一般来说，当调用某个模块进行处理某项业务时，其处理完毕之后需要一个回调通知，调用此方法添加即可，同一个模块可以添加多个回调方法。<br>
     * 模块处理应遵循业务处理完毕之后调用自身继承下来的finish方法以声明此模块任务结束。<br>
     * @method addCallback
     * @chainable
     * @param {Function} callback 方法
     */
    addCallback: function (callback) {
        if (!this._callbacks)
            this._callbacks = [];
        this._callbacks.push({
            model: this,
            func: callback
        });
        return this;
    },
    /**
     * 清空回调堆栈
     * @method clearCallback
     */
    clearCallback: function () {
        if (this._callbacks)
            this._callbacks.length = 0;
    },
    /**
     * 模块任务结束<br>
     * 此方法的意义在于，当前模块结束对主视图的持有<br>
     * @method finish
     * @chainable
     * @return {Framework} self
     */
    finish: function () {
        if (this._callbacks) {
            var callbackcount = this._callbacks.length;
        } else
            var callbackcount = 0;

        if (this.getShowType() === 'Pop') {
            if (this.pop != null)
                this._closeDialog();
            _prevModule && this.setCurrent.apply(_prevModule);
        }
        Events.notifyWith('onFinished',this);

        if (this._callbacks) {
            callbackcount != 0 ? this._executeCallback.apply(this, arguments) : '';
            this._callbacks.length = 0;//清空回调
        }
        this.finished = true;
        this.dom = null;
        return this;
    },
    /**
     * 执行回调方法列表
     * @method _executeCallback
     * @private 内部使用
     */
    _executeCallback: function () {
        var callbacks = this._callbacks;
        for (var i = 0, len = callbacks.length; i < len; i++) {
            callbacks[i].func.apply(this, arguments);
        }
    },
    /**
     * 设置当前模块<br>
     * 此方法的意义在于在有多个弹窗模块共存时，以声明模块当前模块。<br>
     * 内部若如果存在账户中心菜单选中的回调方法，则调用。
     * @method setCurrent
     */
    setCurrent: function () {
        _currentModel = this;
    },
    /**
     * 获取当前模块
     * @method getCurrent
     * @return {Framework} Account的子类对象
     */
    getCurrent: function () {
        return _currentModel;
    },
    /**
     * 提供给外部使用的插件加载方式
     * 由子类实现该方法，并判断哪些模块是属于自己的，加载到相应的container内即可。
     * @param widgetConfigs [{container:jQueryDom,module:'./attence-analyse-widgets/attence-analyse-chart1'}]
     */
    loadWidgets:function(widgetConfigs){
        return false;
    },
    /**
     * 提供给外部使用的插件销毁方式
     * 由子类实现该方法
     */
    destoryWidgets:function(){
        return false;
    },
    /**
     * 提供给外部使用的插件尺寸调整方法
     */
    resizeWidgets:function(){
        return false;
    },
    /**
     * toast 提示方法
     * @param msg 提示信息
     * @param timeout 超时时长
     */
    toast:function(msg,timeout){
        var toast = document.createElement('div');
        toast.style.opacity = '0';
        toast.style.padding = '7px 10px';
        toast.style.minWidth = '80px';
        toast.style.color = '#fff';
        toast.style.textAlign = 'center';
        toast.style.position = 'fixed';
        toast.style.bottom = '10%';
        toast.style.left = '50%';
        toast.style.borderRadius = '3px';
        toast.style.fontSize = '14px';
        toast.style.transform = 'translateX(-50%)';
        toast.style.transition = 'opacity .3s ease';
        toast.style.backgroundColor = 'rgba(39, 39, 39, 0.6)';
        toast.innerHTML = '<p>'+msg+'</p>';
        document.body.appendChild(toast);
        setTimeout(function(){
            toast.style.opacity = '1';
        },50);
        setTimeout(function(){
            toast.style.opacity = '0';
            setTimeout(function(){
                document.body.removeChild(toast);
            },300);
        },timeout?timeout:2000);
    },
    /* options的默认值
     *  表示首次调用返回值方法时，会马上调用func；否则仅会记录当前时刻，当第二次调用的时间间隔超过wait时，才调用func。
     *  options.leading = true;
     * 表示当调用方法时，未到达wait指定的时间间隔，则启动计时器延迟调用func函数，若后续在既未达到wait指定的时间间隔和func函数又未被调用的情况下调用返回值方法，则被调用请求将被丢弃。
     *  options.trailing = true;
     * 注意：当options.trailing = false时，效果与上面的简单实现效果相同
     */
    throttle : function(func, wait, options) {
        var context, args, result;
        var timeout = null;
        var previous = 0;
        if (!options) options = {};
        var later = function() {
            previous = options.leading === false ? 0 : Date.now();
            timeout = null;
            result = func.apply(context, args);
            if (!timeout) context = args = null;
        };
        return function() {
            var now = Date.now();
            if (!previous && options.leading === false) previous = now;
            // 计算剩余时间
            var remaining = wait - (now - previous);
            context = this;
            args = arguments;
            // 当到达wait指定的时间间隔，则调用func函数
            // 精彩之处：按理来说remaining <= 0已经足够证明已经到达wait的时间间隔，但这里还考虑到假如客户端修改了系统时间则马上执行func函数。
            if (remaining <= 0 || remaining > wait) {
                // 由于setTimeout存在最小时间精度问题，因此会存在到达wait的时间间隔，但之前设置的setTimeout操作还没被执行，因此为保险起见，这里先清理setTimeout操作
                if (timeout) {
                    clearTimeout(timeout);
                    timeout = null;
                }
                previous = now;
                result = func.apply(context, args);
                if (!timeout) context = args = null;
            } else if (!timeout && options.trailing !== false) {
                // options.trailing=true时，延时执行func函数
                timeout = setTimeout(later, remaining);
            }
            return result;
        };
    },
    debounce : function(func, wait, immediate) {
        // immediate默认为false
        var timeout, args, context, timestamp, result;

        var later = function() {
            // 当wait指定的时间间隔期间多次调用_.debounce返回的函数，则会不断更新timestamp的值，导致last < wait && last >= 0一直为true，从而不断启动新的计时器延时执行func
            var last = Date.now() - timestamp;

            if (last < wait && last >= 0) {
                timeout = setTimeout(later, wait - last);
            } else {
                timeout = null;
                if (!immediate) {
                    result = func.apply(context, args);
                    if (!timeout) context = args = null;
                }
            }
        };

        return function() {
            context = this;
            args = arguments;
            timestamp = Date.now();
            // 第一次调用该方法时，且immediate为true，则调用func函数
            var callNow = immediate && !timeout;
            // 在wait指定的时间间隔内首次调用该方法，则启动计时器定时调用func函数
            if (!timeout) timeout = setTimeout(later, wait);
            if (callNow) {
                result = func.apply(context, args);
                context = args = null;
            }

            return result;
        };
    },
    wsCall:function(eventName,data,callback){
        var tmpId = Events.EVENT_PREFIX + '_' + (new Date()).getTime();
        Events.subscribe(tmpId,function(data){
            callback && callback(data);
        });
        _websocket.send(JSON.stringify({
            callbackId:tmpId,
            clientId:_websocket.client_id,
            eventName:eventName,
            data:data
        }));
        return tmpId;
    },
    wsListen:function(eventName,data,callback){
        var tmpId = EVENT_LISTEN_PREFIX + '_' + (new Date()).getTime();
        Events.subscribe(tmpId,function(data){
            callback && callback(data);
        });
        _websocket.send(JSON.stringify({
            callbackId:tmpId,
            clientId:_websocket.client_id,
            eventName:eventName,
            data:data
        }));
        return tmpId;
    },
    wsUnListen:function(id){
        Events.unsubscribe(id);
    }
};

var frameWork = window.fw = new Framework();


/**======================订阅resize事件，通过debounce进行函数节流处理start================**/
/**
 * 订阅resize事件，通过debounce进行函数节流处理
 */
var resize = function(){
    try{
        Events.notify('onWindowResize');
    }catch(e){}
};

$(window).resize(frameWork.debounce(resize,70));
/**======================订阅resize事件，通过debounce进行函数节流处理end================**/



/**======================websocket 封装 start================**/
_websocket = new WebSocket('ws://'+location.host.split(':')[0]+':8088');
_websocket.onopen = function(){
};
_websocket.onclose  = function(){
  console.log('ws close');
};
_websocket.onerror  = function(){
  console.log('ws onerror ');
};
_websocket.onmessage  = function(e){
    try{
        transfer(e);
    }catch(ex){
        console.log(ex);
    }
};
var CLIENT_ID_REG = /^__CLIENT_ID__:(.*)$/;
function transfer(e){
    var data = e.data;
    if(data.match(CLIENT_ID_REG)){
        _websocket.client_id = RegExp.$1;
    }else{
        var data = JSON.parse(e.data);
        Events.notify(data.callbackId,data.data);
    }

}


/**======================websocket 封装 end================**/



module.exports = frameWork;











