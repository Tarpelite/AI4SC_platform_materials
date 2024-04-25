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
    path: '/scientificMissionDetail/:id',
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
// 缓存原型上的push函数
const originPush = VueRouter.prototype.push
const originReplace = VueRouter.prototype.replace
// 给原型对象上的push指定新函数函数
VueRouter.prototype.push = function (location, onComplete, onAbort) {
  // 判断如果没有指定回调函数, 通过call调用源函数并使用catch来处理错误
  if (onComplete===undefined && onAbort===undefined) {
    return originPush.call(this, location, onComplete, onAbort).catch(() => {})
  } else { // 如果有指定任意回调函数, 通过call调用源push函数处理
    originPush.call(this, location, onComplete, onAbort)
  }
}
VueRouter.prototype.replace = function (location, onComplete, onAbort) {
  if (onComplete===undefined && onAbort===undefined) {
    return originReplace.call(this, location, onComplete, onAbort).catch(() => {})
  } else {
    originReplace.call(this, location, onComplete, onAbort)
  }
}
export default router
