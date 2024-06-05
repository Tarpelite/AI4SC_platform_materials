import Vue from 'vue';
import VueRouter from 'vue-router';
import Layout from '@/layout';
import { Toast } from 'mint-ui';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Layout,
    meta: {
      title: '数据中心'
    },
    children: [
      {
        path: '/',
        name: 'dashboard',
        component: () => import('../pages/dashboard'),
        meta: {
          roles: false
        }
      },

      {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import('../pages/dashboard'),
        meta: {
          roles: false
        }
      },
      {
        path: '/newsNotice',
        name: '新闻通知',
        component: () => import('../pages/newsNotice'),
        meta: {
          roles: false
        }
      },
      {
        path: '/newsNoticeDetail/:id',
        name: '新闻通知详情',
        component: () => import('../pages/newsNotice/newsNoticeDetail.vue'),
        meta: {
          roles: true
        }
      },
      {
        path: '/scientificMission',
        name: '科学任务',
        component: () => import('../pages/scientificMission'),
        meta: {
          roles: false
        }
      },
      {
        path: '/scientificMissionMore/:name',
        name: '科学任务更多',
        component: () => import('../pages/scientificMission/more.vue'),
        meta: {
          roles: false
        }
      },
      {
        path: '/scientificMissionDetail/:id',
        name: '科学任务详情',
        component: () => import('../pages/scientificMission/scientificMissionDetail.vue'),
        meta: {
          roles: true
        }
      },
      {
        path: '/smartKit',
        name: '智能套件',
        component: () => import('../pages/smartKit'),
        meta: {
          roles: false
        }
      },
      {
        path: '/operationCondition',
        name: '运行情况',
        component: () => import('../pages/operationCondition'),
        meta: {
          roles: false
        }
      },
      {
        path: '/userInfo',
        name: '用户主页',
        component: () => import('../pages/userInfo'),
        meta: {
          roles: true
        }
      }
    ]
  },
  {
    path: '/login',
    name: '登录',
    meta: {
      roles: false
    },
    component: () => import('../pages/login')
  },
  {
    path: '/search',
    name: '搜索',
    meta: {
      roles: false
    },
    component: () => import('../pages/search')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta && to.meta.roles && !sessionStorage.getItem('token')) {
    Toast('页面需要登录,请先登录！')
    next({ path: '/login', replace: true })
  } else {
    next()
  }
});
router.afterEach((to, from) => {
  window.scrollTo(0, 0)
});
// 缓存原型上的push函数
const originPush = VueRouter.prototype.push
const originReplace = VueRouter.prototype.replace
// 给原型对象上的push指定新函数函数
VueRouter.prototype.push = function (location, onComplete, onAbort) {
  // 判断如果没有指定回调函数, 通过call调用源函数并使用catch来处理错误
  if (onComplete === undefined && onAbort === undefined) {
    return originPush.call(this, location, onComplete, onAbort).catch(() => {
    })
  } else { // 如果有指定任意回调函数, 通过call调用源push函数处理
    originPush.call(this, location, onComplete, onAbort)
  }
}
VueRouter.prototype.replace = function (location, onComplete, onAbort) {
  if (onComplete === undefined && onAbort === undefined) {
    return originReplace.call(this, location, onComplete, onAbort).catch(() => {
    })
  } else {
    originReplace.call(this, location, onComplete, onAbort)
  }
}
export default router
