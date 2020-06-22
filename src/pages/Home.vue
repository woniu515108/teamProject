<template>
    <div class="home-page">
        <el-container>
            <el-header>大话西游2周边商城后台管理系统</el-header>
            <el-container>
                <el-aside width="200px">
                    
                    <el-row class="left-nav">
                        <el-col :span="24">
                            <el-menu
                                default-active="2"
                                class="el-menu-vertical-demo"
                                @open="handleOpen"
                                @close="handleClose"
                                text-color="#fff"
                                background-color='#094574'
                                active-text-color="#ffd04b"
                                router>
                                <el-menu-item index="/home/over-view">
                                    <i class="el-icon-s-home"></i>
                                    <span slot="title">概览</span>
                                </el-menu-item>
                                <el-menu-item index="/home/product-list">
                                    <i class="el-icon-menu"></i>
                                    <span slot="title">商品管理</span>
                                </el-menu-item>
                                <el-menu-item index="/home/user-list">
                                    <i class="el-icon-document"></i>
                                    <span slot="title">用户管理</span>
                                </el-menu-item>                                
                            </el-menu>
                        </el-col>
                    </el-row>


                </el-aside>
                <el-container>
                    <el-main>
                        <el-breadcrumb separator-class="el-icon-arrow-right" class="location" v-if="isShowBread">
                            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                            <el-breadcrumb-item>商品管理</el-breadcrumb-item>
                        </el-breadcrumb>

                        <router-view/>                      


                    </el-main>
                    <el-footer>技术支持：我们都对团队&nbsp;&nbsp;&nbsp;&nbsp;地址：广东省广州市天河区天寿大厦三层</el-footer>
                </el-container>
            </el-container>
        </el-container>
          
    </div>
</template>

<script>
export default {
    name: 'home',
    data () {
        return {
            isShowBread: true,
            msg: 'Welcome to Your Vue.js App'
        }
    },

    beforeCreate(){
        console.log( "beforeCreate() 组件创建前..." );
    },
    created(){
        console.log("created() 组件创建完成！");
        this.getNowRouter();


    },

    beforeMount(){
        console.log( "beforeMount() 组件挂载前..." );
    },
    mounted(){
        console.log( "mounted() 组件挂载完成!" );
    },

    beforeUpdate(){
        console.log( "beforeUpdate() 组件更新前..." );
    },

    updated() {
        console.log( "updated() 组件更新完成！" );
        this.getNowRouter();
    },

    beforeDestroy(){
        console.log( "beforeDestroy() 组件销毁前..." );
    },

    destroyed(){
        console.log( "destroyed() 组件销毁完成" );
    },



    methods: {
        /**
         * @description: 获取当前路由
         * @param {type} 
         * @return: 
         * @time: 
         * @by: 
         */      
        getNowRouter(){
            console.log( this.$route.path );
            if( this.$route.path === '/home/over-view' ){
                this.isShowBread = false;
            }else{
                this.isShowBread = true;
            }
        },

        
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        }
    }
}
</script>

<style scoped lang="less">
    .home-page{
        min-height: 100vh;
        >.el-container{
            min-height: 100vh;
            >.el-header, .el-footer {
                color: #fff;
                line-height: 60px;
                background-color: #002b4c;
                &.el-header{
                    text-align:left;
                }
                &.el-footer{
                    text-align: center;
                    font-size:14px;
                }
            }
            
            >.el-container{
                
                
                .el-aside{
                    .left-nav {
                        height: 100%;
                        .el-col{
                            height: 100%;
                            .el-menu{
                                // min-height: calc( 100vh - 60px );
                                height: 100%;
                            }

                        }
                        
                    }
                    
                }

                >.el-container{
                    .el-main{
                        padding: 16px;
                        overflow: hidden;
                    }
                }


            }

        }

        
        .el-aside {
            color: #333;
            text-align: center;
            line-height: 200px;
        }
        
        .el-main {
            background-color: #E9EEF3;
            color: #333;
            text-align: center;
            .location{
                margin-bottom:20px;
            }
        }
        
        body > .el-container {
            margin-bottom: 40px;
        }
        
        .el-container:nth-child(5) .el-aside,
        .el-container:nth-child(6) .el-aside {
            line-height: 260px;
        }
        
        .el-container:nth-child(7) .el-aside {
            line-height: 320px;
        }
    }



</style>
