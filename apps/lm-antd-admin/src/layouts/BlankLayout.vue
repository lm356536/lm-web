<template>
  <a-layout class="blank-layout">
    <a-layout-content class="blank-content">
      <router-view />
    </a-layout-content>
  </a-layout>
</template>

<script setup lang="ts">
  // 空白布局组件，用于不需要侧边栏和复杂导航的页面
  // 比如登录页面、注册页面等
</script>

<style scoped>
  .blank-layout {
    min-height: 100vh;
    background-color: #f5f5f5;
  }

  .blank-content {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
  }
</style>
