<template>
  <div class="auth-layout">
    <!-- 左侧背景图区域 -->
    <div class="auth-left-section">
      <div class="logo-container">
        <div class="logo">
          <img src="../asserts/images/logo.jpeg" alt="LM Web Logo" class="logo-image" />
          <h1 class="logo-text">LM Web</h1>
        </div>
      </div>
      <div class="left-content">
        <h2 class="left-title">开箱即用的大型中后台管理系统</h2>
        <p class="left-description">安全、高效、智能的管理平台，助力企业数字化转型</p>
      </div>
    </div>

    <!-- 右侧登录表单区域 -->
    <div class="auth-right-section">
      <div class="auth-container">
        <div class="auth-header">
          <h2>{{ title || '欢迎回来' }}</h2>
          <p>{{ description || '请输入您的账号信息以开始管理您的项目' }}</p>
        </div>
        <div class="auth-content">
          <Login />
        </div>
        <div class="auth-footer">
          <slot name="toolbar" />
          <p class="copyright">© {{ currentYear }} LM Web. All rights reserved.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import Login from '../views/Login.vue';
  import { computed } from 'vue';

  interface Props {
    title?: string;
    description?: string;
  }

  defineProps<Props>();

  // 获取当前年份
  const currentYear = computed(() => new Date().getFullYear());
</script>

<style scoped>
  .auth-layout {
    min-height: 100vh;
    display: flex;
    align-items: stretch;
    justify-content: center;
    background: #f5f5f5;
    position: relative;
  }

  /* 左侧背景区域 */
  .auth-left-section {
    flex: 16;
    min-width: 0;
    max-width: none;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 40px;
    position: relative;
    overflow: hidden;
    box-shadow: 4px 0 20px rgba(0, 0, 0, 0.1);
  }

  /* Logo容器 - 左上角定位 */
  .logo-container {
    position: absolute;
    top: 40px;
    left: 40px;
    z-index: 2;
  }

  .logo {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  /* Logo图片样式 */
  .logo-image {
    width: 36px;
    height: 36px;
    border-radius: 8px;
    object-fit: cover;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  }

  /* Logo文本样式 */
  .logo-text {
    color: #ffffff;
    font-size: 36px;
    margin: 0;
    font-weight: 600;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }

  /* 添加装饰性元素 */
  .auth-left-section::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 10%, transparent 10.5%) 0 0 / 30px
      30px;
    animation: float 30s ease-in-out infinite;
  }

  @keyframes float {
    0%,
    100% {
      transform: translate(0, 0) rotate(0deg);
    }
    25% {
      transform: translate(10px, 10px) rotate(1deg);
    }
    50% {
      transform: translate(0, 20px) rotate(0deg);
    }
    75% {
      transform: translate(-10px, 10px) rotate(-1deg);
    }
  }

  .left-content {
    position: relative;
    z-index: 1;
    color: white;
    text-align: center;
    max-width: 600px;
  }

  .left-title {
    font-size: 42px;
    font-weight: 700;
    margin: 0 0 16px;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    color: #ffffff;
  }

  .left-description {
    font-size: 16px;
    opacity: 0.95;
    line-height: 1.6;
    color: #121111;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  }

  /* 右侧登录表单区域 */
  .auth-right-section {
    flex: 9;
    min-width: 0;
    max-width: none;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 40px;
    background: white;
    position: relative;
    z-index: 10;
  }

  .auth-container {
    width: 100%;
    max-width: 500px;
    background: #ffffff;
    position: relative;
    z-index: 10;
    opacity: 1;
    visibility: visible;
  }

  .auth-header {
    text-align: center;
    margin-bottom: 32px;
  }

  .auth-content {
    margin-bottom: 24px;
    min-height: 200px;
    display: block;
  }

  .auth-header h2 {
    margin: 0 0 8px;
    font-size: 24px;
    font-weight: 600;
    color: #1a1a1a;
  }

  .auth-header p {
    margin: 0;
    font-size: 14px;
    color: #4d4d4d;
  }

  .auth-content {
    margin-bottom: 24px;
  }

  .auth-footer {
    text-align: center;
  }

  .copyright {
    margin: 0;
    font-size: 12px;
    color: #8c8c8c;
  }

  /* 响应式设计 */
  @media (max-width: 768px) {
    .auth-layout {
      flex-direction: column;
    }

    .auth-left-section,
    .auth-right-section {
      max-width: 100%;
      width: 100%;
      padding: 32px 20px;
    }

    .auth-left-section {
      min-height: 200px;
    }

    .logo-container {
      top: 20px;
      left: 20px;
    }

    .logo h1 {
      font-size: 20px;
    }

    .left-title {
      font-size: 28px;
    }

    .auth-right-section {
      min-height: calc(100vh - 200px);
    }

    .auth-container {
      padding: 32px 20px;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    }
  }
</style>
