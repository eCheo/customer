router.beforeEach((to,from,next)=>{
    if (to.meta.requireAuth){
        console.log('获取当前的token是否存在')
        if (this.token){
            next();
        }else{
            next({
                path:'/login',
                query:{redirect: to.fullPath}//将跳转的路由的path做为参数，登陆成功跳转的该路由
            })
        }      
    }
})