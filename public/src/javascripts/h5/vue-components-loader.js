/**
 * Created by 杨浪 on 2016/10/14.
 */

var menu = [];
var utils = require('./utils/utils');
var store = require('./utils/store');

/**
 * 添加本地模块
 * @param arr
 */
function loadComponent(modules){
    //先将homepage路由加入
    modules.push({path:'/',component:require('./vue-components/homepage.vue')});
    modules.push({path:'/webim-chat',component:require('./vue-components/webim-chat.vue')});
    modules.push({path:'/webim-search',component:require('./vue-components/webim-search.vue')});
    modules.push({path:'/webim-detail',component:require('./vue-components/webim-detail.vue')});
    modules.push({path:'/webim-subscribe-list',component:require('./vue-components/webim-subscribe-list.vue')});
}

module.exports = {
    load:function(callback){
        var arr = [];
        utils.ajax.query('/auth/menu/list',function(data){
            if(!data.success){
                return;
            }
            var menuList = data.data;
            loadComponent(arr);
            for(var i = 0,len = menuList.length;i<len;i++){
                if(menuList[i].menu_device == '1')
                    continue;
                //H5模块的路由都要求是由h5/开头 如果是父级菜单则menu_url为空
                if(menuList[i]['menu_url']){
                    var flag = /\/h5\/(.*)/.test(menuList[i]['menu_url']);
                    if(flag){
                        var mod = require('./vue-components/'+RegExp.$1+'.vue');
                        arr.push({path:mod.module,component:mod});
                        menuList[i].path = '/'+RegExp.$1;
                        menu.push(menuList[i]);
                    }
                }else{
                    var mod = require('./vue-components/menu-second.vue');
                    arr.push({path:mod.module,component:mod});
                    menuList[i].path = '/menu-second?menu_id='+menuList[i]['menu_id'];
                    menu.push(menuList[i]);
                }

            }
            arr.push({path:'*',component:require('./vue-components/homepage.vue')});
            callback && callback(arr);
        });
        utils.ajax.query('/auth/client',function(data){
            if(!data.success){
                $.ui.toast('初始化权限数据异常');
                return;
            }
            store.commit('setRoleAuthorityMap',data.data.roleAuthorityMap);
            store.commit('setUserRoles',data.data.userRoles);
        });
  /*      modules.forEach(function(item){
            var mod = require('./vue-components/'+item+'.vue');
            arr.push({path:mod.module,component:mod});
        });
        return arr;*/
    },
    getMenu:function(){
        return menu;
    }
};