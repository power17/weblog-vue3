import { createRouter, createWebHistory } from 'vue-router'
import Index from '@/pages/frontend/index.vue'
import Login from '@/pages/admin/login.vue'
import AdminIndex from '@/pages/admin/index.vue'
import Admin from '@/layouts/admin/index.vue'

import { getToken, showMessage } from '@/utils'
import nprogress from 'nprogress'

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
      path: '/admin', // 后台首页
      component: Admin, // 对应 admin.vue 布局文件
      // 使用到 admin.vue 布局的，都需要放置在其子路由下面
      children: [
        {
          path: '/admin/index',
          component: AdminIndex, // 主内容区域，具体需要渲染的页面
          meta: {
            title: 'Admin 后台首页',
          },
        },
      ],
    },
  ],
})

// 全局路由前置守卫
router.beforeEach((to, from, next) => {
  nprogress.start()
  // 动态设置页面 Title
  const title = (to.meta.title ? to.meta.title : '') + ' - Weblog'
  document.title = title
  // 未登录，则强制跳转登录页
  const token = getToken()
  if (!token && to.path.startsWith('/admin')) {
    showMessage('请先登录', 'warning')
    next({ path: '/login' })
  } else if (token && to.path == '/login') {
    // 若用户已经登录，且重复访问登录页
    showMessage('请勿重复登录', 'warning')
    // 跳转后台首页
    next({ path: '/admin/index' })
  } else {
    next()
  }
})

// 全局路由后置守卫
router.afterEach((to, from) => {
  nprogress.done()
})

export default router
