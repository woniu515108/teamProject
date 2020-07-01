# 大话西游周边商城后台管理系统前端开发文档

## 1. 项目描述
    该项目是基础vue.js框架及element-ui框架搭建
    主要功能有：
        - 登录 
        - 找回密码（邮箱验证）
        - 退出登录
        - 商城大数据展示
        - 商品管理（编辑、删除、新增、查找）
        - 用户管理
            . 会员管理（编辑、删除、新增、查找）
            . 管理员管理（编辑、删除、新增、查找）
        

## 2. 项目相关依赖
        - vue
            . 版本：^2.5.2
            . 一套构建用户界面的渐进式框架。
        
        - vue-router
            . 版本：^3.0.1
            . Vue Router 是 Vue.js 官方的路由管理器。它和 Vue.js 的核心深度集成，让构建单页面应用变得更为简单。

        - element-ui
            . 版本：^2.13.2
            . 基于MVVM框架Vue开源出来的一套前端ui组件

        - echarts 
            . 版本：^4.8.0
            . ECharts，一个使用 JavaScript 实现的开源可视化库，可以流畅的运行在 PC 和移动设备上，兼容当前绝大部分浏览器（IE8/9/10/11，Chrome，Firefox，Safari等），底层依赖轻量级的矢量图形库 ZRender，提供直观，交互丰富，可高度个性化定制的数据可视化图表。ECharts 提供了常规的折线图、柱状图、散点图、饼图、K线图，用于统计的盒形图，用于地理数据可视化的地图、热力图、线图，用于关系数据可视化的关系图、旭日图，多维数据可视化的平行坐标，还有用于 BI 的漏斗图，仪表盘，并且支持图与图之间的混搭。

        - less
            . 版本：^3.11.3
            . Less 是一门 CSS 预处理语言，它扩展了 CSS 语言，增加了变量、Mixin、函数等特性，使 CSS 更易维护和扩展。
        
        - axios
            + axios 是一个基于Promise 用于浏览器和 nodejs 的 HTTP 客户端，它本身具有以下特征：
                . 从浏览器中创建 XMLHttpRequest
                . 从 node.js 发出 http 请求
                . 支持 Promise API
                . 拦截请求和响应
                . 转换请求和响应数据
                . 取消请求
                . 自动转换JSON数据
                . 客户端支持防止 CSRF/XSRF

## 3. 前台项目启动
        - npm run dev

## 4.功能模块介绍

### 4.1、 登录
    - 组件名：Login.vue
    - 登录所需信息：用户名、密码
    - 输入信息点击“登录”按钮发送请求后页面效果
        . 登录成功
            弹出“成功登录”提示框并跳转至下一个页面
        . 登录失败
            弹窗显示登录失败相关信息

### 4.2、忘记密码
    - 组件名：ForgetPassword.vue
    - 找回密码所需信息：电子邮箱、邮箱验证码、新密码、确认新密码
    - 信息输入完成点击确认按钮请求成功跳转到登录页面

### 4.3、退出登录
    - 鼠标悬停至右上方的用户名，滑动显示"退出"按钮。点击退出，清除sessionstorage中的data,退出登录

### 4.4、商城大数据展示
    - 组件名：Overview.vue
    - 组件内容：
        . 统计数据
        . 销量统计折线图
        . 热销商品类型统计
        . 消费群体
        . 访客来源统计

### 4.5、商品管理
    - 组件名：Product.vue
    - 商品字段：
        商品编号、商品缩略图、商品名称、商品副标题、一级分类、二级分类、价格、商品描述、是否在售、库存
    - 功能点：
        . 编辑
            > 弹出商品信息表单
        . 删除
            > 点击删除按钮，删除当前行商品
        . 新增
            > 跳转至新增商品组件，组件名为：AddProduct.vue
        . 查找
            > 根据后台返回的商品编号查找商品

### 4.6、用户管理
    - 组件名：UserList.vue






# 明日任务


1. 在商品列表上方(与筛选平齐)增加一个【增加商品】按钮，并且点击可以跳转到新增商品列表页。


2. 新增商品页【取消】按钮跳转回商品列表页

3. 忘记密码页 ：
    - 发送按钮做成按钮样式
    - 发送邮箱验证码后倒计时60s后可以重新发送
    - 邮箱验证位数输入限制（3~10位）
    - 调试发送邮箱接口，获取当前发送的校验的 标识码
    - 密码复杂度校验(规则：大写字母、小写字母、数字，不能以数字开头，不能带特殊字符)
    - 新增返回按钮（点击跳转到登陆页）
    - 提交接口调试
        后台需要的参数：
            邮箱、收到的邮箱验证码、邮件标识码、密码


4. 新增商品页

    - 完善页面：

        + 缩略图： 上传缩略图（单张图片上传）
        + 商品展示图： 上传（<=4张图片上传）
        + 商品详情页图： 上传（<=12张图片上传）

    - 获取页面初始数据接口调试

        + 一级分类接口调试，并处理页面数据展示
        + 二级分类接口调试，并处理一二级分类联动效果
        + 商品名称重名接口调试
        + 价格  正则约束（数字）
        + 库存 数量限制（9999）
        


             





