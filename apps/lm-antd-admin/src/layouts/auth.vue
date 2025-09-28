<template>
  <div class="auth-layout">
    <div class="auth-container">
      <div class="auth-header">
        <div class="logo">
          <h1>LM Web</h1>
        </div>
        <h2>{{ title }}</h2>
        <p>{{ description }}</p>
      </div>
      <div class="auth-content">
        <slot />
      </div>
      <div class="auth-footer">
        <slot name="toolbar" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  interface Props {
    title?: string;
    description?: string;
  }

  defineProps<Props>();
</script>

<style scoped>
  .auth-layout {
    min-height: 100vh;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
  }

  .auth-container {
    width: 100%;
    max-width: 480px;
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    overflow: hidden;
  }

  .auth-header {
    text-align: center;
    padding: 40px 40px 24px;
    border-bottom: 1px solid #f0f0f0;
  }

  .logo h1 {
    margin: 0 0 20px;
    font-size: 28px;
    font-weight: 600;
    color: #1890ff;
  }

  .auth-header h2 {
    margin: 0 0 8px;
    font-size: 20px;
    font-weight: 500;
    color: #333;
  }

  .auth-header p {
    margin: 0;
    font-size: 14px;
    color: #999;
  }

  .auth-content {
    padding: 40px;
  }

  .auth-footer {
    padding: 0 40px 40px;
    text-align: center;
  }

  @media (max-width: 768px) {
    .auth-layout {
      padding: 16px;
    }

    .auth-container {
      max-width: 100%;
    }

    .auth-header,
    .auth-content,
    .auth-footer {
      padding: 32px 24px;
    }

    .logo h1 {
      font-size: 24px;
    }

    .auth-header h2 {
      font-size: 18px;
    }
  }
</style>
