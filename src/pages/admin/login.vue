<template>
  <div class="grid grid-cols-2 h-screen overflow-hidden">
    <div class="col-span-2 order-2 p-10 md:col-span-1 md:order-1 bg-slate-900">
      <!-- 指定为 flex 布局，并设置为屏幕垂直水平居中，高度为 100% -->
      <div class="flex justify-center items-center h-full flex-col">
        <h2 class="font-bold text-4xl mb-7 text-white">Weblog 博客登录</h2>
        <p class="text-white">
          一款由 Spring Boot + Mybaits Plus + Vue 3.4 + Vite 7 开发的前后端分离博客。
        </p>
        <!-- 指定图片宽度为父级元素的 1/2 -->
        <img src="@/assets/images/dev.png" class="w-1/2" />
      </div>
    </div>
    <div class="col-span-2 order-1 md:col-span-1 md:order-2 bg-white">
      <!-- flex-col 用于指定子元素垂直排列 -->
      <div
        class="flex justify-center items-center h-full flex-col animate__animated animate__bounceInRight animate__fast"
      >
        <h1 class="font-bold text-4xl mb-5">欢迎回来</h1>
        <div class="flex items-center justify-center mb-7 text-gray-400 space-x-2">
          <span class="h-[1px] w-16 bg-gray-200"></span>
          <span>账号密码登录</span>
          <!-- 右边横线 -->
          <span class="h-[1px] w-16 bg-gray-200"></span>
        </div>
        <!-- 引入 Element Plus 表单组件，移动端设置宽度为 5/6，PC 端设置为 2/5 -->
        <el-form :model="form" ref="formRef" :rules="rules" class="w-5/6 md:w-2/5">
          <el-form-item prop="username">
            <!-- 输入框组件 -->
            <el-input
              v-model="form.username"
              size="large"
              placeholder="请输入用户名"
              :prefix-icon="User"
              clearable
              @keyup.enter="onSubmit"
            />
          </el-form-item>
          <el-form-item prop="password">
            <!-- 密码框组件 -->
            <el-input
              v-model="form.password"
              size="large"
              type="password"
              placeholder="请输入密码"
              :prefix-icon="Lock"
              clearable
              show-password
              @keyup.enter="onSubmit"
            />
          </el-form-item>
          <el-form-item>
            <!-- 登录按钮，宽度设置为 100% -->
            <el-button
              :loading="loading"
              class="w-full"
              size="large"
              type="primary"
              @click="onSubmit"
              >登录</el-button
            >
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
// 引入 Element Plus 中的用户、锁图标
import { User, Lock } from '@element-plus/icons-vue'
import { login } from '@/api/admin/user'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import type { FormInstance } from 'element-plus'
import { setToken, showMessage } from '@/utils'
const router = useRouter()
const loading = ref(false)
const form = reactive({
  username: '',
  password: '',
})

const formRef = ref<FormInstance>()
// 表单验证规则
const rules = {
  username: [
    {
      required: true,
      message: '用户名不能为空',
      trigger: 'blur',
    },
  ],
  password: [
    {
      required: true,
      message: '密码不能为空',
      trigger: 'blur',
    },
  ],
}

// 登录
const onSubmit = () => {
  formRef.value?.validate((valid) => {
    if (!valid) {
      console.log('表单验证不通过')
      return
    }
    // 开始加载
    loading.value = true
    login(form.username, form.password)
      .then((res) => {
        // 判断是否成功
        if (res.success === true) {
          // Todo: 不应放在cookie
          const token = res.data.token
          setToken(token)
          // 提示登录成功
          showMessage('登录成功')
          // 存储 Token 到 Cookie 中

          // 跳转到后台首页
          router.push('/admin/index')
        }
      })
      .finally(() => {
        loading.value = false
      })
  })
}
</script>
