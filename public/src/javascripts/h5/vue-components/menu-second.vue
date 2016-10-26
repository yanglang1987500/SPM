<template>
    <transition v-on:before-enter="beforeEnter" v-on:after-enter="afterEnter"
                v-on:enter="enter"
                v-on:leave="leave"
                v-on:before-leave="beforeLeave"
                v-bind:css="false">
    <div class="router-view" id="menu-second-view-container" >
        <navigator :navigator-title="menu_title" ></navigator>
        <ul class="second-menu-list">
            <template v-for="item in menus">
                <router-link v-bind:to="item.path"><li v-bind:class="'menu-list-item fa '+item.menu_icon"><span>{{item.menu_title}}</span></li></router-link>
            </template>
        </ul>
    </div>
    </transition>
</template>

<script>
    var utils = require('../utils/utils');
    var navigator = require('./vue-navigator.vue');
    var loader = require('../vue-components-loader');
    var methods = {
    };
    utils.animation.process(methods);
    module.exports = {
        module:'/menu-second',
        data:function(){
            var that = this;
            var menu_id = this.$route.query.menu_id;
            return {
                WINHEIGHT:window.HEIGHT,
                menus:function(){
                    var menus = loader.getMenu() , sub = [];

                    menus.forEach(function(item){
                        if(item['menu_parent_id'] == menu_id)
                            sub.push(item);
                        if(item['menu_id'] == menu_id)
                            setTimeout(function(){
                                that.menu_title = item['menu_title'];
                            },10);
                    });
                    return sub;
                }(),
                menu_title:''
            };
        },
        methods:methods,
        components:{navigator:navigator},
        mounted:function(){
            $(this.$el).css('min-height',window.HEIGHT);
        }
    };
</script>

<style lang="sass" >
    @import "../../../stylesheets/vue-styles/menu-second.scss";
</style>