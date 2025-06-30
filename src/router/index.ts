import { createRouter, createWebHistory } from 'vue-router'
import Index from '@/pages/frontend/index.vue'
import Login from '@/pages/admin/login.vue'
import AdminIndex from '@/pages/admin/index.vue'
import { getToken, showMessage } from '@/utils'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/', // 路由地址
      component: Index, // 对应组件
      meta: {
        // meta 信息
        title: 'Weblog 首页', // 页面标题
      },
    },
    {
      path: '/login', // 登录页
      component: Login,
      meta: {
        title: 'Weblog 登录页',
      },
    },
    {
      path: '/admin/index', // 后台首页
      component: AdminIndex,
      meta: {
        title: 'Admin 后台首页',
      },
    },
  ],
})

// 全局路由前置守卫
router.beforeEach((to, from, next) => {
  // 动态设置页面 Title
  const title = (to.meta.title ? to.meta.title : '') + ' - Weblog'
  document.title = title
  // 未登录，则强制跳转登录页
  const token = getToken()
  if (!token && to.path.startsWith('/admin')) {
    showMessage('请先登录', 'warning')
    next({ path: '/login' })
  } else {
    next()
  }

  next()
})

// 全局路由后置守卫
router.afterEach((to, from) => {})

export default router
