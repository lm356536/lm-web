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
          <HomeOutlined />
          <span>首页</span>
        </a-menu-item>
        <a-menu-item key="/about" @click="navigateTo('/about')">
          <InfoCircleOutlined />
          <span>关于我们</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    
    <!-- 主内容区域 -->
    <a-layout>
      <!-- 顶部导航 -->
      <a-layout-header class="app-header">
        <div class="header-left">
          <a-button
            type="text"
            icon="<MenuOutlined />"
            @click="toggleCollapsed"
            :style="{ fontSize: '16px' }"
          />
        </div>
        <div class="header-right">
          <a-dropdown>
            <a-button>
              <UserOutlined />
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
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { Layout } from 'ant-design-vue';
import {
  MenuOutlined,
  HomeOutlined,
  InfoCircleOutlined,
  UserOutlined,
} from '@ant-design/icons-vue';

const { Header, Content, Footer, Sider } = Layout;
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

// 组件挂载后初始化选中的路由
onMounted(() => {
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
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  border-bottom: 1px solid #f0f0f0;
}

.logo h1 {
  margin: 0;
  font-size: 18px;
  color: #1890ff;
}

.logo-collapsed {
  font-size: 16px !important;
}

.app-header {
  background: #fff;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #f0f0f0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.header-left,
.header-right {
  display: flex;
  align-items: center;
}

.app-content {
  margin: 20px;
  background: #fff;
  border-radius: 8px;
  padding: 24px;
  min-height: 280px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.app-footer {
  text-align: center;
  padding: 20px;
  color: #666;
  background: #fff;
  border-top: 1px solid #f0f0f0;
}
</style>