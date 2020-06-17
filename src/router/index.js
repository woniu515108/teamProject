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
