import { request } from '@/utils/request'

// 获取标签分页数据
export function getArchivePageList(data: any) {
  return request({
    url: '/archive/list',
    method: 'post',
    data,
  })
}
