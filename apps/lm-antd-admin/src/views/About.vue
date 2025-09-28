<template>
  <div class="components-container">
    <a-card title="组件库展示" :bordered="false">
      <div class="components-layout">
        <!-- 组件菜单区域 -->
        <div class="components-menu">
          <h3>组件导航</h3>
          <a-menu
            v-model:selectedKeys="selectedComponent"
            mode="inline"
            style="width: 256px"
            @select="handleComponentSelect"
          >
            <!-- 基础组件菜单项 -->
            <a-sub-menu key="basic" title="基础组件">
              <a-menu-item key="HelloWorld">HelloWorld</a-menu-item>
              <a-menu-item key="LmInput">LmInput</a-menu-item>
            </a-sub-menu>
          </a-menu>
        </div>

        <!-- 组件内容展示区域 -->
        <div class="components-content">
          <div v-if="selectedComponent">
            <!-- 组件示例 -->
            <a-card title="示例" :bordered="false" class="demo-card">
              <template v-if="selectedComponent === 'HelloWorld'">
                <HelloWorld :title="helloWorldTitle" @click="handleHelloWorldClick" />
              </template>
              <template v-else-if="selectedComponent === 'LmInput'">
                <LmInput
                  v-model="inputValue"
                  placeholder="请输入内容"
                  @change="handleInputChange"
                />
                <p>输入值: {{ inputValue }}</p>
              </template>
            </a-card>
          </div>
        </div>
      </div>
    </a-card>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { message } from 'ant-design-vue';
  import { HelloWorld, LmInput } from '@lm/components';

  // 当前选中的组件
  const selectedComponent = ref('HelloWorld');

  // HelloWorld组件相关数据
  const helloWorldTitle = ref('Hello World!');

  // 输入框相关数据
  const inputValue = ref('');

  // 处理组件选择事件
  const handleComponentSelect = ({ key }: { key: string }) => {
    selectedComponent.value = key;
  };

  // 处理 HelloWorld 组件的点击事件
  const handleHelloWorldClick = () => {
    message.success('HelloWorld 组件被点击了');
  };

  // 处理输入框变化
  const handleInputChange = (_value: string) => {
    // 开发环境的调试日志
  };
</script>

<style scoped>
  .components-container {
    padding: 0;
  }

  .components-layout {
    display: flex;
    gap: 24px;
  }

  .components-menu {
    flex-shrink: 0;
    background: #fff;
    border-radius: 8px;
    padding: 16px;
    height: fit-content;
  }

  .components-menu h3 {
    margin-bottom: 16px;
    font-size: 16px;
    color: #333;
  }

  .components-content {
    flex: 1;
  }

  .demo-card {
    margin-bottom: 24px;
    overflow: hidden;
  }

  /* 响应式调整 */
  @media (max-width: 768px) {
    .components-layout {
      flex-direction: column;
    }

    .components-menu {
      width: 100%;
    }

    .components-menu .ant-menu {
      width: 100%;
    }
  }
</style>
