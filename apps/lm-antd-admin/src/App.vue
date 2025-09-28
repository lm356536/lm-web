<template>
  <!-- 根据路由元信息选择不同的布局 -->
  <component :is="currentLayout">
    <!-- 路由视图会被渲染在布局组件中 -->
  </component>
</template>

<script setup lang="ts">
  import { computed, watch, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import MainLayout from './layouts/MainLayout.vue';
  import BlankLayout from './layouts/BlankLayout.vue';
  import { useI18n } from './locales';

  const route = useRoute();
  const { t } = useI18n();

  // 根据路由的元信息决定使用哪个布局
  const currentLayout = computed(() => {
    // 如果路由配置了blank布局，则使用BlankLayout，否则使用MainLayout
    return route.meta.layout === 'blank' ? BlankLayout : MainLayout;
  });

  // 监听路由变化，更新页面标题
  watch(
    () => route.meta.title,
    title => {
      if (title) {
        document.title = `${t(title as string)} - LM Web`;
      } else {
        document.title = 'LM Web';
      }
    },
    { immediate: true },
  );

  // 组件挂载时的初始化
  onMounted(() => {
    // 应用初始化逻辑
    // 开发环境的调试日志
  });
</script>

<style>
  /* 全局样式重置 */
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html,
  body {
    font-family:
      'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', '微软雅黑',
      Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    height: 100%;
    overflow-x: hidden;
  }

  #app {
    height: 100%;
  }

  /* 滚动条样式 */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  ::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }

  /* 过渡动画 */
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.3s;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
</style>
