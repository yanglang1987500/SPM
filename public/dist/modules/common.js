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
/******/ 		6:0
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

/******/ 			script.src = __webpack_require__.p + "chunk/" + {"0":"586800b7","1":"4a0d52a7","2":"f32336e9","3":"cbfd9b62","4":"dc6992d0","5":"c3e30807"}[chunkId] + ".chunk.min.js";
/******/ 			head.appendChild(script);
/******/ 		}
/******/ 	};

/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/modules/";
/******/ })
/************************************************************************/
/******/ ({

/***/ 14:
/***/ function(module, exports) {

	/**
	 * @module date.js
	 * Calendar日期类以及对Date对象扩展一个format方法
	 * 实例化方法getInstance 支持如下链式操作
	 * Calendar.getInstance().add(Calendar.MONTH,-1).add(Calendar.DATE,5).format('yyyyMMdd hh:mm:ss')
	 * Calendar.getInstance().add(Calendar.WEEK,-1).getTime()
	 * Calendar.getInstance().parse('20160120102234')
	 * Calendar.getInstance('20160120').format('M月d日')
	 * @method Calendar
	 * @author yanglang
	 * @date 20160120
	 */
	(function(){
	    var Calendar = function () {
	        throw new TypeError('请使用getInstance方法进行实例化');
	    };
	    typeof window == 'undefined' ? (module.exports = Calendar) : (window.Calendar = Calendar);

	    Calendar.prototype = {
	        constructor:Calendar,
	        /**
	         * 构造方法
	         * @param date
	         */
	        init:function(date){
	            date ? this.parse(date): this.date = new Date();
	        },
	        /**
	         * @method add
	         * @param type Calendar.YEAR Calendar.MONTH Calendar.WEEK Calendar.DATE
	         * @param num 正数或负数
	         */
	        add: function (type, num) {
	            if (isNaN(num))
	                throw new TypeError('第二个参数必须为数字');
	            switch (type) {
	                case 1:
	                    this.date.setFullYear(num + this.date.getFullYear());
	                    break;
	                case 2:
	                    this.date.setMonth(num + this.date.getMonth());
	                    break;
	                case 3:
	                    this.date.setDate(num + this.date.getDate());
	                    break;
	                case 4:
	                    this.date.setDate(num*7 + this.date.getDate());
	                    break;
	                case 5:
	                    this.date.setHours(num + this.date.getHours());
	                    break;
	                case 6:
	                    this.date.setMinutes(num + this.date.getMinutes());
	                    break;
	            }
	            return this;
	        },
	        /**
	         * 获取Date日期对象值
	         * @returns {Date|*|XML|string}
	         */
	        getTime: function () {
	            return this.date;
	        },
	        /**
	         * 将传入对象转换成Calendar实例以便进行日期操作
	         * @method parse
	         * @param timeObj Date日期对象 或 带时间的字符串（比如2005年05月04日 02时33分44秒）或Calendar对象
	         */
	        parse: function (timeObj) {
	            var type = Object.prototype.toString.call(timeObj);
	            if(type === '[object Date]'){
	                this.date = timeObj;
	            }else if(type === '[object String]'){
	                timeObj = timeObj.replace(/[^\d]*/gm,''),len = timeObj.length;
	                while(len<14){
	                    timeObj+='0';
	                    len++;
	                }
	                timeObj = timeObj.replace(/^(\d{4})(\d{2})(\d{2})(\d{2})?(\d{2})?(\d{2})?.*$/, '$1/$2/$3 $4:$5:$6');
	                this.date = new Date(timeObj);
	            }else if(type === '[object Object]' && timeObj instanceof this.constructor){
	                this.date = timeObj.getTime();
	            }else if(type === '[object Number]' ){
	                this.date = new Date(timeObj);
	            }else{
	                throw new TypeError('暂不支持转换此数据类型');
	            }
	            return this;
	        },
	        /**
	         * 得到格式化的日期字符串
	         * @param fmt 格式化模板如 yyyyMMdd hh:mm:ss
	         * @returns {String}
	         */
	        format:function(fmt){
	            return this.date.format(fmt);
	        }
	    };

	    Calendar.prototype.init.prototype = Calendar.prototype;

	    /**
	     * 获取Calendar实例
	     * @param date optional 可选参数 可以传入一个日期对象或日期字符串或Calendar对象或时间数
	     * @returns {Calendar.prototype.init}
	     */
	    Calendar.getInstance = function (date) {
	        return new Calendar.prototype.init(date);
	    };

	    Calendar.YEAR = 1;
	    Calendar.MONTH = 2;
	    Calendar.DATE = 3;
	    Calendar.WEEK = 4;
	    Calendar.HOUR = 5;
	    Calendar.MINUTE = 6;

	    /**
	     * 对Date的扩展，将 Date 转化为指定格式的String<br>
	     * 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，<br>
	     * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)<br>
	     * 例子：<br>
	     * (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423<br>
	     * (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18<br>
	     * (new Date()).format("yyyy-MM-dd EE");  ==> 2015-08-07 周五<br>
	     * (new Date()).format("yyyy-MM-dd EEE");  ==> 2015-08-07 星期五<br>
	     * (new Date()).format("yyyy-MM-dd E");  ==> 2015-08-07 五<br>
	     * @method format
	     * @param {String} fmt format字符串
	     * @returns {String}
	     */
	    Date.prototype.format = function(fmt) {
	        var that = this;
	        var o = {
	            "M+" : this.getMonth() + 1, //月份
	            "d+" : this.getDate(), //日
	            "h+" : this.getHours() % 12 == 0 ? 12: this.getHours() % 12, //小时
	            "H+" : this.getHours(), //小时
	            "U+" : this.getUTCHours(), //UTC小时
	            "m+" : this.getMinutes(), //分
	            "s+" : this.getSeconds(), //秒
	            "q+" : Math.floor((this.getMonth() + 3) / 3), //季度
	            "S" : this.getMilliseconds()//毫秒
	        };
	        var week = {
	            "0" : "星期天","1" : "一","2" : "二","3" : "三","4" : "四","5" : "五","6" : "六"
	        };
	        if (/(y+)/.test(fmt)) {
	            fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "")
	                .substr(4 - RegExp.$1.length));
	        }
	        if (/(E+)/.test(fmt)) {
	            fmt = fmt.replace(RegExp.$1,function(){
	                if(that.getDay() == 0){
	                    if(RegExp.$1.length > 1){
	                        return RegExp.$1.length > 2?"星期天":"周日";
	                    }else
	                        return "日";
	                }else{
	                    if(RegExp.$1.length > 1){
	                        return RegExp.$1.length > 2?"星期"+ week[that.getDay()]:"周"+ week[that.getDay()];
	                    } else{
	                        return week[that.getDay()]
	                    }
	                }
	            }());
	        }
	        for ( var k in o) {
	            if (new RegExp("(" + k + ")").test(fmt)) {
	                fmt = fmt.replace(RegExp.$1,(RegExp.$1.length == 1) ? (o[k]): (("00" + o[k]).substr(("" + o[k]).length)));
	            }
	        }
	        return fmt;
	    };
	})();

/***/ },

/***/ 17:
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
	            if(callbacks)
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

/***/ 21:
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by 杨浪 on 2016/10/25.
	 */
	var md5 = __webpack_require__(22);
	/**=======================================扩展加密解密===========================================**/
	module.exports = {
	    cert:'spm',
	    panEncrypt: function (str, pwd) {
	        if (pwd == null || pwd.length <= 0) {
	            pwd = this.cert;
	            return null;
	        }
	        var prand = "";
	        for (var i = 0; i < pwd.length; i++) {
	            prand += pwd.charCodeAt(i).toString();
	        }
	        var sPos = Math.floor(prand.length / 5);
	        var mult = parseInt(prand.charAt(sPos) + prand.charAt(sPos * 2)
	            + prand.charAt(sPos * 3) + prand.charAt(sPos * 4)
	            + prand.charAt(sPos * 5));
	        var incr = Math.ceil(pwd.length / 2);
	        var modu = Math.pow(2, 31) - 1;
	        if (mult < 2) {
	            alert("Algorithm cannot find a suitable hash. Please choose a different password. \nPossible considerations are to choose a more complex or longer password.");
	            return null;
	        }
	        var salt = Math.round(Math.random() * 1000000000) % 100000000;
	        prand += salt;
	        while (prand.length > 10) {
	            prand = (parseInt(prand.substring(0, 10)) + parseInt(prand.substring(
	                10, prand.length))).toString();
	        }
	        prand = (mult * prand + incr) % modu;
	        var enc_chr = "";
	        var enc_str = "";
	        str = encodeURI(str);

	        for (var i = 0; i < str.length; i++) {
	            enc_chr = parseInt(str.charCodeAt(i) ^ Math.floor((prand / modu) * 255));
	            if (enc_chr < 16) {
	                enc_str += "0" + enc_chr.toString(16);
	            } else
	                enc_str += enc_chr.toString(16);
	            prand = (mult * prand + incr) % modu;
	        }
	        salt = salt.toString(16);
	        while (salt.length < 8)
	            salt = "0" + salt;
	        enc_str += salt;
	        return enc_str;
	    },
	    panDecrypt: function (str, pwd) {
	        if (str == null || str.length < 8) {
	            alert("A salt value could not be extracted from the encrypted message because it's length is too short. The message cannot be decrypted.");
	            return;
	        }
	        if (pwd == null || pwd.length <= 0) {
	            pwd = this.cert;
	            return;
	        }
	        var prand = "";
	        for (var i = 0; i < pwd.length; i++) {
	            prand += pwd.charCodeAt(i).toString();
	        }
	        var sPos = Math.floor(prand.length / 5);
	        var mult = parseInt(prand.charAt(sPos) + prand.charAt(sPos * 2)
	            + prand.charAt(sPos * 3) + prand.charAt(sPos * 4)
	            + prand.charAt(sPos * 5));
	        var incr = Math.round(pwd.length / 2);
	        var modu = Math.pow(2, 31) - 1;
	        var salt = parseInt(str.substring(str.length - 8, str.length), 16);
	        str = str.substring(0, str.length - 8);
	        prand += salt;
	        while (prand.length > 10) {
	            prand = (parseInt(prand.substring(0, 10)) + parseInt(prand.substring(
	                10, prand.length))).toString();
	        }
	        prand = (mult * prand + incr) % modu;
	        var enc_chr = "";
	        var enc_str = "";
	        for (var i = 0; i < str.length; i += 2) {
	            enc_chr = parseInt(parseInt(str.substring(i, i + 2), 16)
	                ^ Math.floor((prand / modu) * 255));
	            enc_str += String.fromCharCode(enc_chr);
	            prand = (mult * prand + incr) % modu;
	        }
	        return decodeURI(enc_str);
	    },
	    md5:function(val){
	        return md5(val);
	    }
	};


/***/ },

/***/ 22:
/***/ function(module, exports) {

	'use strict'
	/*
	 * Add integers, wrapping at 2^32. This uses 16-bit operations internally
	 * to work around bugs in some JS interpreters.
	 */
	function safe_add (x, y) {
	    var lsw = (x & 0xFFFF) + (y & 0xFFFF)
	    var msw = (x >> 16) + (y >> 16) + (lsw >> 16)
	    return (msw << 16) | (lsw & 0xFFFF)
	}

	/*
	 * Bitwise rotate a 32-bit number to the left.
	 */
	function bit_rol (num, cnt) {
	    return (num << cnt) | (num >>> (32 - cnt))
	}

	/*
	 * These functions implement the four basic operations the algorithm uses.
	 */
	function md5_cmn (q, a, b, x, s, t) {
	    return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s), b)
	}
	function md5_ff (a, b, c, d, x, s, t) {
	    return md5_cmn((b & c) | ((~b) & d), a, b, x, s, t)
	}
	function md5_gg (a, b, c, d, x, s, t) {
	    return md5_cmn((b & d) | (c & (~d)), a, b, x, s, t)
	}
	function md5_hh (a, b, c, d, x, s, t) {
	    return md5_cmn(b ^ c ^ d, a, b, x, s, t)
	}
	function md5_ii (a, b, c, d, x, s, t) {
	    return md5_cmn(c ^ (b | (~d)), a, b, x, s, t)
	}

	/*
	 * Calculate the MD5 of an array of little-endian words, and a bit length.
	 */
	function binl_md5 (x, len) {
	    /* append padding */
	    x[len >> 5] |= 0x80 << (len % 32)
	    x[(((len + 64) >>> 9) << 4) + 14] = len

	    var i
	    var olda
	    var oldb
	    var oldc
	    var oldd
	    var a = 1732584193
	    var b = -271733879
	    var c = -1732584194
	    var d = 271733878

	    for (i = 0; i < x.length; i += 16) {
	        olda = a
	        oldb = b
	        oldc = c
	        oldd = d

	        a = md5_ff(a, b, c, d, x[i], 7, -680876936)
	        d = md5_ff(d, a, b, c, x[i + 1], 12, -389564586)
	        c = md5_ff(c, d, a, b, x[i + 2], 17, 606105819)
	        b = md5_ff(b, c, d, a, x[i + 3], 22, -1044525330)
	        a = md5_ff(a, b, c, d, x[i + 4], 7, -176418897)
	        d = md5_ff(d, a, b, c, x[i + 5], 12, 1200080426)
	        c = md5_ff(c, d, a, b, x[i + 6], 17, -1473231341)
	        b = md5_ff(b, c, d, a, x[i + 7], 22, -45705983)
	        a = md5_ff(a, b, c, d, x[i + 8], 7, 1770035416)
	        d = md5_ff(d, a, b, c, x[i + 9], 12, -1958414417)
	        c = md5_ff(c, d, a, b, x[i + 10], 17, -42063)
	        b = md5_ff(b, c, d, a, x[i + 11], 22, -1990404162)
	        a = md5_ff(a, b, c, d, x[i + 12], 7, 1804603682)
	        d = md5_ff(d, a, b, c, x[i + 13], 12, -40341101)
	        c = md5_ff(c, d, a, b, x[i + 14], 17, -1502002290)
	        b = md5_ff(b, c, d, a, x[i + 15], 22, 1236535329)

	        a = md5_gg(a, b, c, d, x[i + 1], 5, -165796510)
	        d = md5_gg(d, a, b, c, x[i + 6], 9, -1069501632)
	        c = md5_gg(c, d, a, b, x[i + 11], 14, 643717713)
	        b = md5_gg(b, c, d, a, x[i], 20, -373897302)
	        a = md5_gg(a, b, c, d, x[i + 5], 5, -701558691)
	        d = md5_gg(d, a, b, c, x[i + 10], 9, 38016083)
	        c = md5_gg(c, d, a, b, x[i + 15], 14, -660478335)
	        b = md5_gg(b, c, d, a, x[i + 4], 20, -405537848)
	        a = md5_gg(a, b, c, d, x[i + 9], 5, 568446438)
	        d = md5_gg(d, a, b, c, x[i + 14], 9, -1019803690)
	        c = md5_gg(c, d, a, b, x[i + 3], 14, -187363961)
	        b = md5_gg(b, c, d, a, x[i + 8], 20, 1163531501)
	        a = md5_gg(a, b, c, d, x[i + 13], 5, -1444681467)
	        d = md5_gg(d, a, b, c, x[i + 2], 9, -51403784)
	        c = md5_gg(c, d, a, b, x[i + 7], 14, 1735328473)
	        b = md5_gg(b, c, d, a, x[i + 12], 20, -1926607734)

	        a = md5_hh(a, b, c, d, x[i + 5], 4, -378558)
	        d = md5_hh(d, a, b, c, x[i + 8], 11, -2022574463)
	        c = md5_hh(c, d, a, b, x[i + 11], 16, 1839030562)
	        b = md5_hh(b, c, d, a, x[i + 14], 23, -35309556)
	        a = md5_hh(a, b, c, d, x[i + 1], 4, -1530992060)
	        d = md5_hh(d, a, b, c, x[i + 4], 11, 1272893353)
	        c = md5_hh(c, d, a, b, x[i + 7], 16, -155497632)
	        b = md5_hh(b, c, d, a, x[i + 10], 23, -1094730640)
	        a = md5_hh(a, b, c, d, x[i + 13], 4, 681279174)
	        d = md5_hh(d, a, b, c, x[i], 11, -358537222)
	        c = md5_hh(c, d, a, b, x[i + 3], 16, -722521979)
	        b = md5_hh(b, c, d, a, x[i + 6], 23, 76029189)
	        a = md5_hh(a, b, c, d, x[i + 9], 4, -640364487)
	        d = md5_hh(d, a, b, c, x[i + 12], 11, -421815835)
	        c = md5_hh(c, d, a, b, x[i + 15], 16, 530742520)
	        b = md5_hh(b, c, d, a, x[i + 2], 23, -995338651)

	        a = md5_ii(a, b, c, d, x[i], 6, -198630844)
	        d = md5_ii(d, a, b, c, x[i + 7], 10, 1126891415)
	        c = md5_ii(c, d, a, b, x[i + 14], 15, -1416354905)
	        b = md5_ii(b, c, d, a, x[i + 5], 21, -57434055)
	        a = md5_ii(a, b, c, d, x[i + 12], 6, 1700485571)
	        d = md5_ii(d, a, b, c, x[i + 3], 10, -1894986606)
	        c = md5_ii(c, d, a, b, x[i + 10], 15, -1051523)
	        b = md5_ii(b, c, d, a, x[i + 1], 21, -2054922799)
	        a = md5_ii(a, b, c, d, x[i + 8], 6, 1873313359)
	        d = md5_ii(d, a, b, c, x[i + 15], 10, -30611744)
	        c = md5_ii(c, d, a, b, x[i + 6], 15, -1560198380)
	        b = md5_ii(b, c, d, a, x[i + 13], 21, 1309151649)
	        a = md5_ii(a, b, c, d, x[i + 4], 6, -145523070)
	        d = md5_ii(d, a, b, c, x[i + 11], 10, -1120210379)
	        c = md5_ii(c, d, a, b, x[i + 2], 15, 718787259)
	        b = md5_ii(b, c, d, a, x[i + 9], 21, -343485551)

	        a = safe_add(a, olda)
	        b = safe_add(b, oldb)
	        c = safe_add(c, oldc)
	        d = safe_add(d, oldd)
	    }
	    return [a, b, c, d]
	}

	/*
	 * Convert an array of little-endian words to a string
	 */
	function binl2rstr (input) {
	    var i
	    var output = ''
	    for (i = 0; i < input.length * 32; i += 8) {
	        output += String.fromCharCode((input[i >> 5] >>> (i % 32)) & 0xFF)
	    }
	    return output
	}

	/*
	 * Convert a raw string to an array of little-endian words
	 * Characters >255 have their high-byte silently ignored.
	 */
	function rstr2binl (input) {
	    var i
	    var output = []
	    output[(input.length >> 2) - 1] = undefined
	    for (i = 0; i < output.length; i += 1) {
	        output[i] = 0
	    }
	    for (i = 0; i < input.length * 8; i += 8) {
	        output[i >> 5] |= (input.charCodeAt(i / 8) & 0xFF) << (i % 32)
	    }
	    return output
	}

	/*
	 * Calculate the MD5 of a raw string
	 */
	function rstr_md5 (s) {
	    return binl2rstr(binl_md5(rstr2binl(s), s.length * 8))
	}

	/*
	 * Calculate the HMAC-MD5, of a key and some data (raw strings)
	 */
	function rstr_hmac_md5 (key, data) {
	    var i
	    var bkey = rstr2binl(key)
	    var ipad = []
	    var opad = []
	    var hash
	    ipad[15] = opad[15] = undefined
	    if (bkey.length > 16) {
	        bkey = binl_md5(bkey, key.length * 8)
	    }
	    for (i = 0; i < 16; i += 1) {
	        ipad[i] = bkey[i] ^ 0x36363636
	        opad[i] = bkey[i] ^ 0x5C5C5C5C
	    }
	    hash = binl_md5(ipad.concat(rstr2binl(data)), 512 + data.length * 8)
	    return binl2rstr(binl_md5(opad.concat(hash), 512 + 128))
	}

	/*
	 * Convert a raw string to a hex string
	 */
	function rstr2hex (input) {
	    var hex_tab = '0123456789abcdef'
	    var output = ''
	    var x
	    var i
	    for (i = 0; i < input.length; i += 1) {
	        x = input.charCodeAt(i)
	        output += hex_tab.charAt((x >>> 4) & 0x0F) +
	            hex_tab.charAt(x & 0x0F)
	    }
	    return output
	}

	/*
	 * Encode a string as utf-8
	 */
	function str2rstr_utf8 (input) {
	    return unescape(encodeURIComponent(input))
	}

	/*
	 * Take string arguments and return either raw or hex encoded strings
	 */
	function raw_md5 (s) {
	    return rstr_md5(str2rstr_utf8(s))
	}
	function hex_md5 (s) {
	    return rstr2hex(raw_md5(s))
	}
	function raw_hmac_md5 (k, d) {
	    return rstr_hmac_md5(str2rstr_utf8(k), str2rstr_utf8(d))
	}
	function hex_hmac_md5 (k, d) {
	    return rstr2hex(raw_hmac_md5(k, d))
	}

	function md5 (string, key, raw) {
	    if (!key) {
	        if (!raw) {
	            return hex_md5(string)
	        }
	        return raw_md5(string)
	    }
	    if (!raw) {
	        return hex_hmac_md5(key, string)
	    }
	    return raw_hmac_md5(key, string)
	}

	module.exports = md5;


/***/ }

/******/ });