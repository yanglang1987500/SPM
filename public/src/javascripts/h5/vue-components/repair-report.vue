<template>
    <transition v-on:before-enter="beforeEnter" v-on:after-enter="afterEnter"
                v-on:enter="enter"
                v-on:leave="leave"
                v-bind:css="false">
    <div class="router-view"  >
        <navigator navigator-title="学生考勤分析" navigator-right-btn="设置" :on-navigator-right-btn-click="onNavigatorRightBtnClick"></navigator>
        <div>
            <router-link to="/attence-search"><li class="menu-list-item fa fa-paw" ><span>学生考勤查询</span></li></router-link>
        </div>
    </div>
    </transition>
</template>

<script>
    var navigator = require('./vue-navigator.vue');
    var animationUtil = require('../utils/animationUtil');
    var methods = {
        onNavigatorRightBtnClick:function(){
            Router.push('/attence-search');
        }
    };
    animationUtil.process(methods);
    module.exports = {
        module:'/attence-analyse',
        data:function(){
            return {
            }
        },
        methods:methods,
        components:{navigator:navigator},
        activate:function(){
            console.log('aaa');
        }
    };
</script>

<style lang="sass" scoped>
    .router-view{
    }
</style>