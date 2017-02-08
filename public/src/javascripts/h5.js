/**
 * Created by 杨浪 on 2016/10/13.
 */

require('../stylesheets/h5.scss');
require('../stylesheets/vue-styles/theme.scss');
var FastClick = require('./libs/fastclick');


require('./libs/calendar');
var Vue = require('vue');
var VueRouter = require('vue-router');
Vue.use(VueRouter);

var Events = require('./libs/framework-events');
var utils = window.utils = require('./h5/utils/utils');
var loader = require('./h5/vue-components-loader');
require('./libs/loading/loading.js');
var store = require('./h5/utils/store');
require('./h5/utils/log');

/**
 * 加载路由配置
 */
var routes = [];
var app;


loader.load(function(data){
    routes = data;
    const router = window.Router =  new VueRouter({
        routes:data
    });
   /* router.beforeEach((to, from, next) => {
        var flag = false;
        data.every(function(item){
            if((new RegExp('^'+item.path+'(\\?.*)?$','g')).test(to.fullPath)){
                flag = true;
                return false;
            }
            return true;
        });
        !flag?next({path: '/'}):next();
    });*/
    Events.subscribe('router-push',function(path){
        router.push(path);
    }).subscribe('message-notice-info',function(message,callback){
        if(router.history.current.path != '/webim-chat' && router.history.current.path != '/webim'){
            message = message.trim();
            message = message.length>20?message.substr(0,20)+'……':message;

            $.ui.info(message,callback);
        }
    });
    Vue.prototype.alias = function(name){
        var list = store.state.rosterList;
        for(var i = 0;i<list.length;i++){
            if(list[i].name == name)
                return list[i].nickname?list[i].nickname:'';
        }
        return '';
    };
    Vue.prototype.getColor = function(name){
        if(!name)
            return '#000';
        var num = utils.djb2Code(name);
        num = /^.*(\d)$/.test(num) && RegExp.$1;
        return utils.colors[parseInt(num)];
    };
    app = new Vue({
        router:router,
        store:store,
        data:{},
        methods:{}
    }).$mount('#h5app');
});

$(function(){
    var theme;
    if(theme = localStorage.getItem('_H5_THEME_KEY_')){
        $('body')[0].className = (theme);
    }

    $('#msg_holder').remove();
    window.HEIGHT = $(window).height();
    FastClick.attach(document.body);

    
});
