<template>
    <transition v-on:before-enter="beforeEnter" v-on:after-enter="afterEnter"
                v-on:enter="enter"
                v-on:leave="leave"
                v-bind:css="false">
    <div class="router-view" >
        <navigator navigator-title="学生考勤查询" navigatorRightBtn="过滤" :on-navigator-right-btn-click="onNavigatorRightBtnClick"></navigator>
        <div class="list-panel-container">
            <ul class="list-panel">
                <li v-for="item in items">
                    <p>学生rfid：{{item.rfid}}</p>
                    <p>学生姓名：{{item.stu_name}}</p>
                    <p>考勤类型：{{item.type == 1?'进校':'出校'}}</p>
                    <p>考勤时间：{{Calendar.getInstance(item.create_time).format('yyyy年MM月dd日 HH时mm分ss秒')}}</p>
                </li>
            </ul>
            <pagination :cur="c" :all="a" :on-pagination-callback="paginationCallback" ></pagination>
        </div>
        <popup :show="show" v-on:show="setShow">
            <div class="condition-wrap">
                <div class="condition-form-group">
                    <label>关键字：</label>
                    <input class="form-control" type="text" id='key' v-model="key" />
                </div>
                <div class="condition-form-group">
                    <label>开始时间：</label>
                    <input class="form-control" type="text" id='starttime' :value="starttime" readonly/>
                </div>
                <div class="condition-form-group">
                    <label>结束时间：</label>
                    <input class="form-control" type="text" id='endtime' :value="endtime" readonly/>
                </div>
                <div class="condition-form-btn-group">
                    <span class="condition-button" v-on:click="doSearch">确定</span>
                    <span class="condition-button" v-on:click="doCancel">取消</span>
                </div>
            </div>
        </popup>
    </div>
    </transition>
</template>

<script>
    var navigator = require('./vue-navigator.vue');
    var pagination = require('./vue-pagination.vue');
    require('../../libs/lCalendar/LCalendar.min');
    require('../../libs/lCalendar/LCalendar.min.css');
    var popup = require('./vue-popup.vue');
    require('../../libs/calendar');
    var animationUtil = require('../utils/animationUtil');
    var methods = {
        onNavigatorRightBtnClick:function(){
            this.show = true;
        },
        setShow:function(flag){
            this.show = flag;
        },
        paginationCallback:function(cur){
            Events.notify('attence-search-refresh',{key:this.key,page:cur,startdate:Calendar.getInstance(this.starttime).format('yyyyMMdd HH:mm:ss'),
                enddate:Calendar.getInstance(this.endtime).format('yyyyMMdd HH:mm:ss')});
        },
        doSearch:function(){
            var starttime = $('#starttime').val(),
                    endtime = $('#endtime').val();
            this.starttime = starttime;
            this.endtime = endtime;

            Events.notify('attence-search-refresh',{
                key:this.key,
                startdate:Calendar.getInstance(starttime).format('yyyyMMdd HH:mm:ss'),
                enddate:Calendar.getInstance(endtime).format('yyyyMMdd HH:mm:ss'),
            });
            this.show = false;
        },
        doCancel:function(){
            this.show = false;
        }
    };
    animationUtil.process(methods);

    module.exports = {
        module:'/attence-search',
        data:function(){
            return {
                items:[],
                Calendar:Calendar,
                c:1,
                a:2,
                show:false,
                key:'',
                starttime:Calendar.getInstance().add(Calendar.MONTH,-1).format('yyyy-MM-dd 00:00:00'),
                endtime:Calendar.getInstance().format('yyyy-MM-dd 23:59:59')
            }
        },
        methods:methods,
        components:{navigator:navigator,pagination:pagination,popup:popup},
        mounted :function(){
            var that = this;
            $(this.$el).height($(window).height()+'px');
            var calendar = new LCalendar();
            calendar.init({
                'trigger': '#starttime',//标签id
                'type': 'datetime',//date 调出日期选择 datetime 调出日期时间选择 time 调出时间选择 ym 调出年月选择
                'minDate':'1900-1-1'
            });
            var calendar2 = new LCalendar();
            calendar2.init({
                'trigger': '#endtime',//标签id
                'type': 'datetime',//date 调出日期选择 datetime 调出日期时间选择 time 调出时间选择 ym 调出年月选择
                'minDate':'1900-1-1'
            });
            Events.subscribe('attence-search-refresh',function(param){
                var _p = $.extend({},{page:1,rows:10},param);
                $.loading();
                $.get('/attence/search',_p,function(data){
                    that.items = data.data.rows;
                    that.c = _p.page;
                    that.a = data.data.total == 0?1:Math.ceil(data.data.total/10);
                    $.unloading();
                });
            }).notify('attence-search-refresh',{startdate:Calendar.getInstance(that.starttime).format('yyyyMMdd HH:mm:ss'),
                enddate:Calendar.getInstance(that.endtime).format('yyyyMMdd HH:mm:ss')});
        },
        destroyed:function(){
            Events.unsubscribe('attence-search-refresh');
        }
    };
</script>

<style lang="sass" scoped>
    @import "../../../stylesheets/vue-styles/condition.scss";
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