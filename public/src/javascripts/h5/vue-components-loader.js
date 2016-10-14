/**
 * Created by 杨浪 on 2016/10/14.
 */

var menu = [];

module.exports = {
    load:function(callback){
        var arr = [];
        $.get('/auth/menu/list',function(data){
            if(!data.success){
                return;
            }
            var menuList = data.data;
            arr.push({path:'/',component:require('./vue-components/homepage.vue')});
            for(var i = 0,len = menuList.length;i<len;i++){
                if(menuList[i].menu_device == '1')
                    continue;
                var flag = /\/h5\/(.*)/.test(menuList[i]['menu_url']);
                if(flag){
                    var mod = require('./vue-components/'+RegExp.$1+'.vue');
                    arr.push({path:mod.module,component:mod});
                    menuList[i].path = '/'+RegExp.$1;
                    menu.push(menuList[i]);
                }
            }
            callback && callback(arr);
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