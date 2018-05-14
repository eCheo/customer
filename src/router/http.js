import axios from 'axios'
import router from './index'

axios.defaults.timeout = 60000;

// axios.defaults.retry = 4; 重新请求接口次数
// axios.defaults.retryDelay = 1000; 重新请求接口间隔时间

//拦截请求数据
// axios.interceptors.request.use(
//     config =>{

//     }
// )

//拦截响应数据
axios.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if (error.response) {
            switch (error.response.status) {
                case 707:
                    router.replace({
                        path: '/'
                    })
                    break;
                case 999:
                    alert("您没有权限登陆这个页面"); //还没有完成的要调用iview的弹窗
                    break;
            }
        }
    }
)

// axios.interceptors.response.use(function (res) {
//     if (res.headers && (res.headers['content-type'] === 'application/octet-stream' || res.headers['content-type'] === 'application/vnd.ms-excel')) {
//         downloadUrl(res.request.responseURL)
//         return { data: { rCode: 'success' } }
//     }
//     return res;
// }, function (err) {
//     //Do something with response error
//     return Promise.reject(error);
// })

// //使用iframe框架下载文件
// const downloadUrl = url => {
//     let iframe = document.createElement('iframe')
//     iframe.style.display = 'none'
//     iframe.src = url
//     iframe.onload = function () {
//         document.body.removeChild(iframe)
//     }
//     document.body.appendChild(iframe)
// }

export default axios;