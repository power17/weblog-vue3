<template>
  <div
    class="fixed overflow-y-auto bg-slate-800 h-screen text-white"
    :style="{ width: menuStore.menuWidth }"
    transition-all
  >
    <!-- 顶部 Logo, 指定高度为 64px, 和右边的 Header 头保持一样高 -->
    <div class="flex items-center justify-center h-[64px]">
      <img
        v-if="menuStore.menuWidth == '250px'"
        src="@/assets/images/weblog-logo.png"
        class="h-[60px]"
      />
      <img v-else src="@/assets/images/weblog-logo-mini.png" class="h-[60px]" />
    </div>
    <!-- 下方菜单 -->
    <el-menu
      :default-active="defaultActive"
      :collapse="isCollapse"
      :collapse-transition="false"
      @select="handleSelect"
    >
      <template v-for="(item, index) in menus" :key="index">
        <el-menu-item :index="item.path">
          <el-icon>
            <!-- 动态图标 -->
            <component :is="item.icon"></component>
          </el-icon>
          <span>{{ item.name }}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>
<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useMenuStore } from '@/stores/menu'

const menuStore = useMenuStore()

const route = useRoute()
const router = useRouter()
// 是否折叠
const isCollapse = computed(() => !(menuStore.menuWidth == '250px'))
// 引入了菜单 store

// 根据路由地址判断哪个菜单被选中
const defaultActive = ref(route.path)

const menus = [
  {
    name: '仪表盘',
    icon: 'Monitor',
    path: '/admin/index',
  },
  {
    name: '文章管理',
    icon: 'Document',
    path: '/admin/article/list',
  },
  {
    name: '分类管理',
    icon: 'FolderOpened',
    path: '/admin/category/list',
  },
  {
    name: '标签管理',
    icon: 'PriceTag',
    path: '/admin/tag/list',
  },
  {
    name: '博客设置',
    icon: 'Setting',
    path: '/admin/blog/setting',
  },
]

// 菜单选择事件
const handleSelect = (path: string) => {
  router.push(path)
}
</script>

<style scoped>
.el-menu {
  background-color: rgb(30 41 59 / 1);
  border-right: 0;
}

.el-sub-menu__title {
  color: #fff;
}

.el-sub-menu__title:hover {
  background-color: #ffffff10;
}

.el-menu-item.is-active {
  background-color: var(--el-color-primary);
  color: #fff;
}

.el-menu-item.is-active:hover {
  background-color: var(--el-color-primary);
}

.el-menu-item {
  color: #fff;
}

.el-menu-item:hover {
  background-color: #ffffff10;
}
</style>
