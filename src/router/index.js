import Vue from 'vue'
import Router from 'vue-router'

// 导入路由组件
import Login from '@/pages/Login';
import Home from '@/pages/Home';

import OverView from '@/pages/Overview';
import ProductList from '@/pages/Product';
import UserList from '@/pages/UserList';
import AddProduct from '@/pages/AddProduct';
import ForgetPassword from '@/pages/ForgetPassword';

Vue.use(Router)

/**
 * 解决ElementUI导航中的vue-router在3.0版本以上重复点击菜单报错问题
 * error: Avoided redundant navigation to current location: "/home/user-list".
*/
const originalPush = Router.prototype.push;
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}


const router =  new Router({
    routes: [
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/forget-password',
            name: 'forgetPassword',
            component: ForgetPassword,   
        },
        {
            path: '/home',
            name: 'home',
            component: Home,
            children: [
                {
                    path: 'over-view',
                    name: 'overView',
                    component: OverView,   
                },
                {
                    path: 'product-list',
                    name: 'productList',
                    component: ProductList,   
                },
                {
                    path: 'user-list',
                    name: 'userList',
                    component: UserList,   
                },
                {
                    path: 'add-product',
                    name: 'addProduct',
                    component: AddProduct,   
                }
            ]
        },
        
    ]
})

// 不需要登陆的组件
let noLoginPage = [
    '/login'
]

router.beforeEach((to,from,next)=>{
    // console.log( "to===>",to );
    // console.log( "from===>",from );
    // console.log( "to===>",to );

 

    // next()
    if(noLoginPage.some(item=>item==to.path)){//不需要登陆
        next();

    }else{ // 需要登陆
        console.log( sessionStorage.getItem("userInfo") );
        if( sessionStorage['userInfo'] ){
            console.log( "已登录" );
            next();
        }else{
            console.log( "未登陆" );
            next({
                path:"/login"
            });
        }
    }
});


export default router;