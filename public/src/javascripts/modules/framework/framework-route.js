/**
 * 路由控制<br>
 * @author yanglang
 * @version 1.0
 * @module historycontrol-base
 */

var Router = require('../../libs/director.min').Router;
var Events = require('../../libs/framework-events');
var frameworkBase = require('../framework/framework-base');


function load(_module,showType){
    _module = '.'+_module;
    Events.notify('onSelectMenu',_module).require(_module).init({from:'click',showType:showType == 2?'Pop':'Normal'});
}
var auth_menus = [],router;

module.exports = {
    init:function(){
        frameworkBase.query('/auth/menu/list',function(data){
            if(!data.success){
                frameworkBase.toast(data.message);
                return;
            }
            var routes = {},menuList = data.data;
            for(var i = 0,len = menuList.length;i<len;i++){
                routes[menuList[i]['menu_url']] = load.bind(null,menuList[i]['menu_url'],menuList[i]['show_type']);
                auth_menus.push(menuList[i]['menu_url'])
            }

            router = Router(routes);
            router.init();
        });
    },
    isPermission:function(url){
        var flag = false;
        auth_menus.forEach(function(item){
            if(item == url){
                flag = true;
                return false;
            }
        });
        return flag;
    }
};