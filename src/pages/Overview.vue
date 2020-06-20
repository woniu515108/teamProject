<template>
    <div class="over-view-component">
        <div class="data-header">标题头部</div>
        <div class="data-content-first">第一排数据
            <div class="first-left"></div>
            <div class="first-right"></div>
        </div>
        <div class="data-content-sec">第二排数据
            <div class="sec-left"></div>
            <div class="sec-center"></div>
            <div class="sec-right"></div>
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
        .data-content-first{
            display: flex;
            height: 100px;
            .first-left{
                width: 30%;
            }
            .first-right{
                width: 70%;
            }
        }
        .data-content-sec{
            display: flex;
        }
    }
</style>
