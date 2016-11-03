/**
 * Created by 杨浪 on 2016/10/13.
 */

require('../stylesheets/h5.scss');
require('../stylesheets/vue-styles/theme.scss');
var FastClick = require('./libs/fastclick');
var Vue = require('vue');
var VueRouter = require('vue-router');
Vue.use(VueRouter);
var Events = require('./libs/framework-events');
var loader = require('./h5/vue-components-loader');
require('./libs/loading/loading.js');
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
    app = new Vue({
        router:router,
        data:{
        },
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
