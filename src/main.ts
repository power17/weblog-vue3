import '@/styles/index.css'
import { createApp } from 'vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue' // 导入 Element Plus 图标
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router'
// 引入全局状态管理 Pinia
import pinia from '@/stores'

const app = createApp(App)
app.use(pinia)
app.use(router)

// 引入图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.mount('#app')
