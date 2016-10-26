<template>
    <transition v-on:before-enter="beforeEnter"  v-on:after-enter="afterEnter"
                v-on:enter="enter"
                v-on:leave="leave"
                v-on:before-leave="beforeLeave"
                v-bind:css="false">
    <div class="router-view" >
        <ul class="homepage-menu-list">
            <template v-for="item in menus">
                <router-link v-bind:to="item.path"><li v-bind:class="'menu-list-item fa '+item.menu_icon"><span>{{item.menu_title}}</span></li></router-link>
            </template>


            <a href="/h5/logout"><li class="menu-list-item fa fa-power-off" ><span>注销</span></li></a>
        </ul>
    </div>
    </transition>
</template>

<script>
    var navigator = require('./vue-navigator.vue');

    var utils = require('../utils/utils');
    var methods = {};
    utils.animation.processHomepage(methods);
    var loader = require('../vue-components-loader');
    module.exports = {
        module:'/',
        data:function(){
            return {
                menus:function(){
                    var menus = loader.getMenu(), sub = [];
                    menus.forEach(function(item){
                        if(item['menu_parent_id'] == '0')
                            sub.push(item);
                    });
                    return sub;
                }()
            }
        },
        computed:{
            MINHEIGHT:function(){
                return window.HEIGHT;
            }
        },
        methods:methods,
        components:{navigator:navigator},
        mounted:function(){
        }
    };
</script>

<style lang="sass" scoped>
    @import "../../../stylesheets/vue-styles/homepage.scss";

</style>