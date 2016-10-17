<template>
    <transition v-on:before-enter="beforeEnter" v-on:after-enter="afterEnter"
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
            <pagination :cur.sync="1" :all.sync="100" :on-pagination-callback="paginationCallback" ></pagination>
        </div>
    </div>
    </transition>
</template>

<script>
    var navigator = require('./vue-navigator.vue');
    var pagination = require('./vue-pagination.vue');
    require('../../libs/calendar');
    var animationUtil = require('../utils/animationUtil');
    var methods = {
        onNavigatorRightBtnClick:function(){
            Router.push('/foo');
        },
        paginationCallback:function(cur){
            Events.notify('attence-search-refresh',{page:cur});
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
        components:{navigator:navigator,pagination:pagination},
        created :function(){
            var that = this;
            Events.subscribe('attence-search-refresh',function(param){
                var _p = $.extend({},{page:1,rows:10},param);
                $.loading();
                $.get('/attence/search',_p,function(data){
                    that.items = data.data.rows;
                    $.unloading();
                });
            }).notify('attence-search-refresh');
        },
        destroyed:function(){
            Events.unsubscribe('attence-search-refresh');
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