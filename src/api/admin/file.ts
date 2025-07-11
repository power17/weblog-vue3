import { request } from '@/utils/request'

// 上传文件
export function uploadFile(data: FormData) {
  return request<{ url: string }>({
    url: 'admin/file/upload',
    method: 'post',
    data,
  })
}
