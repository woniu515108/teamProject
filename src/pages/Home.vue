<template>
    <div class="home-page">
        <el-container>
            <el-header>Header</el-header>
            <el-container>
                <el-aside width="200px">
                    
                    <el-row class="left-nav">
                        <el-col :span="24">
                            <el-menu
                                default-active="2"
                                class="el-menu-vertical-demo"
                                @open="handleOpen"
                                @close="handleClose"
                                background-color="#545c64"
                                text-color="#fff"
                                active-text-color="#ffd04b"
                                router="true">
                                <!-- <el-submenu index="1">
                                    <template slot="title"> 
                                        <i class="el-icon-location"></i>
                                        <span>导航一</span>
                                    </template>
                                    <el-menu-item-group>
                                        <template slot="title">分组一</template>
                                        <el-menu-item index="1-1">选项1</el-menu-item>
                                        <el-menu-item index="1-2">选项2</el-menu-item>
                                    </el-menu-item-group>
                                    <el-menu-item-group title="分组2">
                                        <el-menu-item index="1-3">选项3</el-menu-item>
                                    </el-menu-item-group>
                                    <el-submenu index="1-4">
                                        <template slot="title">选项4</template>
                                        <el-menu-item index="1-4-1">选项1</el-menu-item>
                                    </el-submenu> 
                                </el-submenu> -->
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

                        <router-view/>                      


                    </el-main>
                    <el-footer>我是页脚</el-footer>
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
            background-color: #B3C0D1;
            color: #333;
            text-align: center;
            line-height: 60px;
        }
        
        .el-aside {
            background-color: #D3DCE6;
            color: #333;
            text-align: center;
            line-height: 200px;
        }
        
        .el-main {
            background-color: #E9EEF3;
            color: #333;
            text-align: center;
            line-height: 160px;
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
