<template>
    <div class="home-page">
        <el-container>
            <el-header>
                <img class="header_logo" src="../images/logo.png">
                <!-- 头部右侧用户名下拉菜单-bengin -->
                <el-dropdown>
                    <span class="el-dropdown-link">
                        <!-- <img :src="src" alt=""> -->
                        {{userInfo.nickName}}<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item @click.native="loginOut">退出</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                <!-- 头部右侧用户名下拉菜单-end -->
                </el-header>
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
                                background-color='rgb(52,73,94)'
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
                                <el-submenu index="/home/user-list">
                                    <template slot="title">
                                        <i class="el-icon-document"></i>
                                        <span slot="title">用户管理</span>
                                    </template>
                                    <el-menu-item-group>
                                        <el-menu-item index="1-4-1">管理员用户</el-menu-item>
                                        <el-menu-item index="1-4-2">前台用户</el-menu-item>
                                    </el-menu-item-group>
                                </el-submenu>                                
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
                    <el-footer>技术支持：我们都队团队&nbsp;&nbsp;&nbsp;&nbsp;地址：广东省广州市天河区天寿大厦三层</el-footer>
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
            userInfo: {},

            src: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg'
        }
    },

    beforeCreate(){
        // console.log( "beforeCreate() 组件创建前..." );
    },
    created(){
        console.log("created() 组件创建完成！");

        /**
         * @description: 
         */        
        this.getLocalUserInfo();

        /**
         * @description: 组件创建完成后获取当前路由
         */
        this.getNowRouter();


    },

    beforeMount(){
        console.log( "beforeMount() 组件挂载前..." );


        
    },
    mounted(){
        console.log( "mounted() 组件挂载完成!" );

        
        

    },

    // beforeUpdate(){
    //     console.log( "beforeUpdate() 组件更新前..." );
    // },

    updated() {
        console.log( "updated() 组件更新完成！" );
        this.getNowRouter();
    },

    // beforeDestroy(){
    //     console.log( "beforeDestroy() 组件销毁前..." );
    // },

    // destroyed(){
    //     console.log( "destroyed() 组件销毁完成" );
    // },



    methods: {
        /**
         * @description: 获取当前路由
         * @param {type} 
         * @return: 
         * @time: 
         * @by: 
         */      
        getNowRouter(){
            // console.log( this.$route.path );
            if( this.$route.path === '/home/over-view' ){
                this.isShowBread = false;
            }else{
                this.isShowBread = true;
            }
        },

        /**
         * @description: 获取本地缓存中的数据并赋值到当前组件
         */  
        getLocalUserInfo(){
            let userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
            this.userInfo = userInfo;
        },      

        
        handleOpen(key, keyPath) {
            // console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            // console.log(key, keyPath);
        },

        /**
         * @description: 登录退出
         */
        loginOut(){
            console.log('退出登录')
            
            sessionStorage.removeItem('userInfo');

            this.$router.replace('/login');
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
                background-color:  rgb(34, 49, 63);
                &.el-header{
                    text-align:left;
                    display: flex;
                    justify-content: space-between;
                    .header_logo{
                        height: 60px;
                    }
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
