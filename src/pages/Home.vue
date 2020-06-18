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
                        <el-breadcrumb separator-class="el-icon-arrow-right" class="location">
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
            msg: 'Welcome to Your Vue.js App'
        }
    },


    methods: {
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
            >.el-header{

            }
            >.el-container{
                
                
                .el-aside{
                    .el-menu{
                        min-height: calc( 100vh - 60px );
                    }
                }

                >.el-container{

                }


            }

        }

        .el-header, .el-footer {
            background-color: #002b4c;
            color: #fff;
            text-align: center;
            line-height: 60px;
        }
        .el-header{
            text-align:left;
        }
        .el-footer{
            font-size:14px;
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
