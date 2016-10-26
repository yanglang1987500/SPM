<template>
    <transition v-on:before-enter="beforeEnter" v-on:after-enter="afterEnter"
                v-on:enter="enter"
                v-on:leave="leave"
                v-on:before-leave="beforeLeave"
                v-bind:css="false">
    <div class="router-view" id="aboutus-container"  :style="'height:'+WINHEIGHT+'px'">
        <navigator navigator-title="关于我们" ></navigator>
        <div class="content-wrap">
            <p>该平台提供智能门禁与学生考勤系统、智能报修与投诉处理系统、学校信息发布与家校互通系统等功能 </p>
        </div>
    </div>
    </transition>
</template>

<script>
    import navigator from './vue-navigator.vue';
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

<style lang="sass" scoped>
    #aboutus-container{
        .content-wrap{
            padding:.5rem;
            p{
                font-size:.35rem;
                line-height: 1.5;
                text-indent: .3rem;
            }
        }
    }

</style>