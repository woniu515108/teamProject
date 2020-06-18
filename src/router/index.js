import Vue from 'vue'
import Router from 'vue-router'

// 导入路由组件
import HelloWorld from '@/components/HelloWorld'

import Login from '@/pages/Login';
import Home from '@/pages/Home';

import OverView from '@/pages/Overview';
import ProductList from '@/pages/Product';
import UserList from '@/pages/UserList';

Vue.use(Router)

/**
 * 解决ElementUI导航中的vue-router在3.0版本以上重复点击菜单报错问题
 * error: Avoided redundant navigation to current location: "/home/user-list".
*/
const originalPush = Router.prototype.push;
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}


export default new Router({
    routes: [
        {
            path: '/hello',
            name: 'HelloWorld',
            component: HelloWorld
        },
        {
            path: '/login',
            name: 'login',
            component: Login
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
            ]
        },
        
    ]
})
