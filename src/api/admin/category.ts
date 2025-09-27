import { request } from '@/utils/request'
interface CategoryPageListType {
  current: number
  endDate: string
  name: string
  size: number
  startDate: string
}

// interface CategoryPageListRespType {
//   current: number
//   data: []
//   name: string
//   size: number
//   startDate: string
//   total: number
// }
// 登录接口
export function getCategoryPageList(data: CategoryPageListType) {
  return request<[]>({
    url: '/admin/category/list',
    method: 'post',
    data,
  })
}

// 添加分类
export function addCategory(data: { name: string }) {
  return request({
    url: '/admin/category/add',
    method: 'post',
    data,
  })
}

// 删除分类
export function deleteCategory(id: number) {
  return request({
    url: '/admin/category/delete',
    method: 'post',
    data: {
      id,
    },
  })
}

export function getCategorySelectList() {
  return request({
    url: '/admin/category/select/list',
    method: 'post',
  })
}
