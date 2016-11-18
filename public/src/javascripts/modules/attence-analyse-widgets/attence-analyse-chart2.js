/**
 * Created by yanglang on 2016/4/13.
 * 早退比例 饼图
 */

var AttenceAnalyse = require('./../attence-analyse');
var chartConfig = require('../framework/framework-chartconfig');
var AttenceAnalyseModule2 = function () {};

//继承自作业分析类
AttenceAnalyseModule2.prototype = $.extend({}, AttenceAnalyse);
AttenceAnalyseModule2.prototype.id = 'attence-analyse-chart2';

AttenceAnalyseModule2.prototype.init = function (options) {
    var that = this;
    this.options = $.extend({}, options);
    that.setTitle('早退比例');
    require.ensure([],function(){
        var echarts = require('../../libs/echarts.min');
        that.myChart = echarts.init(that.options.container[0]);
    });
    Events.subscribe('onRefresh:attence-analyse',function(option){
        $.extend(option,{type:0,action:'001'});
        var callee = arguments.callee, context = this;
        if(that.myChart)
            that.refreshChart(option);
        else
            setTimeout(function(){
                callee.call(context,option);
            },100);
    });
};

AttenceAnalyseModule2.prototype.refreshChart = function (option) {
    var that = this;
    this.query('/attence/analyse', option, function (ret) {
        if(!ret.success){
            that.toast(ret.message);
            return;
        }
        var results = ret.data,data = [],legends = [];
        for(var i = 0;i<results.length;i++){
            data.push({value:results[i].cnt,name:results[i].isout==1?'早退':'正常',isout:results[i].isout});
            legends.push(results[i].isout==1?'早退':'正常');
        }
        that.myChart.setOption(
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
};

AttenceAnalyseModule2.prototype.resize = function () {
    this.myChart && this.myChart.resize();
};

var attenceAnalyseModule1 = new AttenceAnalyseModule2();


module.exports = attenceAnalyseModule1;