import { request } from '@/utils/request' // 获取文章分页数据

export function getArticlePageList(data: any) {
  return request<[]>({
    url: '/admin/article/list',
    method: 'post',
    data,
  })
}
