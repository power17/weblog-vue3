import { request } from '@/utils/request'

interface TagListType {
  current: number
  endDate: string
  name: string
  size: number
  startDate: string
}
// 获取标签分页数据
export function getTagPageList(data: TagListType) {
  return request<[]>({
    url: '/admin/tag/list',
    method: 'post',
    data,
  })
}

export function addTag(data: { tags: string[] }) {
  return request<[]>({
    url: '/admin/tag/add',
    method: 'post',
    data,
  })
}

export function deleteTag(id: number) {
  return request<[]>({
    url: '/admin/tag/delete',
    method: 'post',
    data: {
      id,
    },
  })
}

export function searchTags(key: string) {
  return request({
    url: '/admin/tag/search',
    method: 'post',
    data: { key },
  })
}

export function getTagSelectList() {
  return request({
    url: '/admin/tag/select/list',
    method: 'post',
  })
}
