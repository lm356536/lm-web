<template>
  <a-layout class="app-layout">
    <!-- 侧边栏 -->
    <a-layout-sider
      v-model:collapsed="collapsed"
      breakpoint="lg"
      collapsed-width="80"
      width="256"
      theme="light"
    >
      <div class="logo">
        <h1 v-if="!collapsed">LM Web</h1>
        <h1 v-else class="logo-collapsed">LM</h1>
      </div>
      <a-menu
        v-model:selectedKeys="selectedKeys"
        mode="inline"
        :style="{ height: '100%', borderRight: 0 }"
      >
        <a-menu-item key="/" @click="navigateTo('/')">
          <home-outlined />
          <span>首页</span>
        </a-menu-item>
        <a-menu-item key="/about" @click="navigateTo('/about')">
          <info-circle-outlined />
          <span>组件库</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>

    <!-- 主内容区域 -->
    <a-layout>
      <!-- 顶部导航 -->
      <a-layout-header class="app-header">
        <div class="header-left">
          <a-button type="text" @click="toggleCollapsed" :style="{ fontSize: '16px' }">
            <menu-outlined />
          </a-button>
        </div>
        <div class="header-right">
          <a-dropdown>
            <a-button>
              <user-outlined />
              <span>管理员</span>
            </a-button>
            <template #overlay>
              <a-menu>
                <a-menu-item key="1">个人设置</a-menu-item>
                <a-menu-item key="2">退出登录</a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </div>
      </a-layout-header>

      <!-- 内容区 -->
      <a-layout-content class="app-content">
        <router-view />
      </a-layout-content>

      <!-- 页脚 -->
      <a-layout-footer class="app-footer">
        <p>© 2024 LM Web. All rights reserved.</p>
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<script setup lang="ts">
  import { ref, onMounted, watch } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { getPreferences, savePreferences } from '@/preferences';

  const route = useRoute();
  const router = useRouter();

  // 侧边栏折叠状态
  const collapsed = ref(false);

  // 当前选中的菜单
  const selectedKeys = ref<string[]>(['/']);

  // 切换侧边栏折叠状态
  const toggleCollapsed = () => {
    collapsed.value = !collapsed.value;
    // 保存折叠状态到偏好设置
    savePreferences({ sidebarCollapsed: collapsed.value });
  };

  // 导航到指定路由
  const navigateTo = (path: string) => {
    router.push(path);
  };

  // 监听路由变化，更新选中的菜单
  watch(
    () => route.path,
    newPath => {
      selectedKeys.value = [newPath];
    },
    { immediate: true },
  );

  // 组件挂载时，从偏好设置加载折叠状态
  onMounted(() => {
    const preferences = getPreferences();
    collapsed.value = preferences.sidebarCollapsed;
  });
</script>

<style scoped>
  .app-layout {
    min-height: 100vh;
  }

  .logo {
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    border-bottom: 1px solid #f0f0f0;
  }

  .logo h1 {
    margin: 0;
    font-size: 18px;
    font-weight: 600;
    color: #1890ff;
  }

  .logo-collapsed h1 {
    font-size: 20px;
  }

  .app-header {
    height: 64px;
    padding: 0 24px;
    background-color: #fff;
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .header-left {
    display: flex;
    align-items: center;
  }

  .header-right {
    display: flex;
    align-items: center;
  }

  .app-content {
    padding: 24px;
    background-color: #f5f5f5;
    min-height: calc(100vh - 64px - 64px);
  }

  .app-footer {
    height: 64px;
    background-color: #fff;
    border-top: 1px solid #f0f0f0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .app-footer p {
    margin: 0;
    color: #999;
  }
</style>
