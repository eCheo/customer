import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import index from '../components/index.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path:'/index',
      name:'首页',
      component:index
    }
  ]
})
