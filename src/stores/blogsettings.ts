import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getBlogSettingsDetail } from '@/api/frontend/blogsettings'
interface BlogSettingsType {
  logo: string
  name: string
  author: string
  introduction: string
  avatar: string
}

export const useBlogSettingsStore = defineStore('blogsettings', () => {
  console.log('useBlogSettingsStore')
  // 博客设置信息
  const blogSettings = ref<BlogSettingsType>({
    logo: '',
    name: '',
    author: '',
    introduction: '',
    avatar: '',
  })

  // 获取博客设置信息
  function getBlogSettings() {
    // 调用后台获取博客设置信息接口
    console.log('获取博客设置信息')
    getBlogSettingsDetail().then((res: any) => {
      if (res.success) {
        blogSettings.value = res.data
      }
    })
  }

  return { blogSettings, getBlogSettings }
})
