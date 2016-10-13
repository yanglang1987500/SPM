/**
 * Created by 杨浪 on 2016/10/13.
 */
require('../stylesheets/h5.scss');
var FastClick = require('./libs/fastclick');
var Vue = require('vue');
var VueRouter = require('vue-router');
Vue.use(VueRouter);


const Foo = { template: '<div>foo</div>' }
const attenceAnalyse = require('./vue-components/attence-analyse.vue');
const HomePage = require('./vue-components/homepage.vue');


const routes = [
    { path: '/', component: HomePage },
    { path: '/foo', component: Foo },
    { path: '/attence-analyse', component: attenceAnalyse }
];


const router = new VueRouter({
    routes:routes
})


const app = new Vue({
    router:router,
    data:{
    }
}).$mount('#h5app');

$(function(){
   FastClick.attach(document.body);
});