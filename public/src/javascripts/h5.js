/**
 * Created by 杨浪 on 2016/10/13.
 */
require('../stylesheets/h5.scss');
var FastClick = require('./libs/fastclick');
var Vue = require('vue');
var VueRouter = require('vue-router');
Vue.use(VueRouter);
var Events = require('./libs/framework-events');
var loader = require('./h5/vue-components-loader');

/**
 * 加载路由配置
 */
var routes = [];
var app;
loader.load(function(data){
    debugger;
    routes = data;
    const router = window.Router =  new VueRouter({
        routes:data
    });
    app = new Vue({
        router:router,
        data:{
        },
        methods:{}
    }).$mount('#h5app');
});

$(function(){
    FastClick.attach(document.body);
});
