import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import index from '../components/index.vue'
import indexadmin from '../components/indexadmin.vue'


Vue.use(Router)


const routes = [
  {
    path: '/',
    name: 'hello',
    component: Hello
  },
  {
    path: '/index',
    name: 'index',
    component: index,
    meta: {
      requireAuth: true
    }
  },
  {
    path:'/indexadmin',
    name:'indexadmin',
    component: indexadmin,
    meta:{
      requireAuth:true
    }
  },
  {
    path: '/record',
    name: 'record',
    component: resolve => require(['@/components/record.vue'], resolve)
  },
  {
    path: '/recordadmin',
    name: 'recordadmin',
    component: resolve => require(['@/components/recordadmin.vue'], resolve)
  },
  {
    path:'/journal',
    name:'journal',
    component:resolve => require(['@/components/journal.vue'], resolve)
  },
  {
    path:'/journalList',
    name:'journalList',
    component:resolve => require(['@/components/journalList.vue'],resolve)
  },
  {
    path:'/chiefsee',
    name:'chiefsee',
    component:resolve => require(['@/components/chiefsee.vue'],resolve)
  },
  {
    path:'/pool',
    name:'pool',
    component:resolve => require(['@/components/pool.vue'],resolve)
  }
]

const router = new Router({
    routes,
    mode: 'history'
});

router.beforeEach((to, from, next) => {
  //to and from are Route Object,next() must be called to resolve the hook
    if(to.matched.some(r => r.meta.requireAuth)){
      if(sessionStorage.getItem('userInfo')){
          next();
      }else if(!to.name == "hello"){
        next({
          path:'/'
        })
      }
    }else{
      next();
    }
})

export default router;
