<template>
  <!-- 设置语言为中文 -->
  <el-config-provider :locale="locale">
    <router-view></router-view>
  </el-config-provider>
</template>
<script setup lang="ts">
import zhCn from 'element-plus/es/locale/lang/zh-cn'

const locale = zhCn
</script>

<style scoped></style>
