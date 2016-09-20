/**
 * 通过正则表达式获取url参数
 * 支持锚点#与自定义参数分割形式
 */
require('./jquery.min');
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