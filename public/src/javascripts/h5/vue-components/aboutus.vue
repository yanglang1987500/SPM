<template>
    <transition v-on:before-enter="beforeEnter" v-on:after-enter="afterEnter"
                v-on:enter="enter"
                v-on:leave="leave"
                v-on:before-leave="beforeLeave"
                v-bind:css="false">
    <div class="router-view" id="aboutus-container"  :style="'height:'+WINHEIGHT+'px'">
        <navigator navigator-title="关于我们" ></navigator>
        <div class="content-wrap">
            <img src="../../../images/aboutus.png">
            <p>该平台提供智能门禁与学生考勤系统、智能报修与投诉处理系统、学校信息发布与家校互通系统等功能 </p>
        </div>
    </div>
    </transition>
</template>

<script>
    var navigator = require('./vue-navigator.vue');
    var utils = require('../utils/utils');

    var methods = {
    };
    utils.animation.process(methods);
    module.exports = {
        module:'/aboutus',
        data:function(){
            return {WINHEIGHT:window.HEIGHT};
        },
        methods:methods,
        components:{navigator:navigator},
        mounted:function() {
            this.WINHEIGHT = window.HEIGHT;
        }
    };
</script>

<style lang="sass" rel="stylesheet/scss" scoped>
    #aboutus-container{
        .content-wrap{
            text-align: center;
            padding:.5rem;
            p{
                text-align: left;
                font-size:.35rem;
                line-height: 1.5;
                text-indent: .3rem;
            }
        }
    }

</style>