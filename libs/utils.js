/**
 * Created by Administrator on 2016/6/15.
 */
var crypto = require('crypto');
var guid = require('guid');

/*=============order相关===========**/
var oldOrder = 0;
var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function newOrder() {
    var l = newOrderID();

    var localStringBuffer = [], len = 0;
    while (l > 0 && len < 10) {
        localStringBuffer.push(chars.charAt(parseInt(l % 36)));
        l /= 36;
        len++;
    }
    return localStringBuffer.join('');
}

function newOrderID() {
    var l = new Date().getTime();
    if (l <= oldOrder)
        l = oldOrder + 1;
    oldOrder = l;

    return l;
}
/*=============order相关===========**/


module.exports = {
    returns:function(args){
        return {
            code:args[0]?0:1,
            success:args[0]?false:true,
            message:args[0] ? args[0].message : '',
            data:function() {
                return args[0] ? {} : args[1];
            }()
        };
    },
    returnJson:function(success,data){
        return {
            code:success?1:0,
            success:success,
            message:typeof data === 'string' ? data : '',
            data:function() {
                return typeof data === 'string' ? {} : data;
            }()
        };
    },
    md5:function(val){
        var md5 = crypto.createHash('md5');
        md5.update(val);
        return md5.digest('hex');
    },
    generatorOrder:function(){
        return newOrder();
    },
    guid:function(){
        return guid.raw().replace(/-/gi,'');
    }
};