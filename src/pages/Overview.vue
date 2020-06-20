<template>
    <div class="over-view-component">
        <div class="data-header"><p class="title">大话西游周边商城数据可视化展示</p></div>
        <div class="data-content-first">
            <div class="first-left">统计数量<p><span>下单数量</span>   <span>销售金额</span></p></div>
            <div class="first-right">销量折线统计图</div>
        </div>
        <div class="data-content-sec">
            <div class="sec-left">消费群体及访客来源统计</div>
            <div class="sec-center">热销商品类型统计</div>
            <div class="sec-right">客户反馈类型统计</div>
        </div>

    </div>
</template>

<script>
export default {
    name: 'overView',
    data () {
        return {
            msg: 'Welcome to Your Vue.js App'
        }
    },


    methods: {

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
            display: flex;
            height: 100px;
            .first-left{
                width: 30%;
                background: #fff;
                border:1px solid orangered;
            }
            .first-right{
                width: 70%;
                background: #fff;
                border:1px solid orangered;
            }
        }
        .data-content-sec{
            display: flex;
            height: 100px;
            justify-content: space-between;
            .sec-left{
                width: 33.3%;
                background: #fff;
                border:1px solid orangered;
                }
            .sec-center{width: 33.3%;
                background: #fff;
                border:1px solid orangered;}
            .sec-right{width: 33.3%;
                background: #fff;
                border:1px solid orangered;}
        }
    }
</style>
