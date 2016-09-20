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