import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  {
    path: '/login',
    name: '登录',
    component: () => import('../views/login')
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('../views/dashboard')
  },
  {
    path: '/newsNotice',
    name: '新闻通知',
    component: () => import('../views/newsNotice')
  },
  {
    path: '/newsNoticeDetail/:id',
    name: '新闻通知详情',
    component: () => import('../views/newsNotice/newsNoticeDetail.vue')
  },
  {
    path: '/scientificMission',
    name: '科学任务',
    component: () => import('../views/scientificMission')
  },
  {
    path: '/scientificMissionMore/:name',
    name: '科学任务更多',
    component: () => import('../views/scientificMission/more.vue')
  },
  {
    path: '/scientificMissionDetail',
    name: '科学任务详情',
    component: () => import('../views/scientificMission/scientificMissionDetail.vue')
  },
  {
    path: '/smartKit',
    name: '智能套件',
    component: () => import('../views/smartKit')
  },
  {
    path: '/operationCondition',
    name: '运行情况',
    component: () => import('../views/operationCondition')
  },
  {
    path: '/userInfo',
    name: '用户主页',
    component: () => import('../views/userInfo')
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

router.afterEach((to, from) => {
  window.scrollTo(0, 0)
});
export default router
