import Vue from 'vue'
import VueRouter from 'vue-router'
import {Message} from 'element-ui';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: () => import('../views/dashboard'),
    meta: {
      roles: false
    }
  },
  {
    path: '/login',
    name: '登录',
    meta: {
      roles: false
    },
    component: () => import('../views/login')
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('../views/dashboard'),
    meta: {
      roles: false
    },
  },
  {
    path: '/newsNotice',
    name: '新闻通知',
    component: () => import('../views/newsNotice'),
    meta: {
      roles: false
    },
  },
  {
    path: '/newsNoticeDetail/:id',
    name: '新闻通知详情',
    component: () => import('../views/newsNotice/newsNoticeDetail.vue'),
    meta: {
      roles: true
    },
  },
  {
    path: '/scientificMission',
    name: '科学任务',
    component: () => import('../views/scientificMission'),
    meta: {
      roles: false
    },
  },
  {
    path: '/scientificMissionMore/:name',
    name: '科学任务更多',
    component: () => import('../views/scientificMission/more.vue'),
    meta: {
      roles: false
    },
  },
  {
    path: '/scientificMissionDetail/:id',
    name: '科学任务详情',
    component: () => import('../views/scientificMission/scientificMissionDetail.vue'),
    meta: {
      roles: true
    },
  },
  {
    path: '/smartKit',
    name: '智能套件',
    component: () => import('../views/smartKit'),
    meta: {
      roles: false
    },
  },
  {
    path: '/operationCondition',
    name: '运行情况',
    component: () => import('../views/operationCondition'),
    meta: {
      roles: false
    },
  },
  {
    path: '/userInfo',
    name: '用户主页',
    component: () => import('../views/userInfo'),
    meta: {
      roles: true
    }
  },
  {
    path: '/dataset',
    name: '数据集',
    component: () => import('../views/dataset'),
    meta: {
      roles: false
    }
  },
  {
    path: '/operator',
    name: '算子框架',
    component: () => import('../views/operator'),
    meta: {
      roles: false
    }
  },
  {
    path: '/operator/:id',
    name: '算子框架',
    component: () => import('../views/operator/detail'),
    meta: {
      roles: true
    }
  },
  {
    path: '/agreement',
    name: 'agreement',
    component: () => import('../views/agreement/agreement'),
    meta: {
      roles: false
    }
  },
  {
    path: '/privacy',
    name: 'agreement',
    component: () => import('../views/agreement/privacy'),
    meta: {
      roles: false
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if(to.meta && to.meta.roles && !sessionStorage.getItem('token')) {
    Message.info('页面需要登录,请先登录！')
    next({path: '/login', replace: true})
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
  if(onComplete === undefined && onAbort === undefined) {
    return originPush.call(this, location, onComplete, onAbort).catch(() => {
    })
  } else { // 如果有指定任意回调函数, 通过call调用源push函数处理
    originPush.call(this, location, onComplete, onAbort)
  }
}
VueRouter.prototype.replace = function (location, onComplete, onAbort) {
  if(onComplete === undefined && onAbort === undefined) {
    return originReplace.call(this, location, onComplete, onAbort).catch(() => {
    })
  } else {
    originReplace.call(this, location, onComplete, onAbort)
  }
}
export default router
