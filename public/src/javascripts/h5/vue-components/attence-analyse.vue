<template>
    <transition v-on:before-enter="beforeEnter" v-on:after-enter="afterEnter"
                v-on:enter="enter"
                v-on:leave="leave"
                v-bind:css="false">
    <div class="router-view" id="attence-analyse" >
        <navigator navigator-title="学生考勤分析" navigatorRightBtn="过滤" :on-navigator-right-btn-click="onNavigatorRightBtnClick"></navigator>
        <div>
            <div class="chart-container" id="attence-analyse-chart1"></div>
            <div class="chart-container" id="attence-analyse-chart2"></div>
            <div class="chart-container" id="attence-analyse-chart3"></div>
        </div>
        <router-link to="/attence-search">查询</router-link>
        <popup :show="show" v-on:show="setShow">
            <div class="condition-wrap">
                <div class="condition-form-group">
                    <label>开始时间：</label>
                    <input class="form-control" type="text" id='startdate' :value="startdate" readonly/>
                </div>
                <div class="condition-form-group">
                    <label>结束时间：</label>
                    <input class="form-control" type="text" id='enddate' :value="enddate" readonly/>
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
    require('../../libs/lCalendar/LCalendar.min');
    require('../../libs/lCalendar/LCalendar.min.css');
    var popup = require('./vue-popup.vue');
    var animationUtil = require('../utils/animationUtil');
    var chartConfig = require('../utils/framework-chartconfig');
    var echarts = null;
    var methods = {
        onNavigatorRightBtnClick:function(){
            this.show = true;
        },
        setShow:function(flag){
            this.show = flag;
        },
        doSearch:function(){
            var startdate = $('#startdate').val(),
                enddate = $('#enddate').val();
            this.startdate = startdate;
            this.enddate = enddate;

            initChart.apply(this,[{
                startdate:startdate.replace(/-/gi,''),
                enddate:enddate.replace(/-/gi,''),
            }]);
            this.show = false;
        },
        doCancel:function(){
            this.show = false;
        }
    };
    animationUtil.process(methods);
    module.exports = {
        module:'/attence-analyse',
        data:function(){
            return {
                show:false,
                startdate:Calendar.getInstance().add(Calendar.MONTH,-3).format('yyyy-MM-dd'),
                enddate:Calendar.getInstance().format('yyyy-MM-dd')
            }
        },
        methods:methods,
        components:{navigator:navigator,popup:popup},
        mounted:function(){
            var that = this;
            $.loading();
            var calendar = new LCalendar();
            calendar.init({
                'trigger': '#startdate',//标签id
                'type': 'date',//date 调出日期选择 datetime 调出日期时间选择 time 调出时间选择 ym 调出年月选择
                'minDate':'1900-1-1'
            });
            var calendar2 = new LCalendar();
            calendar2.init({
                'trigger': '#enddate',//标签id
                'type': 'date',//date 调出日期选择 datetime 调出日期时间选择 time 调出时间选择 ym 调出年月选择
                'minDate':'1900-1-1'
            });
            require.ensure([],function(){
                echarts = require('../../libs/echarts.min');
                setTimeout(function(){
                    initChart.apply(that,[{
                        startdate:that.startdate.replace(/-/gi,''),
                        enddate:that.enddate.replace(/-/gi,''),
                    }]);
                },500);
            });
        }
    };

    function initChart(params){
        var that = this;
        params = params || {};

        //图1
        that.chart1 = echarts.init($('#attence-analyse-chart1')[0]);
        $.get('/attence/analyse', $.extend(params,{type:1,action:'001'}), function (ret) {
            $.unloading();
            if(!ret.success){
                alert(ret.message);
                return;
            }
            var results = ret.data,data = [],legends = [];
            for(var i = 0;i<results.length;i++){
                data.push({value:results[i].cnt,name:results[i].isout==1?'迟到':'正常',isout:results[i].isout});
                legends.push(results[i].isout==1?'迟到':'正常');
            }
            that.chart1.setOption(
                    {
                        color:['#009587','#FE5621'],
                        backgroundColor: chartConfig.BGCOLOR,
                        title: {
                            text: '迟到比例',
                            left: 'center',
                            top: 20,
                            textStyle:  chartConfig.TITLE_STYLE
                        },
                        legend: {
                            orient: 'vertical',
                            x: '10',
                            y:'10',
                            data:legends,
                            textStyle: chartConfig.LEGEND_STYLE
                        },
                        tooltip : {
                            trigger: 'item',
                            formatter: "{a} <br/>{b} : {c} ({d}%)"
                        },
                        series : [
                            {
                                name:'迟到比例',
                                type:'pie',
                                roseType: 'angle',
                                radius : '55%',
                                center: chartConfig.CHART_CENTER,
                                data:data.sort(function (a, b) { return a.isout - b.isout}),
                                label: {
                                    normal: {
                                        textStyle: {
                                            color: '#ffffff'
                                        }
                                    }
                                },
                                labelLine: {
                                    normal: {
                                        lineStyle: {
                                            color: '#ffffff'
                                        },
                                        smooth: 0.2,
                                        length: 10,
                                        length2: 20
                                    }
                                }
                            }
                        ]
                    });
        });

        //图2
        that.chart2 = echarts.init($('#attence-analyse-chart2')[0]);
        $.get('/attence/analyse', $.extend(params,{type:0,action:'001'}), function (ret) {
            $.unloading();
            if(!ret.success){
                alert(ret.message);
                return;
            }
            var results = ret.data,data = [],legends = [];
            for(var i = 0;i<results.length;i++){
                data.push({value:results[i].cnt,name:results[i].isout==1?'早退':'正常',isout:results[i].isout});
                legends.push(results[i].isout==1?'早退':'正常');
            }
            that.chart2.setOption(
                    {
                        color:['#3498DB','#E74C3C'],
                        backgroundColor: chartConfig.BGCOLOR,
                        title: {
                            text: '早退比例',
                            left: 'center',
                            top: 20,
                            textStyle: chartConfig.TITLE_STYLE
                        },
                        legend: {
                            orient: 'vertical',
                            x: '10',
                            y:'10',
                            data:legends,
                            textStyle: chartConfig.LEGEND_STYLE
                        },
                        tooltip : {
                            trigger: 'item',
                            formatter: "{a} <br/>{b} : {c} ({d}%)"
                        },
                        series : [
                            {
                                name:'早退比例',
                                type:'pie',
                                radius : ['25%','55%'],
                                center: chartConfig.CHART_CENTER,
                                data:data.sort(function (a, b) { return a.isout - b.isout}),
                                label: {
                                    normal: {
                                        textStyle: {
                                            color: '#ffffff'
                                        }
                                    }
                                },
                                labelLine: {
                                    normal: {
                                        lineStyle: {
                                            color: '#ffffff'
                                        },
                                        smooth: 0.2,
                                        length: 10,
                                        length2: 20
                                    }
                                }
                            }
                        ]
                    });
        });

        //图3
        that.chart3 = echarts.init($('#attence-analyse-chart3')[0]);
        $.get('/attence/analyse', $.extend(params,{action:'002'}), function (ret) {
            $.unloading();
            if(!ret.success){
                alert(ret.message);
                return;
            }
            var results = ret.data,dims = [],chidaoData = [], normal1Data = [], zaotuiData = [], normal2Data = [];
            for(var i = 0;i<results.length;i++){
                dims.push(results[i].date);
                (results[i].type == 1 && results[i].isout == 1) && (chidaoData.push(results[i].cnt));
                (results[i].type == 1 && results[i].isout == 0) && (normal1Data.push(results[i].cnt));
                (results[i].type == 0 && results[i].isout == 1) && (zaotuiData.push(results[i].cnt));
                (results[i].type == 0 && results[i].isout == 0) && (normal2Data.push(results[i].cnt));
            }
            that.chart3.setOption({
                color: ['#3398DB', '#969696'],
                backgroundColor: chartConfig.BGCOLOR,
                title: {
                    text: '时间段迟到早退统计分析',
                    left: 'center',
                    top: 40,
                    textStyle: chartConfig.TITLE_STYLE
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                legend:{
                    top:10,
                    x:10,
                    y:10,
                    data:['迟到','正常上学','早退','正常放学'],
                    textStyle: chartConfig.LEGEND_STYLE
                },
                grid: {
                    left: '0%',
                    right: '8%',
                    top:'30%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: [
                    {
                        type: 'category',
                        data: dims,
                        axisTick: {
                            alignWithLabel: true
                        },
                        axisLabel :{
                            textStyle:{
                                color:"#ffffff"

                            }
                        }
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        axisLabel:
                        {
                            textStyle:{
                                color:"#ffffff"

                            }
                        }
                    }
                ],
                series: [
                    {
                        name: '迟到',
                        type: 'bar',
                        data: chidaoData,
                        itemStyle:{
                            normal:{
                                color:'#FE5621'
                            }
                        }
                    },

                    {
                        name: '正常上学',
                        type: 'bar',
                        data: normal1Data,
                        itemStyle:{
                            normal:{
                                color:'#009587'
                            }
                        }
                    },
                    {
                        name: '早退',
                        type: 'bar',
                        data: zaotuiData,
                        itemStyle:{
                            normal:{
                                color:'#E74C3C'
                            }
                        }
                    },
                    {
                        name: '正常放学',
                        type: 'bar',
                        data: normal2Data,
                        itemStyle:{
                            normal:{
                                color:'#3498DB'
                            }
                        }
                    }
                ]
            });
        });
    }
</script>

<style lang="sass" scoped>
    @import "../../../stylesheets/vue-styles/condition.scss";
    #attence-analyse{
        .chart-container{
            height:5rem;
            width:100%;
        }
        #attence-analyse-chart3{
            height:6rem;
        }
    }
</style>