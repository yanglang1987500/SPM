<template>
    <transition v-on:before-enter="beforeEnter"
                v-on:enter="enter"
                v-on:leave="leave"
                v-bind:css="false">
    <div class="router-view"  >
        <navigator navigator-title="学生考勤查询" ></navigator>
        <div class="list-panel-container">
            <ul class="list-panel">
                <li v-for="item in items">
                    <p>学生rfid：{{item.rfid}}</p>
                    <p>学生姓名：{{item.stu_name}}</p>
                    <p>考勤类型：{{item.type == 1?'进校':'出校'}}</p>
                    <p>考勤时间：{{Calendar.getInstance(item.create_time).format('yyyy年MM月dd日 HH时mm分ss秒')}}</p>
                </li>
            </ul>
        </div>
    </div>
    </transition>
</template>

<script>
    var navigator = require('./navigator.vue');
    require('../../libs/calendar');
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
                items:[],
                Calendar:Calendar
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
    .list-panel-container{
        height: 100%;
        overflow: auto;
        .list-panel{
            li{
                background:#F3F3F3;
                margin-bottom:.3rem;
                font-size: .3rem;
                padding:.4rem .3rem;
                box-shadow:0 .01rem .04rem rgba(0,0,0,.13);
            }
        }
    }
</style>