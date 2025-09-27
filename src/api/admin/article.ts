import { request } from '@/utils/request' // 获取文章分页数据

export function getArticlePageList(data: any) {
  return request<[]>({
    url: '/admin/article/list',
    method: 'post',
    data,
  })
}

export function deleteArticle(id: string) {
  return request({
    url: '/admin/article/delete',
    method: 'post',
    data: {
      id,
    },
  })
}

export function publishArticle(data: any) {
  return request({
    url: '/admin/article/publish',
    method: 'post',
    data,
  })
}

export function getArticleDetail(id: string) {
  return request({
    url: '/admin/article/detail',
    method: 'post',
    data: { id },
  })
}
export function updateArticle(data: any) {
  return request({
    url: '/admin/article/update',
    method: 'post',
    data,
  })
}
