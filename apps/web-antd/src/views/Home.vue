<template>
  <div class="home-container">
    <a-card :title="pageTitle" :bordered="false">
      <p class="page-description">欢迎使用 LM Web 管理系统，这是一个基于 Vue 3、TypeScript 和 Ant Design Vue 构建的现代化应用。</p>
      
      <div class="feature-section">
        <h3>组件展示</h3>
        <!-- 使用我们开发的 HelloWorld 组件 -->
        <HelloWorld
          :title="'欢迎使用 LM Web 组件库'"
          :message="'这是我们的第一个共享组件示例'"
          :showCount="true"
          @click="handleHelloWorldClick"
        />
      </div>
      
      <div class="features-section">
        <h3>系统功能</h3>
        <a-row :gutter="[16, 16]">
          <a-col :span="8">
            <a-card hoverable :bordered="false">
              <a-card-meta
                title="Monorepo 架构"
                description="使用 pnpm workspace 构建的多包项目管理"
              />
            </a-card>
          </a-col>
          <a-col :span="8">
            <a-card hoverable :bordered="false">
              <a-card-meta
                title="共享组件库"
                description="可复用的组件和工具函数"
              />
            </a-card>
          </a-col>
          <a-col :span="8">
            <a-card hoverable :bordered="false">
              <a-card-meta
                title="Ant Design Vue"
                description="基于 Ant Design 设计体系的企业级 UI 组件库"
              />
            </a-card>
          </a-col>
        </a-row>
      </div>
    </a-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { message } from 'ant-design-vue';
import { HelloWorld } from '@lm/components';

// 页面标题
const pageTitle = ref('欢迎来到 LM Web 管理系统');

// 处理 HelloWorld 组件的点击事件
const handleHelloWorldClick = () => {
  message.success('HelloWorld 组件被点击了');
};
</script>

<style scoped>
.home-container {
  padding: 0;
}

.page-description {
  margin-bottom: 30px;
  line-height: 1.6;
  color: #666;
}

.feature-section,
.features-section {
  margin-top: 30px;
}

h3 {
  font-size: 18px;
  margin-bottom: 16px;
  color: #333;
  padding-bottom: 8px;
  border-bottom: 1px solid #f0f0f0;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .feature-section,
  .features-section {
    margin-top: 20px;
  }
  
  h3 {
    font-size: 16px;
  }
}
</style>