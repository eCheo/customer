import axios from 'axios'
import router from './index'

axios.defaults.timeout = 5000;

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
                   
            }
        }
    }
)

export default axios;