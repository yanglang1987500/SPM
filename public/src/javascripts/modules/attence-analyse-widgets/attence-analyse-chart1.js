/**
 * Created by yanglang on 2016/4/13.
 * 迟到分析 饼图 angle
 */

var AttenceAnalyse = require('./../attence-analyse');

var chartConfig = require('../framework/framework-chartconfig');
var AttenceAnalyseModule1 = function () {};

//继承自作业分析类
AttenceAnalyseModule1.prototype = $.extend({}, AttenceAnalyse);
AttenceAnalyseModule1.prototype.id = 'attence-analyse-chart1';

AttenceAnalyseModule1.prototype.init = function (options) {
    var that = this;
    this.options = $.extend({}, options);
    that.setTitle('迟到比例');
    this.myChart = echarts.init(this.options.container[0]);
    Events.subscribe('onRefresh:attence-analyse',function(option){
        $.extend(option,{type:1,action:'001'});
        that.refreshChart(option);
    });

};

AttenceAnalyseModule1.prototype.refreshChart = function (option) {
    var that = this;
    this.query('/attence/analyse', option, function (ret) {
        if(!ret.success){
            that.toast(ret.message);
            return;
        }
        var results = ret.data,data = [],legends = [];
        for(var i = 0;i<results.length;i++){
            data.push({value:results[i].cnt,name:results[i].isout==1?'迟到':'正常',isout:results[i].isout});
            legends.push(results[i].isout==1?'迟到':'正常');
        }
        that.myChart.setOption(
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
};

AttenceAnalyseModule1.prototype.resize = function () {
    this.myChart.resize();
};

var attenceAnalyseModule1 = new AttenceAnalyseModule1();


module.exports = attenceAnalyseModule1;