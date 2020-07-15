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
                            <!-- default-active="2" -->
                            <el-menu
                                :default-active="currentMenu"
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
                                <el-menu-item index="/home/product-manager">
                                    <i class="el-icon-menu"></i>
                                    <span slot="title">商品管理</span>
                                </el-menu-item>
                                <el-submenu index="/home/user-manager">
                                    <template slot="title">
                                        <i class="el-icon-document"></i>
                                        <span slot="title">用户管理</span>
                                    </template>
                                    <el-menu-item-group class="management">
                                        <el-menu-item index="/home/user-manager/admin-list">管理员用户</el-menu-item>
                                        <el-menu-item index="/home/user-manager/client-list">前台用户</el-menu-item>
                                    </el-menu-item-group>
                                </el-submenu>                                
                            </el-menu>
                        </el-col>
                    </el-row>

                </el-aside>
                <el-container>
                    <el-main>
                        <!-- 面包屑 -->
                        <el-breadcrumb separator-class="el-icon-arrow-right" class="location" v-if="isShowBread">
                            <el-breadcrumb-item 
                                v-for="(breadItem,idx) in this.currentBread"
                                :key='idx'>
                                {{ breadItem.name }}
                            </el-breadcrumb-item>

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
            userInfo: {},                       // 用户信息
            currentMenu: '/home/over-view',     // 当前激活菜单的路由
            isShowBread: true,                  // 是否显示面包屑
            breadCrumbData: {                   // 面包屑数据
                overView: {
                    root: {
                        name: "概览",
                    }
                },
                productManage: {
                    root: {
                        name: "商品管理"
                    },
                    list: {
                        name: "商品列表",
                        path: "/home/product-manager/product-list"
                    },
                    add: {
                        name: "添加商品",
                        path: "/home/product-manager/product-add"
                    }
                },
                userManage: {
                    root: {
                        name: "用户管理"
                    },
                    admin: {
                        name: "管理员用户",
                        path: "/home/user-manager/admin-list"
                    },
                    user: {
                        name: "前台用户",
                        path: "/home/user-manager/client-list"
                    }
                }
            },
            currentBread: []                    // 当前面包屑                  
        }
    },



    created(){

        /**
         * @description: 获取本地缓存中的用户信息
         */        
        this.getLocalUserInfo();

        /**
         * @description: 组件创建完成后获取当前路由
         */
        this.activeMenu();


    },

    // mounted(){

    //     this.activeBread();
    // },

    beforeUpdate(){
        this.activeBread()
    },


    updated() {

        this.activeMenu();
        

        
    },

    methods: {
        /**
         * @description: 获取本地缓存中的数据并赋值到当前组件
         */  
        getLocalUserInfo(){
            let userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
            this.userInfo = userInfo;
        }, 

        /**
         * @description: 获取当前路由
         *  - 判断激活当前地址导航栏
         *  - 判断面包屑是否显示
         */      
        activeMenu(){
            // console.log("当前路由地址=====>>>>", this.$route );
            let nowRouter = this.$route.path;

            // 判断激活当前地址导航栏
            if( nowRouter == '/home/over-view' || nowRouter == '/home/user-manager/admin-list' || nowRouter == '/home/user-manager/client-list' ){
                this.currentMenu = this.$route.path;
            }else if( nowRouter.indexOf("product-manager") != -1 ){
                 this.currentMenu = "/home/product-manager";       
            }

            // 判断面包屑是否显示
            if(nowRouter == '/home/over-view'){
                this.isShowBread = false;     
            }else{
                this.isShowBread = true;  
            }
        },

        activeBread(){
            let nowRouter = this.$route.path;

            switch(nowRouter){
                case '/home/product-manager/product-list':
                    this.currentBread = [
                        this.breadCrumbData.productManage.root,
                        this.breadCrumbData.productManage.list
                    ];
                    break;
                case '/home/product-manager/product-add':
                    this.currentBread = [
                        this.breadCrumbData.productManage.root,
                        this.breadCrumbData.productManage.list,
                        this.breadCrumbData.productManage.add
                    ];
                    break;
                case '/home/user-manager/admin-list':
                    this.currentBread = [
                        this.breadCrumbData.userManage.root,
                        this.breadCrumbData.userManage.admin
                    ];
                    break;
                case '/home/user-manager/client-list':
                    this.currentBread = [
                        this.breadCrumbData.userManage.root,
                        this.breadCrumbData.userManage.user
                    ];
                    break;
            }
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
            // console.log('退出登录')
            
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
                    .el-dropdown-link{
                        color: #fc5600;
                        cursor: pointer;
                    }
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
                    .management{
                        overflow: hidden;
                    }
                    .left-nav {
                        height: 100%;
                        .el-col{
                            height: 100%;
                            .el-menu{
                                height: 100%;
                                .el-menu-item{
                                    text-align: left;
                                }
                                .el-menu-item.is-active{
                                    background: #596275 !important;
                                }
                                .el-submenu{
                                    text-align: left;
                                }
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
        // .el-aside {
        //     color: #333;
        //     // text-align: center;
        //     line-height: 200px;
        //     .el-menu-item{
        //         text-align: left;
        //         .el-submenu__title{
        //             text-align: left;
        //         }
        //     }
        // }
        
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
