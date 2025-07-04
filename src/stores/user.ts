import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getUserInfo } from '@/api/admin/user'
import { removeToken } from '@/utils/cookie'
export interface UserInfoType {
  username: string
}
export const useUserStore = defineStore(
  'user',
  () => {
    // 用户信息
    const userInfo = ref<UserInfoType>({ username: '' })

    // 设置用户信息
    function setUserInfo() {
      // 调用后头获取用户信息接口
      getUserInfo().then((res) => {
        userInfo.value = res.data
      })
    }
    // 退出登录
    function logout() {
      // 删除 cookie 中的 token 令牌
      removeToken()
      // 删除登录用户信息
      userInfo.value = { username: '' }
    }

    return { userInfo, setUserInfo, logout }
  },
  {
    // 开启持久化
    persist: true,
  },
)
