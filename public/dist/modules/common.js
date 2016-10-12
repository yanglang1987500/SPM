/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	var parentJsonpFunction = window["webpackJsonp"];
/******/ 	window["webpackJsonp"] = function webpackJsonpCallback(chunkIds, moreModules) {
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, callbacks = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId])
/******/ 				callbacks.push.apply(callbacks, installedChunks[chunkId]);
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			modules[moduleId] = moreModules[moduleId];
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(chunkIds, moreModules);
/******/ 		while(callbacks.length)
/******/ 			callbacks.shift().call(null, __webpack_require__);
/******/ 		if(moreModules[0]) {
/******/ 			installedModules[0] = 0;
/******/ 			return __webpack_require__(0);
/******/ 		}
/******/ 	};

/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// object to store loaded and loading chunks
/******/ 	// "0" means "already loaded"
/******/ 	// Array means "loading", array contains callbacks
/******/ 	var installedChunks = {
/******/ 		2:0
/******/ 	};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}

/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId, callback) {
/******/ 		// "0" is the signal for "already loaded"
/******/ 		if(installedChunks[chunkId] === 0)
/******/ 			return callback.call(null, __webpack_require__);

/******/ 		// an array means "currently loading".
/******/ 		if(installedChunks[chunkId] !== undefined) {
/******/ 			installedChunks[chunkId].push(callback);
/******/ 		} else {
/******/ 			// start chunk loading
/******/ 			installedChunks[chunkId] = [callback];
/******/ 			var head = document.getElementsByTagName('head')[0];
/******/ 			var script = document.createElement('script');
/******/ 			script.type = 'text/javascript';
/******/ 			script.charset = 'utf-8';
/******/ 			script.async = true;

/******/ 			script.src = __webpack_require__.p + "" + chunkId + "." + ({"0":"index","1":"reporth5"}[chunkId]||chunkId) + ".js";
/******/ 			head.appendChild(script);
/******/ 		}
/******/ 	};

/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "./";
/******/ })
/************************************************************************/
/******/ ({

/***/ 25:
/***/ function(module, exports) {

	/**
	 * 通过正则表达式获取url参数
	 * 支持锚点#与自定义参数分割形式
	 */

	$.getUrlParamArray = function(external,split){
	    var reg = /^.*\?{1}(.*)/;
	    var result = [];
	    var href = window.location.href;
	    var url = decodeURI(href);
	    var param = reg.exec(url);
	    if(param == null || param.length == 1 || param[1] == '')
	        return result;
	    var reg2 = /(?:([^&#]*?)=([^&#]*))[&#]?/g;
	    //  匹配前面参数
	    param[1].replace(reg2,function(a,b,c){
	        analyseParam(b,c);
	    });
	    /*var reg3 = /[&#](?:([^&#]*?)=([^&#]*))$/g;
	     //   匹配最末尾参数
	     param[1].replace(reg3,function(a,b,c){
	     analyseParam(b,c);
	     });*/

	    function analyseParam(key,value){
	        if(/=/.test(value) && external){
	            var reg4 = new RegExp('(?:([^'+split+']*?)=([^'+split+']*))'+split+'','g');
	            var sub = [];
	            value.replace(reg4,function(a,b,c){
	                sub.push({key:b,value:c,type:'string'});
	            });
	            var reg5 = new RegExp(''+split+'(?:([^'+split+']*?)=([^'+split+']*))$','g');
	            value.replace(reg5,function(a,b,c){
	                sub.push({key:b,value:c,type:'string'});
	            });
	            result.push({
	                key:key,
	                type:'object',
	                value:sub
	            });
	        }else{
	            result.push({
	                key:key,
	                type:'string',
	                value:value
	            });
	        }
	    }
	    return result;
	};

	$.getUrlParamObject = function(){
	    var reg = /^.*\?{1}(.*)/;
	    var result = [];
	    var href = window.location.href;
	    var url = decodeURI(href);
	    var param = reg.exec(url);
	    if(param == null || param.length == 1 || param[1] == '')
	        return result;
	    var reg2 = /(?:([^&#]*?)=([^&#]*))[&#]?/g;
	    //  匹配前面参数
	    param[1].replace(reg2,function(a,b,c){
	        analyseParam(b,c);
	    });
	    /*var reg3 = /[&#](?:([^&#]*?)=([^&#]*))$/g;
	     //   匹配最末尾参数
	     param[1].replace(reg3,function(a,b,c){
	     analyseParam(b,c);
	     });*/

	    function analyseParam(key,value){
	        result[key] = value;
	    }
	    return result;
	};

	/**
	 * 获取当前域名
	 * @method getDomain
	 * return {String} 域名
	 */
	$.getDomain = function(){
	    var url = window.location.href;
	    var url = decodeURI(url);
	    var arr = url.match(/^(http[s]?:\/\/[^\/]*)\/.*$/);
	    return arr[1];
	};

/***/ },

/***/ 26:
/***/ function(module, exports) {

	/** ========================提供事件订阅机制=========================== **/
	var __Events = {},
	    toBeNotify = [],
	    toBeCall = [],
	    isCalling = false,
	    windowLoaded = false,
	    QUEUE_TIMEOUT = 30,//队列执行间隔时长
	    EVENT_PREFIX = 'TEMPORARYEVENT';//临时事件名称前缀，后缀为_+时间缀
	typeof window == 'undefined'?(window ={}):'';

	var Events = window.Events = {
	    EVENT_PREFIX:EVENT_PREFIX,
	    addMethod:function(methodName,method){
	        var that = this;
	        if(typeof method === 'function' && this[methodName] == undefined){
	            this[methodName] = function(){
	                return method.apply(that,toBeNotify.slice.call(arguments,0));
	            };
	        }
	        return this;
	    },
	    /**
	     * 触发一个事件
	     * @method notify
	     * @param eventName 事件名称
	     * @param data 事件数据 PS：现在支持变参，除了eventName,data以外还可以添加任意参数
	     * @returns {Events}
	     */
	    notify:function(eventName,data){
	        var eventNames = eventName.split(' '),result = {};
	        for(var key in eventNames){
	            var _eventName = eventNames[key];
	            result[_eventName] = [];
	            var eventList = __Events[_eventName],i = 0;
	            if(eventList){
	                var len = eventList.length;
	                for(;i < len;i++ ){
	                    eventList[i].apply(this,toBeNotify.slice.call(arguments,1));
	                }
	            }else{
	                toBeNotify.push({
	                    eventName:_eventName,
	                    data:toBeNotify.slice.call(arguments,1),
	                    scope:this
	                });//暂时存入待触发列表
	            }
	            //若为临时事件，则通知一次之后马上注销
	            if(new RegExp('^'+EVENT_PREFIX+'(_\\d+)$').test(_eventName))
	                this.unsubscribe(_eventName);
	        }

	        return this;
	    },
	    /**
	     * 给定作用域触发一个事件
	     * @param eventName 事件名称
	     * @param scope 作用域
	     * @param data 事件数据，支持变参
	     */
	    notifyWith:function(eventName,scope,data){
	        if (arguments.length<2)
	            throw new TypeError('按作用域触发事件请提供事件名称与作用域');
	        this.notify.apply(scope, [eventName].concat(toBeNotify.slice.call(arguments,2)));
	    },
	    /**
	     * 订阅一个事件
	     * @method subscribe
	     * @param eventName 事件名称
	     * @param callback 事件回调
	     */
	    subscribe: function (eventName, callback) {
	        var i = 0,len = toBeNotify.length;
	        if (arguments.length<2)
	            throw new TypeError('订阅事件请提供事件名称与事件回调');

	        var eventList = __Events[eventName]?__Events[eventName]:(__Events[eventName]=[]);
	        eventList = Object.prototype.toString.call(callback) === '[object Array]'?eventList.concat(callback):eventList.push(callback);
	        for(;i<len;i++){
	            if(toBeNotify[i].eventName === eventName){
	                //移除并触发之前已准备触发的事件
	                this.notify.apply(toBeNotify[i].scope , [eventName].concat(toBeNotify[i].data));
	                toBeNotify.splice(i,1);
	                break;
	            }
	        }
	        return this;
	    },
	    /**
	     * 取消订阅事件
	     * @method unsubscribe
	     * @param eventName 事件名称
	     */
	    unsubscribe: function(eventName,callback){
	        if(callback){
	            var callbacks = __Events[eventName];
	            for(var i = 0; i< callbacks.length ; i++){
	                if(callbacks[i] === callback){
	                    callbacks.splice(i--,1);
	                }
	            }
	        }else
	            delete __Events[eventName];
	        return this;
	    },
	    /**
	     * 列队执行 无参时代表调起队列开始执行
	     * @param callback 回调方法
	     */
	    queue:function(callback){
	        if(arguments.length == 0 && !isCalling){
	            _reCall();
	            return this;
	        }
	        if(isCalling || !windowLoaded){
	            toBeCall.push(callback);
	            return this;
	        }

	        isCalling = true;
	        callback();

	        setTimeout(_reCall,QUEUE_TIMEOUT);
	        function _reCall(){
	            var flag = false;
	            for(var i = 0;i < toBeCall.length;i++) {
	                flag = true;
	                toBeCall[i].call();
	                setTimeout(arguments.callee,QUEUE_TIMEOUT);
	                toBeCall.splice(i,1);
	                break;
	            }
	            isCalling = flag;
	        }
	        return this;
	    },
	    isIOS9:(navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPod/i)) && Boolean(navigator.userAgent.match(/OS [9]_\d[_\d]* like Mac OS X/i)),
	    isMobile:/Mobile/g.test(navigator.userAgent),
	    isIOS:(navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPod/i)),
	    ORIENTATION_LANDSCAPE:1,//横屏
	    ORIENTATION_PORTRAIT:0,//竖屏
	    orientation:0
	};
	//APP内 或 APP外且非IOS9
	if(!Events.isBrowser || (Events.isBrowser && !Events.isIOS9) ){
	    //app内直接设置为true不需要缓冲
	    windowLoaded = true;
	}else{
	    if(document.readyState === 'complete'){
	        windowLoaded = true;
	    }else{
	        window.addEventListener('load',function(){
	            windowLoaded = true;
	            Events.queue();
	        });
	    }
	}
	/** =================================================== **/

	module.exports = Events;

/***/ },

/***/ 29:
/***/ function(module, exports, __webpack_require__) {

	/**
	 * 框架基类模块<br>
	 * 提供一些基础的公共方法<br>
	 * 所有模块都应继承自它<br>
	 * @author yanglang
	 * @version 1.0
	 * @module framework-base
	 */

	__webpack_require__(25);
	var Events = __webpack_require__(26);


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
	 * 目前支持弹窗与账户中心嵌入两种形式，日后有需要可以随时增加<br>
	 * 此套架构的优点在于：解耦目前所有模块，功能上各模块互相提供API接口进行调用，各模块API由各自统一进行维护。<br>
	 * 此外，由于采用AMD模式架构，所以理论上支持无限量模块数目进行加载，浏览器的加载速度仍然飞快，扩展性非常好。<br>
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
	        Events.notify('onWindowResize');
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













/***/ }

/******/ });