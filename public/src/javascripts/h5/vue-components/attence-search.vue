<template>
    <transition v-on:before-enter="beforeEnter"
                v-on:enter="enter"
                v-on:leave="leave"
                v-bind:css="false">
    <div class="router-view"  >
        <navigator navigator-title="学生考勤查询" ></navigator>
    </div>
    </transition>
</template>

<script>
    var navigator = require('./navigator.vue');

    var animationUtil = require('../utils/animationUtil');
    var methods = {
        onNavigatorRightBtnClick:function(){
            Router.push('/foo');
        }
    };
    animationUtil.process(methods);
    module.exports = {
        module:'/attence-search',
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