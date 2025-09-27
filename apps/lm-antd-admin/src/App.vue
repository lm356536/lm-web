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
          <span>关于我们</span>
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
        <!-- 从共享组件库按需引入的HelloWorld组件 -->
        <div class="hello-world-container">
          <HelloWorld title="来自共享组件库" />
        </div>
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
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  // 按需引入Ant Design Vue图标
  import {
    MenuOutlined,
    HomeOutlined,
    InfoCircleOutlined,
    UserOutlined,
  } from '@ant-design/icons-vue';
 
  // 按需引入共享组件库中的组件 - 支持tree shaking
  import { HelloWorld } from '@lm/components';

  const router = useRouter();

  // 侧边栏折叠状态
  const collapsed = ref(false);

  // 当前选中的菜单
  const selectedKeys = ref<string[]>(['/']);

  // 切换侧边栏折叠状态
  const toggleCollapsed = () => {
    collapsed.value = !collapsed.value;
  };

  // 导航到指定路由
  const navigateTo = (path: string) => {
    router.push(path);
    selectedKeys.value = [path];
  };

  // 组件挂载时执行
  onMounted(() => {
    // 根据当前路由设置选中的菜单项
    const currentPath = router.currentRoute.value.path;
    selectedKeys.value = [currentPath];
  });
</script>

<style scoped>
  .app-layout {
    min-height: 100vh;
  }

  .logo {
    height: 64px;
    background: #1890ff;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    margin: 0;
    padding: 0 16px;
  }

  .logo h1 {
    margin: 0;
    font-size: 18px;
    font-weight: 600;
  }

  .logo-collapsed {
    font-size: 16px !important;
  }

  .app-header {
    height: 64px;
    background: #fff;
    padding: 0 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
    position: sticky;
    top: 0;
    z-index: 10;
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
    margin: 16px;
    padding: 24px;
    background: #fff;
    min-height: 280px;
  }

  .app-footer {
    text-align: center;
    background: #f0f2f5;
    padding: 24px;
    margin: 0;
    color: rgba(0, 0, 0, 0.65);
  }

  /* HelloWorld组件容器样式 */
  .hello-world-container {
    padding: 20px;
    border-bottom: 1px solid #f0f0f0;
    margin-bottom: 20px;
  }
</style>
