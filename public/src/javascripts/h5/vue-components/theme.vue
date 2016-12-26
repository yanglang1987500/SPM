<template>
    <transition v-on:before-enter="beforeEnter" v-on:after-enter="afterEnter"
                v-on:enter="enter"
                v-on:leave="leave"
                v-on:before-leave="beforeLeave"
                v-bind:css="false">
    <div class="router-view" id="theme-container"  :style="'min-height:'+WINHEIGHT+'px'">
        <navigator navigator-title="主题设置" ></navigator>
        <div class="content-wrap">
            <ul class="theme-list">
                <li class="theme-item actived" data-value='theme1'><img src="../../../images/framework/bg/h5bg1_overview.jpg"></li>
                <li class="theme-item" data-value='theme2'><img src="../../../images/framework/bg/h5bg2_overview.jpg"></li>
                <li class="theme-item" data-value='theme3'><img src="../../../images/framework/bg/h5bg3_overview.jpg"></li>
                <li class="theme-item" data-value='theme4'><img src="../../../images/framework/bg/h5bg4_overview.jpg"></li>
                <li class="theme-item" data-value='theme5'><img src="../../../images/framework/bg/h5bg5_overview.jpg"></li>
                <li class="theme-item" data-value='theme6'><img src="../../../images/framework/bg/h5bg6_overview.jpg"></li>
            </ul>
        </div>
    </div>
    </transition>
</template>

<script>
    var navigator = require('./vue-navigator.vue');
    var utils = require('../utils/utils');
    var THEME_KEY = '_H5_THEME_KEY_';
    var methods = {
    };
    utils.animation.process(methods);
    module.exports = {
        module:'/theme',
        data:function(){
            return {WINHEIGHT:window.HEIGHT};
        },
        methods:methods,
        components:{navigator:navigator},
        mounted:function() {
            var theme;
            if(theme = localStorage.getItem(THEME_KEY)){
                $('.theme-item').removeClass('actived');
                $('.theme-item[data-value='+theme+']').addClass('actived');
            }
            this.WINHEIGHT = window.HEIGHT;
            $('.theme-item').click(function(){
                var $this = $(this);
                var theme = $this.attr('data-value');
                $('body').removeClass(function(index ,oldClass){return oldClass;}).addClass(theme);
                $this.parent().find('li').removeClass('actived');
                $this.addClass('actived');
                localStorage.setItem(THEME_KEY,theme);
            });
        }
    };
</script>

<style lang="sass" rel="stylesheet/scss" scoped>
    #theme-container{
        .content-wrap{
            text-align: center;
            padding:.5rem;
            .theme-list{
                &:after{
                    content:'';
                    width:3rem;
                    display:inline-block;
                }
                list-style: none;
                text-align: justify;
                font-size:0;
                .theme-item{
                    margin-bottom:.3rem;
                    display:inline-block;
                    position:relative;
                    &.actived:before{
                        content:'';
                        position:absolute;
                         width:0;
                         height:0;
                         border-width:.6rem .6rem 0 0;
                         border-style:solid;
                         border-color: #5ab45a transparent transparent transparent;
                        left:0;
                        top:0;
                     }
                    img{
                        width:3rem;
                        box-shadow:0 0 .15rem rgba(0,0,0,.2);
                    }
                }
            }
        }
    }

</style>