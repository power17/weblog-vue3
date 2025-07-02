import { request } from '@/utils/request'

// 登录接口
export function login(username: string, password: string) {
  return request<{ token: string }>({
    url: '/login',
    method: 'post',
    data: {
      username,
      password,
    },
  })
}

// 获取登录用户信息
export function getUserInfo() {
  return request<{ username: string }>({
    url: '/admin/user/info',
    method: 'post',
  })
}
