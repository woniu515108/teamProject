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
                                            <div class="order_con">
                                                <animate-number
                                                    from="1" 
                                                    to="8725" 
                                                    duration="3000" 
                                                    easing="easeOutQuad"
                                                    :formatter="formatter"
                                                    ></animate-number>
                                            </div>
                                        </div>
                                    </div>
                                </el-col>
                                <el-col :span="12">
                                    <div class="grid-content right">
                                        <div class="grid-content">
                                        <div class="order_num">
                                            <p class="subTitle">销售金额(￥)</p>
                                            <div class="order_con"><animate-number
                                                    from="1" 
                                                    to="467827.97" 
                                                    duration="3000" 
                                                    easing="easeOutQuad"
                                                    :formatter="formatter"
                                                    ></animate-number></div>
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
            <el-col :xs="24" :md="12" :lg="7">
                <div class="grid-content">
                    <p class="title">热销商品类型统计</p>
                    <div id="hotSale" class="cacavs-contente"></div>
                </div>
            </el-col>
            
            <el-col :xs="24" :md="12" :lg="9">
                <div class="grid-content">
                    <p class="title">消费群体</p>
                    <div id="consumer" class="cacavs-contente"></div>
                </div>
            </el-col>
            <el-col :xs="24" :md="12" :lg="8">
                <div class="grid-content">
                    <p class="title">访客来源统计</p>
                    <!--  :style="{width: '100%', height: '100%'}" -->
                    <div id="visitor" class="cacavs-contente"></div>
                </div>
            </el-col>
            <!-- <el-col :xs="24" :md="12" :lg="5">
                <div class="grid-content">
                    <p class="title">客户反馈类型统计</p>
                    <div id="feedback" :style="{width: '100%', height: '100%'}"></div>
                </div>
            </el-col> -->
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
            // order_num:'999',
            // order_money:'19999'
        }
    },
    beforeCreate () {
        // document.querySelector('.el-main').setAttribute('style', 'background-color:#0c0e18')
    },
    beforeDestroy () {
        document.querySelector('.el-main').removeAttribute('style')
    },
    mounted(){
        this.zhexian();
        this.hotSale();
        this.visitor();
        this.consumer();
        
        // this.feedback();
    },
    methods: {
        // 销售金额滚动
        formatter: function (num) {
            return num.toFixed(2)
        },
        // 销售折线图
        zhexian(){
            let myChart  = this.$echarts.init(document.getElementById('zhexian'));
            myChart.setOption({
                legend: {
                    top: "16px",
                    right: '16px',
                    data: [
                        {
                            name: "今年",
                            textStyle: {
                                color:'#c56cf0'

                            }
                        },
                        {
                            name: "去年",
                            textStyle: {
                                color:'#18dcff'

                            }
                        }
                    ]
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月','八月', '九月', '十月', '十一月', '十二月']
                },
                yAxis: {
                    type: 'value',
                    axisLabel: {
                        formatter: '{value}'
                    }
                },
                series: [
                    {
                        name: '今年',
                        type: 'line',
                        itemStyle: {
                            color: "#c56cf0"
                        },
                        data: [7477851, 6578124, 7045687, 8542752, 5245751, 9235487],
                        markLine: {
                            data: [
                                {type: 'average', name: '平均值'}
                            ]
                        }
                        
                    },
                    {
                        name: '去年',
                        type: 'line',
                        itemStyle: {
                            color: "#18dcff"
                        },
                        data: [124574, 5475112, 4251522, 2211554, 8477851, 54521, 2445621, 524574, 7475112, 1451522, 211554, 7477851],
                        markLine: {
                            data: [
                                {type: 'average', name: '平均值'},
                                [
                                    {
                                        symbol: 'none',
                                        x: '90%',
                                        yAxis: 'max'
                                    }, 
                                    {
                                        symbol: 'circle',
                                        label: {
                                            position: 'start',
                                            formatter: '最大值'
                                        },
                                        type: 'max',
                                        name: '最高点'
                                    }
                                ]
                            ]
                        }
                    }
                ]
            });
        },

        // 热销商品饼状图
        hotSale(){
            let myChart  = this.$echarts.init(document.getElementById('hotSale'));
            myChart.setOption({
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b} : {c} ({d}%)'
                },   
                legend: {
                    orient: 'horizontal',
                    top: "16px",
                    right: '16px',
                    data: ['家用电器', '电子产品', '美妆', '衣服', '其他']
                },
                
                series: [
                    {
                        // name: '访问来源',
                        type: 'pie',
                        radius: '55%',
                        center: ['50%', '50%'],
                        data: [
                            {
                                value: 335, 
                                name: '家用电器',
                                itemStyle: {
                                    color: '#7efff5'
                                }
                            },
                            {
                                value: 310, 
                                name: '电子产品',
                                itemStyle: {
                                    color: '#7d5fff'
                                }
                            },
                            {
                                value: 274, 
                                name: '美妆',
                                itemStyle: {
                                    color: '#fff200'
                                }
                            },
                            {
                                value: 400, 
                                name: '衣服',
                                itemStyle: {
                                    color: '#D6A2E8'
                                }
                            },
                            {
                                value: 235, 
                                name: '其他',
                                itemStyle: {
                                    color: '#FEA47F'
                                }
                            }
                            
                        ].sort(function (a, b) { return a.value - b.value; }),
                        roseType: 'radius',
                        label: {
                            formatter: '{d}%',
                            // color: 'rgba(226, 113, 37, 0.8)'
                        },
                        labelLine: {
                            lineStyle: {
                                color: 'rgba(226, 113, 37, 0.8)'
                            },
                            smooth: 0.2,
                            length: 10,
                            length2: 20
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
                    top: "16px",
                    right: "16px",
                    data: [
                        {
                            name: "男性"
                        },
                        {
                            name: "女性"
                        }
                    ],
                    
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    // bottom: '15%',
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
                        barWidth: "20px",
                        itemStyle: {
                            color: "#ff3838"
                        },
                        data: [ 23489, 29034,54230,14970, 31744]
                    },
                    {
                        name: '男性',
                        type: 'bar',
                        barWidth: "20px",
                        itemStyle: {
                            color: "#ff9f1a"
                        },
                        data: [ 13438, 31000,51807,21594, 34141]
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
                    orient: 'horizontal',
                    top: "16px",
                    right: '16px',
                    data: ['PC端', '移动端H5', '安卓app', '苹果app', '微信小程序']
                },
                series: [
                    {
                        name: '访问来源',
                        type: 'pie',
                        radius: '55%',
                        center: ['50%', '60%'],
                        data: [
                            {
                                value: 335, 
                                name: 'PC端', 
                                itemStyle: {
                                    color: "#ff4d4d"   
                                }
                            },
                            {
                                value: 310,
                                name: '移动端H5',
                                itemStyle: {
                                    color: "#18dcff"   
                                } 
                            },
                            {
                                value: 234, 
                                name: '安卓app',
                                itemStyle: {
                                    color: "#7d5fff"   
                                }
                            },
                            {
                                value: 135, 
                                name: '苹果app', 
                                itemStyle: {
                                    color: "#32ff7e"   
                                }
                            },
                            {
                                value: 1548, 
                                name: '微信小程序',
                                itemStyle: {
                                    color: "#c56cf0"   
                                }
                            }
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
        .subTitle{
            font-size: 18px;
            // text-shadow: 1px 0px 2px  #fff;
        }
        .order_con{
            color: #333;
            font-size: 30px;
        }
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
            margin: 0 !important;
            margin-bottom: 16px !important;
            padding: 16px 0;
            color: #333;
            background-color: #fff;
            // background-color: #0c0e18;
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
                background: #fa8231;
            }
            .first-left{
                height: 100%;
                border:1px solid #fff;
                border-radius: 4px;
                .el-row{
                    border: 1px solid #f1f2f6;
                    border-top: 0;
                    border-radius: 0px 0 4px 4px;
                }
                .el-col{
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    .grid-content{
                        display: flex;
                        flex-direction: column;
                        justify-content: flex-start;
                        align-items: center;
                        width: 100%;
                        height: 60%;
                        
                        &.left{
                            border-right: 1px solid #e5e5e5;
                            .order_num{
                                .subTitle{
                                    color: #e55039;
                                }
                                .order_con{
                                    color: #eb2f06;
                                    // text-shadow: 5px 5px 5px #FF0000;
                                }
                            }
                        }
                        &.right{
                            border-left: 1px solid #e5e5e5;
                            .order_num{
                                .subTitle{
                                    color: #18dcff;
                                }
                                .order_con{
                                    color: #17c0eb;
                                }
                            }
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
                border:1px solid #fff;
                border-radius: 4px;
                #zhexian{
                    border: 1px solid #f1f2f6;
                    border-top: 0;
                    border-radius: 0px 0 4px 4px;    
                }
            }
        }
        .data-content-sec{
            margin: 0 !important;
            padding:0 4px 16px;
            background: #fff;
            >.el-col{
                >.grid-content{
                    border-radius: 4px;
                }
            }
            .grid-content{
                border:1px solid #fff;
                height: 536px;
                margin-top:20px;
                .title{
                    margin:0;
                    text-align: left;
                    height: 44px;
                    background: #17c0eb;
                    line-height: 44px;
                    font-size: 14px;
                    padding-left: 20px;
                    border-radius: 4px 4px 0 0;
                    color: #f5f5f5;
                }

                .cacavs-contente{
                    width: 100%;
                    height: calc( 100% - 64px );
                    border: 1px solid #f1f2f6;
                    border-top: 0;
                    border-radius: 0px 0 4px 4px;
                }

            }
        }
    }
</style>