<template>
    <div class="login-page">

        <el-button type="primary" @click="submit">登陆</el-button>

    </div>
</template>

<script>
    export default {
        name: 'login',
        data () {
            return {
            msg: 'Welcome to Your Vue.js App'
            }
        },

        methods: {
            submit(){
                console.log( "subnmoi" );
                this.$router.replace("/")
            }
        }
    }
</script>

<style scoped lang="less">

</style>
