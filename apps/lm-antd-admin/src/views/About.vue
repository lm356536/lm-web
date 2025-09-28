<template>
  <div class="components-container">
    <a-card :title="'组件库展示'" :bordered="false">
      <div class="components-layout">
        <!-- 组件菜单区域 -->
        <div class="components-menu">
          <h3>组件导航</h3>
          <a-menu
            v-model:selectedKeys="selectedComponent"
            mode="inline"
            :style="{ width: '256px' }"
            @select="handleComponentSelect"
          >
            <!-- 基础组件菜单项 -->
            <a-sub-menu key="basic" title="基础组件">
              <a-menu-item key="HelloWorld">HelloWorld</a-menu-item>
              <a-menu-item key="LmInput">LmInput</a-menu-item>
            </a-sub-menu>
            
            <!-- 表单组件菜单项 -->
            <a-sub-menu key="form" title="表单组件">
              <a-menu-item key="FormDemo">表单示例</a-menu-item>
              <a-menu-item key="FormLayout">表单布局</a-menu-item>
            </a-sub-menu>
            
            <!-- 数据展示组件菜单项 -->
            <a-sub-menu key="data-display" title="数据展示组件">
              <a-menu-item key="TableDemo">表格示例</a-menu-item>
              <a-menu-item key="CardDemo">卡片示例</a-menu-item>
            </a-sub-menu>
            
            <!-- 反馈组件菜单项 -->
            <a-sub-menu key="feedback" title="反馈组件">
              <a-menu-item key="ModalDemo">弹窗示例</a-menu-item>
              <a-menu-item key="MessageDemo">消息通知示例</a-menu-item>
            </a-sub-menu>
          </a-menu>
        </div>
        
        <!-- 组件内容展示区域 -->
        <div class="components-content">
          <div class="component-header">
            <h2>{{ currentComponentTitle }}</h2>
            <p>{{ currentComponentDescription }}</p>
          </div>
          
          <div class="component-demo">
            <!-- 根据选中的组件显示对应的内容 -->
            <template v-if="selectedComponent === 'HelloWorld'">
              <h3>HelloWorld 组件示例</h3>
              <HelloWorld title="来自共享组件库" @click="handleHelloWorldClick" />
              <div class="component-description">
                <h4>组件介绍</h4>
                <p>HelloWorld 是一个简单的示例组件，用于展示如何在 Monorepo 架构中共享组件。</p>
                <h4>使用方法</h4>
                <pre>{{ helloWorldCode }}</pre>
              </div>
            </template>
            
            <template v-else-if="selectedComponent === 'LmInput'">
              <h3>LmInput 组件示例</h3>
              <div class="input-demos">
                <div class="demo-item">
                  <h4>基础用法</h4>
                  <LmInput v-model="inputValue" :placeholder="'请输入内容'" />
                  <p>输入值: {{ inputValue }}</p>
                </div>
                
                <div class="demo-item">
                  <h4>不同尺寸</h4>
                  <div class="size-demos">
                    <LmInput
                      v-model="smallInput"
                      :placeholder="'小尺寸'"
                      :size="'small'"
                      style="width: 200px; margin-right: 10px; margin-bottom: 10px"
                    />
                    <LmInput
                      v-model="middleInput"
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
                </div>
                
                <div class="demo-item">
                  <h4>禁用状态</h4>
                  <LmInput
                    v-model="disabledInput"
                    :placeholder="'禁用状态'"
                    :disabled="true"
                    style="width: 200px"
                  />
                </div>
              </div>
              
              <div class="component-description">
                <h4>组件介绍</h4>
                <p>LmInput 是基于 Ant Design Vue Input 组件的二次封装，提供了统一的样式和功能。</p>
                <h4>使用方法</h4>
                <pre>{{ lmInputCode }}</pre>
              </div>
            </template>
            
            <template v-else>
              <div class="component-placeholder">
                <a-empty description="请选择要查看的组件" />
              </div>
            </template>
          </div>
        </div>
      </div>
    </a-card>
  </div>
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue';
  // 引入 Ant Design Vue 组件
  import { Empty, message } from 'ant-design-vue';
  // Ant Design Vue v4 重置样式
  import 'ant-design-vue/dist/reset.css';
  
  // 引入我们的组件库中的组件
  import { HelloWorld, LmInput } from '@lm/components';
  
  // 当前选中的组件
  const selectedComponent = ref('');
  
  // 输入框相关数据
  const inputValue = ref('');
  const smallInput = ref('');
  const middleInput = ref('');
  const largeInput = ref('');
  const disabledInput = ref('禁用的输入框');
  
  // 根据选中的组件计算当前组件标题
  const currentComponentTitle = computed(() => {
    switch (selectedComponent.value) {
      case 'HelloWorld':
        return 'HelloWorld 组件';
      case 'LmInput':
        return 'LmInput 组件';
      default:
        return '组件库';
    }
  });
  
  // 根据选中的组件计算当前组件描述
  const currentComponentDescription = computed(() => {
    switch (selectedComponent.value) {
      case 'HelloWorld':
        return '一个简单的示例组件，用于展示组件的基本用法';
      case 'LmInput':
        return '基于 Ant Design Vue Input 组件的二次封装';
      default:
        return '选择左侧菜单查看组件详情和示例';
    }
  });
  
  // HelloWorld 组件使用代码
  const helloWorldCode = `import { HelloWorld } from '@lm/components';

<HelloWorld 
  title="来自共享组件库" 
  @click="handleHelloWorldClick" 
/>`;
  
  // LmInput 组件使用代码
  const lmInputCode = `import { LmInput } from '@lm/components';

// 基础用法
<LmInput v-model="inputValue" placeholder="请输入内容" />

// 不同尺寸
<LmInput 
  v-model="inputValue" 
  placeholder="小尺寸" 
  size="small" 
/>

// 禁用状态
<LmInput 
  v-model="inputValue" 
  placeholder="禁用状态" 
  :disabled="true" 
/>`;
  
  // 处理组件选择事件
  const handleComponentSelect = ({ key }: { key: string }) => {
    selectedComponent.value = key;
  };
  
  // 处理 HelloWorld 组件的点击事件
  const handleHelloWorldClick = () => {
    message.success('HelloWorld 组件被点击了');
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
  }
  
  .components-menu h3 {
    margin-bottom: 16px;
    font-size: 16px;
    color: #333;
  }
  
  .components-content {
    flex: 1;
  }
  
  .component-header {
    margin-bottom: 24px;
    padding-bottom: 16px;
    border-bottom: 1px solid #f0f0f0;
  }
  
  .component-header h2 {
    margin: 0 0 8px 0;
    font-size: 20px;
    font-weight: 500;
    color: #333;
  }
  
  .component-header p {
    margin: 0;
    color: #666;
  }
  
  .component-demo {
    min-height: 300px;
  }
  
  .component-placeholder {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 300px;
  }
  
  .input-demos {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }
  
  .demo-item h4 {
    margin-bottom: 16px;
    font-size: 16px;
    color: #333;
  }
  
  .size-demos {
    display: flex;
    flex-wrap: wrap;
  }
  
  .component-description {
    margin-top: 32px;
    padding: 16px;
    background-color: #f5f5f5;
    border-radius: 4px;
  }
  
  .component-description h4 {
    margin: 0 0 8px 0;
    font-size: 16px;
    color: #333;
  }
  
  .component-description p {
    margin: 0 0 16px 0;
    color: #666;
  }
  
  .component-description pre {
    background-color: #282c34;
    color: #abb2bf;
    padding: 16px;
    border-radius: 4px;
    overflow-x: auto;
    font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
    font-size: 14px;
    line-height: 1.5;
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
