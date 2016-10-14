<template>
    <transition v-on:before-enter="beforeEnter"
                v-on:enter="enter"
                v-on:leave="leave"
                v-bind:css="false">
    <div class="router-view"  >
        <navigator navigator-title="学生考勤查询" ></navigator>
        <div style="    height: 100%;    overflow: auto;">
            <ul>
                <li v-for="item in items">{{item.stu_name}}</li>
            </ul>
        </div>
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
                items:[]
            }
        },
        methods:methods,
        components:{navigator:navigator},
        created :function(){
            var that = this;
            $.get('/attence/search',function(data){
                that.items = data.data.rows;
            });
        }
    };
</script>

<style lang="sass" scoped>
    .router-view{
    }
</style>