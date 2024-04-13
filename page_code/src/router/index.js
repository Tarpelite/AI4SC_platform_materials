import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/dashboard' },
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
    path: '/newsNoticeDetail',
    name: '新闻通知详情',
    component: () => import('../views/newsNotice/newsNoticeDetail.vue')
  },
  {
    path: '/scientificMission',
    name: '科学任务',
    component: () => import('../views/scientificMission')
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
