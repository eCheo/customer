import axios from 'axios'
import router from './index'

axios.defaults.timeout = 5000;

// axios.defaults.retry = 4; 重新请求接口次数
// axios.defaults.retryDelay = 1000; 重新请求接口间隔时间

//拦截请求数据
// axios.interceptors.request.use(
//     config =>{

//     }
// )

//拦截响应数据
axios.interceptors.response.use(
    response =>{
        return response;
    },
    error =>{
        if(error.response){
            switch (error.response.status){
                case 707:
                    router.replace({
                        path:'/'
                    })
                   break;
                case 999:
                   alert("您没有权限登陆这个页面"); //还没有完成的要调用iview的弹窗
                   break;
            }
        }
    }
)

export default axios;