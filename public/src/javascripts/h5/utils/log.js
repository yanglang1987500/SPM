/**
 * Created by 杨浪 on 2017/1/19.
 */
require('../../libs/calendar');
var __log = console.log, Arr = [];
window.line = function () {
    var error = new Error(''),
        brower = {
            ie: !-[1,], // !!window.ActiveXObject || "ActiveXObject" in window
            opera: ~window.navigator.userAgent.indexOf("Opera"),
            firefox: ~window.navigator.userAgent.indexOf("Firefox"),
            chrome: ~window.navigator.userAgent.indexOf("Chrome"),
            safari: ~window.navigator.userAgent.indexOf("Safari"), // /^((?!chrome).)*safari/i.test(navigator.userAgent)?
        },
        todo = function () {
            // TODO:
            console.error('a new island was found, please told the line()\'s author(roastwind)');
        },
        line = (function(error, origin){
            // line, column, sourceURL
            if(error.stack){
                var line,
                    stacks = error.stack.split('\n'),
                stackLength = stacks.length;
                for(var i = 0;i<stackLength;i++){
                    if(stacks[i].indexOf('Object.console.log')!=-1){
                        line = stacks[i+1];
                        break;
                    }
                }
                return line;
            }else{
                todo();
            }
            return '😭';
        })(error, window.location.origin);
    return line;
};
console.log = function(){
    var _line = line(arguments.callee.caller);
    var arr = [Calendar.getInstance().format('HH:mm:ss')];
    arr = arr.concat(Arr.slice.call(arguments)).concat("\n\t\t\t\t\t\t\t\t\t"+_line);
    __log.apply(console,arr);
};
