<template>
  <div class="not-found-container">
    <a-result
      status="404"
      title="404"
      sub-title="抱歉，您访问的页面不存在"
      extra
    >
      <a-button type="primary" @click="goToHome">
        <HomeOutlined /> 返回首页
      </a-button>
    </a-result>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { HomeOutlined } from '@ant-design/icons-vue';

const router = useRouter();

// 返回首页
const goToHome = () => {
  router.push('/');
};
</script>

<style scoped>
.not-found-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
}
</style>