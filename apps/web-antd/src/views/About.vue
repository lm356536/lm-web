<template>
  <div class="about-container">
    <a-card :title="'关于 LM Web'" :bordered="false">
      <div class="about-content">
        <div class="about-section">
          <h3>项目介绍</h3>
          <p>
            LM Web 是一个基于 Vue 3、TypeScript 和 Ant Design Vue 构建的现代化前端项目，采用
            Monorepo 架构管理多个子项目。
          </p>
          <p>该项目旨在提供一个可扩展、易维护的企业级前端解决方案，支持组件复用和统一管理。</p>
        </div>

        <div class="about-section">
          <h3>技术栈</h3>
          <a-tag color="blue">Vue 3</a-tag>
          <a-tag color="green">TypeScript</a-tag>
          <a-tag color="orange">Ant Design Vue</a-tag>
          <a-tag color="purple">Vite</a-tag>
          <a-tag color="magenta">pnpm</a-tag>
        </div>

        <div class="about-section">
          <h3>项目结构</h3>
          <pre>{{ projectStructure }}</pre>
        </div>
      </div>
    </a-card>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  // 按需引入Ant Design Vue组件
  // Ant Design Vue v4 重置样式
  import 'ant-design-vue/dist/reset.css';

  // 项目结构说明
  const projectStructure = ref(`
  ├── apps/
  │   └── web-antd/         # 基于 Ant Design 的 Web 应用
  ├── packages/
  │   ├── components/       # 共享组件库
  │   ├── utils/            # 工具函数库
  │   └── types/            # 类型定义
  ├── internal/
  │   ├── vite-config/      # 共享 Vite 配置
  │   └── lint-configs/     # 代码规范配置
  ├── playground/           # 开发测试环境
  ├── scripts/              # 构建和部署脚本
  └── docs/                 # 项目文档
`);
</script>

<style scoped>
  .about-container {
    padding: 0;
  }

  .about-content {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  .about-section {
    margin-bottom: 16px;
  }

  h3 {
    font-size: 18px;
    margin-bottom: 12px;
    color: #333;
  }

  p {
    line-height: 1.6;
    color: #666;
    margin-bottom: 12px;
  }

  pre {
    background-color: #f6f8fa;
    padding: 16px;
    border-radius: 4px;
    font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
    font-size: 14px;
    line-height: 1.5;
    overflow-x: auto;
    white-space: pre-wrap;
    word-wrap: break-word;
    border: 1px solid #e1e4e8;
  }

  /* 响应式调整 */
  @media (max-width: 768px) {
    .about-content {
      gap: 20px;
    }

    h3 {
      font-size: 16px;
    }

    pre {
      font-size: 12px;
    }
  }
</style>
