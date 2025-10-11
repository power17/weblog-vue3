import { request } from '@/utils/request'

// 获取标签分页数据
export function getArticlePageList(data: any) {
  return request({
    url: '/article/list',
    method: 'post',
    data,
  })
}

export function getArticleDetail(articleId: string) {
  return request({
    url: '/article/detail',
    method: 'post',
    data: { articleId },
  })
}
