import { request } from '@/utils/request'
interface SettingsDetailType {
  logo: string
  name: string
  author: string
  introduction: string
  avatar: string
  githubHomepage: string
  csdnHomepage: string
  giteeHomepage: string
  zhihuHomepage: string
}
// 获取博客设置详情
export function getBlogSettingsDetail() {
  return request<SettingsDetailType>({
    url: '/admin/blog/settings/detail',
    method: 'post',
  })
}

// 更新博客设置
export function updateBlogSettings(data: SettingsDetailType) {
  return request<SettingsDetailType>({
    url: '/admin/blog/settings/update',
    method: 'post',
    data,
  })
}
