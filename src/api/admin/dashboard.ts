import { request } from '@/utils/request'
export function getBaseStatisticsInfo() {
  return request({
    url: '/admin/dashboard/statistics',
    method: 'post',
  })
}

export function getPublishArticleStatisticsInfo() {
  return request({
    url: '/admin/dashboard/publishArticle/statistics',
    method: 'post',
  })
}
export function getArticlePVStatisticsInfo() {
  return request({
    url: '/admin/dashboard/pv/statistics',
    method: 'post',
  })
}
