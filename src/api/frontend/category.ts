import { request } from '@/utils/request'

// 获取标签分页数据
export function getCategoryList() {
  return request({
    url: '/category/list',
    method: 'post',
  })
}

export function getCategoryArticlePageList(data: any) {
  return request({
    url: '/category/article/list',
    method: 'post',
    data,
  })
}
