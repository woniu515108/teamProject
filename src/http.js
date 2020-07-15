/* ------------- 该文件为axios请求 拦截器文件 ----------------------- */
import axios from "axios";

import { Loading } from 'element-ui';

axios.defaults = Object.assign(axios.defaults, {
    baseURL:"/api",
    headers: {
        "Content-Type": "application/json",
    }
});


let loading;
function startLoading() {    //使用Element loading-start 方法
  loading = Loading.service({
    lock: true,
    text: '拼命加载中...',
    background: 'rgba(0, 0, 0, 0.7)',
  })
}
function endLoading() {    //使用Element loading-close 方法
  loading.close()
}



// 添加请求拦截器
axios.interceptors.request.use(
    config => {
        // let isUser = sessionStorage.userInfo
        // if (isUser) {
        //     config.headers.accessToken = JSON.parse(isUser).user.token;
        // }

        startLoading();

        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// // 添加响应拦截器
axios.interceptors.response.use(
    response => {
        // console.log( response );
        if (response.status === 200) {
            if (response.data) {
                setTimeout(() => {
                    endLoading();
                }, 500);
                return response.data;
            } else {
                return response;
            }
        } else {
            console.error(`网络错误!(${response.status})`)
        }
    },
    error => {
        return Promise.reject(error);
    }
);

export default axios;