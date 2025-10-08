import { request } from '@/utils/request'

// 获取标签分页数据
export function getTagList() {
  return request<[]>({
    url: '/tag/list',
    method: 'post',
  })
}
export function getTagArticlePageList(data: any) {
  return request<[]>({
    url: '/tag/article/list',
    method: 'post',
    data,
  })
}
