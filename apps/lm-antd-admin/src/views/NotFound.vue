<template>
  <div class="not-found-container">
    <a-result status="404" title="404" sub-title="抱歉，您访问的页面不存在">
      <template #extra>
        <a-button type="primary" @click="goHome"> <home-outlined />返回首页 </a-button>
      </template>
    </a-result>
  </div>
</template>

<script setup lang="ts">
  import { HomeOutlined } from '@ant-design/icons-vue';
  import { useRouter } from 'vue-router';
  // Ant Design Vue v4 重置样式
  import 'ant-design-vue/dist/reset.css';

  const router = useRouter();

  // 返回首页
  const goHome = () => {
    router.push('/');
  };
</script>

<style scoped>
  .not-found-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    min-height: 400px;
  }
</style>
