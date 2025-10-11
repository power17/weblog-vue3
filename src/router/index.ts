import { createRouter, createWebHistory } from 'vue-router'
import Index from '@/pages/frontend/index.vue'
import Login from '@/pages/admin/login.vue'
import AdminIndex from '@/pages/admin/index.vue'
import Admin from '@/layouts/admin/index.vue'
import AdminArticleList from '@/pages/admin/article-list/index.vue'
import AdminCategoryList from '@/pages/admin/category-list/index.vue'
import AdminTagList from '@/pages/admin/tag-list/index.vue'
import AdminBlogSetting from '@/pages/admin/blogs-setting/index.vue'

import { getToken, showMessage } from '@/utils'
import nprogress from 'nprogress'
import { useBlogSettingsStore } from '@/stores/blogsettings'
import ArchiveList from '@/pages/frontend/archive-list.vue'
import CategoryList from '@/pages/frontend/category-list.vue'
import CategoryArticleList from '@/pages/frontend/category-article-list.vue'
import TagList from '@/pages/frontend/tag-list.vue'
import TagArticleList from '@/pages/frontend/tag-article-list.vue'
import ArticleDetail from '@/pages/frontend/article-detail.vue'
import NotFound from '@/pages/frontend/404.vue'
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
      path: '/article/:articleId', // 文章详情页
      component: ArticleDetail,
      meta: {
        // meta 信息
        title: 'Weblog 详情页',
      },
    },
    {
      path: '/category/list', // 分类页
      component: CategoryList,
      meta: {
        // meta 信息
        title: 'Weblog 分类页',
      },
    },
    {
      path: '/tag/list', // 标签列表页
      component: TagList,
      meta: {
        // meta 信息
        title: 'Weblog 标签列表页',
      },
    },
    {
      path: '/tag/article/list', // 标签列表页
      component: TagArticleList,
      meta: {
        // meta 信息
        title: 'Weblog 标签文章页',
      },
    },
    {
      path: '/category/article/list', // 分类文章页
      component: CategoryArticleList,
      meta: {
        // meta 信息
        title: 'Weblog 分类文章页',
      },
    },
    {
      path: '/archive/list', // 归档页
      component: ArchiveList,
      meta: {
        // meta 信息
        title: 'Weblog 归档页',
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
      // 使用到 admin.vue 布局的，都需要放置在其子路由下面
      children: [
        {
          path: '/admin/index',
          component: AdminIndex,
          meta: {
            title: '仪表盘',
          },
        },
        {
          path: '/admin/article/list',
          component: AdminArticleList,
          meta: {
            title: '文章管理',
          },
        },
        {
          path: '/admin/category/list',
          component: AdminCategoryList,
          meta: {
            title: '分类管理',
          },
        },
        {
          path: '/admin/tag/list',
          component: AdminTagList,
          meta: {
            title: '标签管理',
          },
        },
        {
          path: '/admin/blog/setting',
          component: AdminBlogSetting,
          meta: {
            title: '博客设置',
          },
        },
      ],
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFound,
      meta: {
        title: '404 页',
      },
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
  } else if (!to.path.startsWith('/admin')) {
    // 如果访问的非 /admin 前缀路由
    // 引入博客设置 store
    const blogSettingsStore = useBlogSettingsStore()
    // 获取博客设置信息并保存到全局状态中
    blogSettingsStore.getBlogSettings()
    next()
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
router.afterEach(() => {
  nprogress.done()
})

export default router
