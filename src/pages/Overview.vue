<template>
    <el-row class="over-view-component">
        <el-col :span="24" class="data-header">
            <p class="title">大话西游周边商城数据可视化展示</p>
        </el-col>
        <!-- row_one begin -->
        <el-row :gutter="20" class="data-content-first">
            <el-col :xs="24" :lg="10" class="first-left">
                <div class="grid-content">
                    <p class="title">统计数据</p>
                    <el-row>
                        <el-col :span="12" class="border_right">
                            <div class="grid-content">
                                <div class="order_num">
                                    <p class="subTitle">下单数量</p>
                                    <div class="order_con">{{order_num}}</div>
                                </div>
                            </div>
                            </el-col>
                        <el-col :span="12">
                            <div class="grid-content">
                                <div class="grid-content">
                                <div class="order_num">
                                    <p class="subTitle">销售金额</p>
                                    <div class="order_con">{{order_money}}</div>
                                </div>
                            </div>
                            </div>
                        </el-col>
                    </el-row>
                </div>
            </el-col>
            <el-col :xs="24" :lg="13" class="first-right">
                <div class="grid-content">
                    <p class="title">销量统计折线图</p>
                    <div id="zhexian" :style="{width: '100%', height: '300px'}"></div>
                </div>
            </el-col>
        </el-row>
        <!-- row_one end -->
        <!-- row_two begin -->
        <el-row :gutter="20" class="data-content-sec">
            <el-col :xs="24" :md="12" :lg="5">
                <div class="grid-content">
                    <p class="title">消费群体</p>
                    <div id="consumer" :style="{width: '100%', height: '100%'}"></div>
                </div>
            </el-col>
            <el-col :xs="24" :md="12" :lg="7">
                <div class="grid-content">
                    <p class="title">访客来源统计</p>
                    <div id="visitor" :style="{width: '90%', height: '100%'}"></div>
                </div>
            </el-col>
            <el-col :xs="24" :md="12" :lg="7">
                <div class="grid-content">
                    <p class="title">热销商品类型统计</p>
                    <div id="hotSale" :style="{width: '100%', height: '100%'}"></div>
                </div>
            </el-col>
            <el-col :xs="24" :md="12" :lg="5">
                <div class="grid-content">
                    <p class="title">客户反馈类型统计</p>
                    <div id="feedback" :style="{width: '100%', height: '100%'}"></div>
                </div>
            </el-col>
        </el-row>
        <!-- row_two end -->
    </el-row>
</template>

<script>
export default {
    name: 'overView',
    data () {
        return {
            msg: 'Welcome to Your Vue.js App',
            order_num:'999',
            order_money:'19999'
        }
    },

    mounted(){
        this.zhexian();
        this.hotSale();
        this.visitor();
        this.consumer();
        this.feedback();
    },
    methods: {
        // 销售折线图
        zhexian(){
            let myChart  = this.$echarts.init(document.getElementById('zhexian'));
            var xAxisData = [];
            var data1 = [];
            var data2 = [];
            for (var i = 1; i <366; i++) {
                xAxisData.push('类目' + i);
                data1.push((Math.sin(i / 5) * (i / 5 -10) + i / 6) * 5);
                data2.push((Math.cos(i / 5) * (i / 5 -10) + i / 6) * 5);
            }
            myChart.setOption({
                title: {
                    // text: '柱状图动画延迟'
                },
                legend: {
                    data: ['今年', '去年'],
                    textStyle:{
                        color:'#fff'
                    }
                },
                toolbox: {
                    // y: 'bottom',
                    feature: {
                        magicType: {
                            type: ['stack', 'tiled']
                        },
                        dataView: {},
                        saveAsImage: {
                            pixelRatio: 2
                        }
                    }
                },
                tooltip: {},
                xAxis: {
                    data: xAxisData,
                    splitLine: {
                        show: false
                    }
                },
                yAxis: {
                },
                series: [{
                    name: '今年',
                    type: 'bar',
                    data: data1,
                    animationDelay: function (idx) {
                        return idx * 10;
                    }
                }, {
                    name: '去年',
                    type: 'bar',
                    data: data2,
                    animationDelay: function (idx) {
                        return idx * 10 + 100;
                    }
                }],
                animationEasing: 'elasticOut',
                animationDelayUpdate: function (idx) {
                    return idx * 5;
                }
            });
        },
        // 消费群体
        consumer(){
            let myChart  = this.$echarts.init(document.getElementById('consumer'));
            myChart.setOption({
                title: {
                    subtext: '数据来自后台统计'
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                legend: {
                    data: ['男性', '女性'],
                    textStyle:{
                        color:'#fff'
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: {
                    type: 'value',
                    boundaryGap: [0, 0.01]
                },
                yAxis: {
                    type: 'category',
                    data: ['18岁以下', '18~25岁', '25~35岁', '35~45岁', '45岁以上']
                },
                series: [
                    {
                        name: '女性',
                        type: 'bar',
                        data: [ 23489, 29034,630230,104970, 131744]
                    },
                    {
                        name: '男性',
                        type: 'bar',
                        data: [ 23438, 31000,681807,121594, 134141]
                    }
                ]
            })
        },
        // 访客来源统计
        visitor(){
            let myChart  = this.$echarts.init(document.getElementById('visitor'));
            myChart.setOption({
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b}: {c} ({d}%)'
                },
                legend: {
                    orient: 'vertical',
                    left: 10,
                    data: ['直达', '营销广告', '搜索引擎', '邮件营销', '联盟广告', '视频广告', '百度', '谷歌', '必应', '其他']
                },
                series: [
                    {
                        name: '访问来源',
                        type: 'pie',
                        selectedMode: 'single',
                        radius: [0, '30%'],

                        label: {
                            position: 'inner'
                        },
                        labelLine: {
                            show: false
                        },
                        data: [
                            {value: 335, name: '直达', selected: true},
                            {value: 679, name: '营销广告'},
                            {value: 1548, name: '搜索引擎'}
                        ]
                    },
                    {
                        name: '访问来源',
                        type: 'pie',
                        radius: ['40%', '55%'],
                        label: {
                            formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
                            backgroundColor: '#eee',
                            borderColor: '#aaa',
                            borderWidth: 1,
                            borderRadius: 4,
                            // shadowBlur:3,
                            // shadowOffsetX: 2,
                            // shadowOffsetY: 2,
                            // shadowColor: '#999',
                            // padding: [0, 7],
                            rich: {
                                a: {
                                    color: '#999',
                                    lineHeight: 22,
                                    align: 'center'
                                },
                                // abg: {
                                //     backgroundColor: '#333',
                                //     width: '100%',
                                //     align: 'right',
                                //     height: 22,
                                //     borderRadius: [4, 4, 0, 0]
                                // },
                                hr: {
                                    borderColor: '#aaa',
                                    width: '100%',
                                    borderWidth: 0.5,
                                    height: 0
                                },
                                b: {
                                    fontSize: 16,
                                    lineHeight: 33
                                },
                                per: {
                                    color: '#eee',
                                    backgroundColor: '#334455',
                                    padding: [2, 4],
                                    borderRadius: 2
                                }
                            }
                        },
                        data: [
                            {value: 335, name: '直达'},
                            {value: 310, name: '邮件营销'},
                            {value: 234, name: '联盟广告'},
                            {value: 135, name: '视频广告'},
                            {value: 1048, name: '百度'},
                            {value: 251, name: '谷歌'},
                            {value: 147, name: '必应'},
                            {value: 102, name: '其他'}
                        ]
                    }
                ]
            })
        },
        // 热销商品饼状图
        hotSale(){
            let myChart  = this.$echarts.init(document.getElementById('hotSale'));
            myChart.setOption({
                    title: {
                        top: 20,
                        textStyle: {
                            color: '#ccc'
                        }
                    },
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b} : {c} ({d}%)'
                },
                visualMap: {
                    show: false,
                    min: 80,
                    max: 600,
                    inRange: {
                        colorLightness: [0, 1]
                    }
                },
                series: [
                    {
                        name: '访问来源',
                        type: 'pie',
                        radius: '55%',
                        center: ['50%', '50%'],
                        data: [
                            {value: 335, name: '家用电器'},
                            {value: 310, name: '电子产品'},
                            {value: 274, name: '美妆'},
                            {value: 235, name: '其他'},
                            {value: 400, name: '衣服'}
                        ].sort(function (a, b) { return a.value - b.value; }),
                        roseType: 'radius',
                        label: {
                            color: 'rgba(255, 255, 255, 0.3)'
                        },
                        labelLine: {
                            lineStyle: {
                                color: 'rgba(255, 255, 255, 0.3)'
                            },
                            smooth: 0.2,
                            length: 10,
                            length2: 20
                        },
                        itemStyle: {
                            color: '#c23531',
                            shadowBlur: 200,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        },

                        animationType: 'scale',
                        animationEasing: 'elasticOut',
                        animationDelay: function (idx) {
                            return Math.random() * 200;
                        }
                    }
                ]
            })
        },
        // 客户反馈类型统计
        feedback(){
            let myChart  = this.$echarts.init(document.getElementById('feedback'));
            var labelRight = {
                position: 'right'
            };
            myChart.setOption({
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                grid: {
                    top: 80,
                    bottom: 30
                },
                xAxis: {
                    type: 'value',
                    position: 'top',
                    splitLine: {
                        lineStyle: {
                            type: 'dashed'
                        }
                    }
                },
                yAxis: {
                    type: 'category',
                    axisLine: {show: false},
                    axisLabel: {show: false},
                    axisTick: {show: false},
                    splitLine: {show: false},
                    data: ['ten', 'nine', 'eight', 'seven', 'six', 'five', 'four', 'three', 'two', 'one']
                },
                series: [
                    {
                        name: '生活费',
                        type: 'bar',
                        stack: '总量',
                        label: {
                            show: true,
                            formatter: '{b}'
                        },
                        data: [
                            {value: -0.07, label: labelRight},
                            {value: -0.09, label: labelRight},
                            0.2, 0.44,
                            {value: -0.23, label: labelRight},
                            0.08,
                            {value: -0.17, label: labelRight},
                            0.47,
                            {value: -0.36, label: labelRight},
                            0.18
                        ]
                    }
                ]
            })
        }
    }
}
</script>

<style scoped lang="less">
    .over-view-component{
        background:#020913;
        .title{
            color: #fff;
        }
        .data-content-first{
            padding:0 20px;
            height: 400px;
            color: #fff;
            display: flex;
            justify-content: space-around;
            align-items: center;
            .title{
                margin:0;
                text-align: left;
                height: 44px;
                background: #03305a;
                line-height: 44px;
                font-size: 14px;
                padding-left: 20px;
            }
            .border_right{
                background: url(../images/center_line.png) no-repeat right center;
                height: 201px;
            }
            .first-left{
                height: 100%;
                border:1px solid #0078d5;
            }
            .first-right{
                height: 100%;
                border:1px solid #0078d5;
            }
        }
        .data-content-sec{
            padding:0 20px;
            .grid-content{
                border:1px solid #0078d5;
                height: 536px;
                margin-top:20px;
                .title{
                    margin:0;
                    text-align: left;
                    height: 44px;
                    background: #03305a;
                    line-height: 44px;
                    font-size: 14px;
                    padding-left: 20px;
                }
            }
        }
    }
</style>