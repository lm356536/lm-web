<template>
  <div class="home-container">
    <a-card :title="pageTitle" :bordered="false">
      <p class="page-description">
        欢迎使用 LM Web 管理系统，这是一个基于 Vue 3、TypeScript 和 Ant Design Vue
        构建的现代化应用。
      </p>

      <div class="feature-section">
        <h3>组件展示</h3>
        <!-- 使用我们开发的 HelloWorld 组件 -->
        <HelloWorld
          :title="'欢迎使用 LM Web 组件库'"
          :message="'这是我们的第一个共享组件示例'"
          :showCount="true"
          @click="handleHelloWorldClick"
        />

        <!-- 使用我们开发的 LmInput 组件 -->
        <div class="input-demo" style="margin-top: 30px">
          <h4>LmInput 组件示例</h4>
          <LmInput
            v-model="inputValue"
            :placeholder="'请输入内容'"
            :size="'medium'"
            @input="handleInput"
            @focus="handleInputFocus"
            @blur="handleInputBlur"
          />
          <p style="margin-top: 10px">输入值: {{ inputValue }}</p>

          <!-- 不同尺寸的输入框 -->
          <div style="margin-top: 20px">
            <h5>不同尺寸:</h5>
            <LmInput
              v-model="smallInput"
              :placeholder="'小尺寸'"
              :size="'small'"
              style="width: 200px; margin-right: 10px; margin-bottom: 10px"
            />
            <LmInput
              v-model="mediumInput"
              :placeholder="'中尺寸'"
              :size="'middle'"
              style="width: 200px; margin-right: 10px; margin-bottom: 10px"
            />
            <LmInput
              v-model="largeInput"
              :placeholder="'大尺寸'"
              :size="'large'"
              style="width: 200px; margin-bottom: 10px"
            />
          </div>

          <!-- 禁用状态 -->
          <div style="margin-top: 20px">
            <h5>禁用状态:</h5>
            <LmInput
              v-model="disabledInput"
              :placeholder="'禁用状态'"
              :disabled="true"
              style="width: 200px"
            />
          </div>
        </div>

        <h3 style="margin-top: 30px">示例组件</h3>
        <a-menu mode="inline" style="width: 200px">
          <a-menu-item key="1">
            <router-link to="/">首页</router-link>
          </a-menu-item>
          <a-menu-item key="3">
            <router-link to="/about">关于我们</router-link>
          </a-menu-item>
        </a-menu>
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
              <a-card-meta title="共享组件库" description="可复用的组件和工具函数" />
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
  // 按需引入Ant Design Vue组件和功能
  import { message } from 'ant-design-vue';
  // Ant Design Vue v4 重置样式
  import 'ant-design-vue/dist/reset.css';

  // 导入我们的组件
  import { HelloWorld, LmInput } from '@lm/components';

  // 页面标题
  const pageTitle = ref('欢迎来到 LM Web 管理系统');

  // 输入框相关数据
  const inputValue = ref('');
  const smallInput = ref('');
  const mediumInput = ref('');
  const largeInput = ref('');
  const disabledInput = ref('禁用的输入框');

  // 处理 HelloWorld 组件的点击事件
  const handleHelloWorldClick = () => {
    message.success('HelloWorld 组件被点击了');
  };

  // 处理输入事件
  const handleInput = (_event: Event) => {
    // 生产环境应移除 console 语句
    // console.log('输入内容变化:', inputValue.value);
  };

  // 处理聚焦事件
  const handleInputFocus = () => {
    // 生产环境应移除 console 语句
    // console.log('输入框聚焦');
  };

  // 处理失焦事件
  const handleInputBlur = () => {
    // 生产环境应移除 console 语句
    // console.log('输入框失焦');
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

  h4 {
    font-size: 16px;
    margin-bottom: 10px;
    color: #333;
  }

  h5 {
    font-size: 14px;
    margin-bottom: 10px;
    color: #666;
  }
</style>
