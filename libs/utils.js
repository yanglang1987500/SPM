/**
 * Created by Administrator on 2016/6/15.
 */
var crypto = require('crypto');

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
            data:function() {
                return typeof data === 'string' ? {message: data} : data;
            }()
        };
    },
    md5:function(val){
        var md5 = crypto.createHash('md5');
        md5.update(val);
        return md5.digest('hex');
    }
};