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
    loadAuthorities:function(){
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
    },
    reloadAuthorities:function(){
        roleAuthorityMap = {};
        this.loadAuthorities();
    },
    reloadUserRole:function(sessionUserInfo,callback){
        authDao.queryUserRoleByUserId(sessionUserInfo.userid,function(err,roles) {
            sessionUserInfo.setRoles(roles);
            callback && callback();
        });
    },
    parse: function (data, sessionUserInfo) {
        var $ = cheerio.load(data, {decodeEntities: false});
        $('sec-authorize').each(function (i, item) {
            var url = $(this).attr('url');
            //鉴权
            var ret = sessionUserInfo.getRoles().isPermission(url);
            ret && ($(this).children().insertAfter($(this)));
        }).remove();
        return $.html();
    },
    isPermission:function(roles,expr){
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
