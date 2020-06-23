<template>
    <el-row class="over-view-component">
        <!-- <el-col :span="24" class="data-header">
            <p class="link link--kukuri title" data-letters='大话西游周边商城数据可视化展示'>大话西游周边商城数据可视化展示</p>
        </el-col> -->

        <!-- row_one begin -->
        <el-row :gutter="20" class="data-content-first">
            <el-col :lg="10" class="">
                <div class="grid-content">
                    <div class="first-left">
                        <p class="title">统计数据</p>
                        <!-- <div :style="{width: '100%', height: '300px'}"> -->
                            <el-row :style="{width: '100%', height: '300px'}">
                                <el-col :span="12">
                                    <div class="grid-content left">
                                        <div class="order_num">
                                            <p class="subTitle">下单数量</p>
                                            <div class="order_con">{{order_num}}</div>
                                        </div>
                                    </div>
                                </el-col>
                                <el-col :span="12">
                                    <div class="grid-content right">
                                        <div class="grid-content">
                                        <div class="order_num">
                                            <p class="subTitle">销售金额</p>
                                            <div class="order_con">{{order_money}}</div>
                                        </div>
                                    </div>
                                    </div>
                                </el-col>
                            </el-row>
                        <!-- </div> -->
                        
                    </div>
                </div>
            </el-col>

            <el-col :lg="14" class="">
                <div class="grid-content">
                    <div class="first-right">
                        <p class="title">销量统计折线图</p>
                        <div id="zhexian" :style="{width: '100%', height: '300px'}"></div>
                    </div>
                    
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
                    <div id="visitor" :style="{width: '100%', height: '100%'}"></div>
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
            var data1 = [1850000,1478867,2056078,570861,546231,7777081,4687];
            var data2 = [251670,546781,1154038,5642346,1465795,13300876,554687,1355213,5467954,1020454,19304176,15304876];
            for (var i = 1; i <=12; i++) {
                xAxisData.push(i+'月份');
            }
            myChart.setOption({
                legend: {
                    data: ['今年', '去年'],
                    textStyle:{
                        color:'#333'
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
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                legend: {
                    data: ['男性', '女性'],
                    textStyle:{
                        color:'#333'
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '15%',
                    containLabel: true,
                    height:'400px'
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
                    formatter: '{a} <br/>{b} : {c} ({d}%)'
                },
                legend: {
                    orient: 'vertical',
                    left: 'left',
                    data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
                },
                series: [
                    {
                        name: '访问来源',
                        type: 'pie',
                        radius: '55%',
                        center: ['50%', '60%'],
                        data: [
                            {value: 335, name: '直接访问'},
                            {value: 310, name: '邮件营销'},
                            {value: 234, name: '联盟广告'},
                            {value: 135, name: '视频广告'},
                            {value: 1548, name: '搜索引擎'}
                        ],
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            })
        },
        // 热销商品饼状图
        hotSale(){
            let myChart  = this.$echarts.init(document.getElementById('hotSale'));
            myChart.setOption({
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
                            color: 'rgba(226, 113, 37, 0.8)'
                        },
                        labelLine: {
                            lineStyle: {
                                color: 'rgba(226, 113, 37, 0.8)'
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
                        },
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
                legend: {
                    data: [ '需要改进', '继续保持']
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '15%',
                    containLabel: true,
                    height:'400px'
                },
                xAxis: [
                    {
                        type: 'value'
                    }
                ],
                yAxis: [
                    {
                        type: 'category',
                        axisTick: {
                            show: false
                        },
                        data: ['合作快递', '售后服务', '产品质量', '发货速度', '客服服务']
                    }
                ],
                series: [
                    {
                        name: '继续保持',
                        type: 'bar',
                        stack: '总量',
                        label: {
                            show: true
                        },
                        data: [341, 374, 390, 450, 420]
                    },
                    {
                        name: '需要改进',
                        type: 'bar',
                        stack: '总量',
                        label: {
                            show: true,
                        },
                        data: [-101, -134, -190, -130, -210]
                    }
                ]
            })
        }
    }
}
</script>

<style scoped lang="less">
    .over-view-component{
        /** ------ elemnt 样式重置： 开始 ------- **/ 
        // .el-row{
        //     margin: 0 !important;
        // }
        /** ------ elemnt 样式重置： 结束 ------- **/ 
        // background:#020913;
        .data-header{
            .link {
                margin-top: 0;
                margin-bottom: 16px;
                outline: none;
                text-decoration: none;
                position: relative;
                font-size: 20px;
                color: #000000;
                display: inline-block;
                cursor: pointer;
            }
            .link--kukuri {
                text-transform: uppercase;
                font-weight: 900;
                overflow: hidden;
                color: #000000;
            }
            .link--kukuri:hover {
                color: #b2b0a9;
            }
            .link--kukuri::after {
                content: "";
                position: absolute;
                height: 16px;
                width: 100%;
                top: 50%;
                margin-top: -8px;
                right: 0;
                background: #f9f9f9;
                transform: translate3d(-100%, 0, 0);
                transition: transform 0.4s;
                transition-timing-function: cubic-bezier(0.7, 0, 0.3, 1);
            }
            .link--kukuri:hover::after {
                transform: translate3d(100%, 0, 0);
            }
            .link--kukuri::before {
                content: attr(data-letters);
                position: absolute;
                z-index: 2;
                overflow: hidden;
                color: #424242;
                white-space: nowrap;
                width: 0%;
                transition: width 0.4s 0.3s;
            }
            .link--kukuri:hover::before {
                width: 100%;
            }
        }
        .data-content-first{
            padding: 16px 0;
            color: #333;
            background-color: #fff;
            .el-col:first-child{
                padding-left: 16px !important;
                padding-right: 8px !important;
            }
            .el-col:last-child{
                padding-left: 8px !important;
                padding-right: 16px !important;
            }
            .title{
                margin:0;
                padding-left: 20px;
                height: 44px;
                color: #f5f5f5;
                font-size: 14px;
                line-height: 44px;
                text-align: left;
                border-radius: 4px 4px 0 0;
                background: #03305a;
            }
            .first-left{
                height: 100%;
                border:1px solid #0078d5;
                border-radius: 4px;
                .el-col{
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    .grid-content{
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        width: 100%;
                        height: 60%;
                        &.left{
                            border-right: 1px solid #e5e5e5;
                        }
                        &.right{
                            border-left: 1px solid #e5e5e5;
                        }
                    }
                    &:nth-child(1){
                        padding-right: 0 !important;
                    }
                    &:nth-child(2){
                        padding-left: 0 !important;
                    }
                }
            }
            .first-right{
                height: 100%;
                border:1px solid #0078d5;
                border-radius: 4px;
            }
        }
        .data-content-sec{
            padding:0 4px 20px;
            background: #fff;
            >.el-col{
                >.grid-content{
                    border-radius: 4px;
                }
            }
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
                    border-radius: 4px 4px 0 0;
                    color: #f5f5f5;
                }
            }
        }
    }
</style>