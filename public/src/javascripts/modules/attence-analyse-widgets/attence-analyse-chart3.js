/**
 * Created by yanglang on 2016/4/13.
 * 按时间段进行迟到早退统计分析 柱状图
 */

var AttenceAnalyse = require('./../attence-analyse');
var chartConfig = require('../framework/framework-chartconfig');
var AttenceAnalyseModule3 = function () {};

//继承自作业分析类
AttenceAnalyseModule3.prototype = $.extend({}, AttenceAnalyse);
AttenceAnalyseModule3.prototype.id = 'attence-analyse-chart3';

AttenceAnalyseModule3.prototype.init = function (options) {
    var that = this;
    this.options = $.extend({}, options);
    that.setTitle('按时间段进行迟到早退统计分析');
    require.ensure([],function(){
        var echarts = require('../../libs/echarts.min');
        that.myChart = echarts.init(that.options.container[0]);
    });
    Events.subscribe('onRefresh:attence-analyse',function(option){
        $.extend(option,{action:'002'});
        var callee = arguments.callee, context = this;
        if(that.myChart)
            that.refreshChart(option);
        else
            setTimeout(function(){
                callee.call(context,option);
            },100);
    });
};

AttenceAnalyseModule3.prototype.refreshChart = function (option) {
    var that = this;
    this.query('/attence/analyse', option, function (ret) {
        if(!ret.success){
            that.toast(ret.message);
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
        that.myChart.setOption({
            color: ['#3398DB', '#969696'],
            backgroundColor: chartConfig.BGCOLOR,
            title: {
                text: '时间段迟到早退统计分析',
                left: 'center',
                top: 20,
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
                left: '3%',
                right: '4%',
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
};

AttenceAnalyseModule3.prototype.resize = function () {
    this.myChart && this.myChart.resize();
};

var attenceAnalyseModule1 = new AttenceAnalyseModule3();


module.exports = attenceAnalyseModule1;