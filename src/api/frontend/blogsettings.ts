import { request } from '@/utils/request'

// 获取标签分页数据
export function getBlogSettingsDetail() {
  return request({
    url: '/blog/settings/detail',
    method: 'post',
  })
}
