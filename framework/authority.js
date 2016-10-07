var context = require('./context');
var cheerio = require('cheerio');
var authDao = require('../daos/authDao');

var roleAuthorityMap = {};

context.getApp().get('*', function(req,res,next){
    next();
});

context.getApp().locals.format = function(val){
    return val;
};

authDao.queryRoleAuthority(function(err,result){
    if(err){
        console.log(err);
        return;
    }
    for(var i = 0;i<result.length;i++){
        var role_id = result[i].role_id;
        if(!roleAuthorityMap[role_id]){
            roleAuthorityMap[role_id] = [];
        }
        roleAuthorityMap[role_id].push(result[i]);
    }
});

module.exports = {
    parse: function (data, req) {
        var $ = cheerio.load(data, {decodeEntities: false});
        $('sec-authorize').each(function (i, item) {
            if ($(this).attr('url') == 'function:view:221')
                $(this).children().insertAfter($(this));
        }).remove();
        return $.html();
    },
    isPermission:function(roles,expr){
        for(var i = 0;i<roles.length;i++){
            if(expr.indexOf(':')==-1){
                //资源id鉴权
                var resources = roleAuthorityMap[roles[i].role_id];
                if(!resources)
                    continue;
                for(var j = 0;j<resources.length;j++){
                    if(resources[j].resource_id == expr){
                        return true;
                    }
                }
            }
        }
        return false;
    }
};
