import Vue from 'vue'
import Router from 'vue-router'

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
        {   // 根路由重定向
              path: '/',
              redirect : "/login",
              component: e => import('@/pages/Login')
        },
        {   // 登陆页
            path: '/login',
            name: 'login',
            component: e => import('@/pages/Login')
        },
        {   // 修改密码页
            path: '/forget-password',
            name: 'forgetPassword',
            component: e => import('@/pages/ForgetPassword'),
        },
        {
            path: '/home',
            name: 'home',
            redirect: '/home/over-view',
            component: e => import('@/pages/Home'),
            children: [
                {
                    path: 'over-view',
                    name: 'overView',
                    component: e => import('@/pages/home/Overview'),
                },
                {
                    path: 'product-manager',
                    name: 'productManager',
                    redirect: "/home/product-manager/product-list",
                    component: e => import('@/pages/home/product/Product-manager'),
                    children: [
                        {
                            path: 'product-list',
                            name: 'productList',
                            component: e => import('@/pages/home/product/ProductList'),    
                        },
                        {
                            path: 'product-add',
                            name: 'productAdd',
                            component: e => import('@/pages/home/product/productAdd'),      
                        }
                    ]
                       
                },
                {
                    path: 'user-manager',
                    name: 'userManager',
                    component: e => import('@/pages/home/user/user-manager'),
                    children: [
                        {
                            path: 'admin-list',
                            name: 'adminList',
                            component: e => import('@/pages/home/user/admin/Admin-list'),
                        },
                        {
                            path: 'client-list',
                            name: 'ClientList',
                            component: e => import('@/pages/home/user/client/Client-list'),
                        }
                    ]

                },

            ]
        },
        { // 未创建路由重定向
            path:'*',
            redirect:'/'
        }
    ]
})

// 不需要登陆的组件
let noLoginPage = [
    '/',
    '/login',
    '/forget-password'
]

router.beforeEach((to,from,next)=>{

    // next()
    if(noLoginPage.some(item=>item==to.path)){//不需要登陆
        next();

    }else{ // 需要登陆
        // console.log( sessionStorage.getItem("userInfo") );
        if( sessionStorage['userInfo'] ){
            // console.log( "已登录" );
            next();
        }else{
            // console.log( "未登陆" );
            next({
                path:"/login"
            });
        }
    }
});


export default router;