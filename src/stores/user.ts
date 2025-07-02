import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getUserInfo } from '@/api/admin/user'
export interface UserInfoType {
  username: string
}
export const useUserStore = defineStore('user', () => {
  // 用户信息
  const userInfo = ref<UserInfoType>({ username: '' })

  // 设置用户信息
  function setUserInfo() {
    // 调用后头获取用户信息接口
    getUserInfo().then((res) => {
      userInfo.value = res.data
    })
  }

  return { userInfo, setUserInfo }
})
