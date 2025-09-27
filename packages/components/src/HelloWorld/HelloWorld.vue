<script setup lang="ts">
  import { ref } from 'vue';
  import type { HelloWorldProps, HelloWorldEmits, HelloWorldInstance } from './HelloWorld';

  // 定义props
  withDefaults(defineProps<HelloWorldProps>(), {
    title: 'Hello World',
    message: 'Welcome to your Vue3 + TypeScript project!',
    showCount: true,
  });

  // 定义emits
  const emit = defineEmits<HelloWorldEmits>();

  // 响应式数据
  const count = ref(0);

  // 方法
  const handleClick = (event: MouseEvent) => {
    emit('click', event);
  };

  const incrementCount = () => {
    count.value++;
    emit('countChange', count.value);
  };

  // 暴露方法给父组件
  defineExpose<HelloWorldInstance>({
    incrementCount,
    count,
  });
</script>

<template>
  <div class="hello-world">
    <h1 class="hello-world__title" @click="handleClick">{{ title }}</h1>
    <p v-if="message" class="hello-world__message">{{ message }}</p>
    <div v-if="showCount" class="hello-world__count-section">
      <p class="hello-world__count-text">Count: {{ count }}</p>
      <button class="hello-world__increment-btn" @click="incrementCount">Increment</button>
    </div>
  </div>
</template>

<style scoped>
  :root {
    /* 组件本地CSS变量，可被全局变量覆盖 */
    --hello-world-bg-color: #f0f2f5;
    --hello-world-border-radius: 8px;
    --hello-world-padding: 20px;
    --hello-world-title-color: var(--color-primary, #1890ff);
    --hello-world-button-bg: var(--color-primary, #1890ff);
    --hello-world-button-hover-bg: var(--color-primary-hover, #40a9ff);
    --hello-world-section-bg: #fff;
    --hello-world-section-padding: 10px;
    --hello-world-section-radius: 4px;
    --hello-world-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  .hello-world {
    padding: var(--hello-world-padding);
    background-color: var(--hello-world-bg-color);
    border-radius: var(--hello-world-border-radius);
    box-shadow: var(--hello-world-shadow);
  }

  .hello-world__title {
    color: var(--hello-world-title-color);
    cursor: pointer;
    margin-bottom: 16px;
    font-size: 24px;
  }

  .hello-world__message {
    margin-bottom: 16px;
    font-size: 14px;
    line-height: 1.5;
  }

  .hello-world__count-section {
    margin-top: 20px;
    padding: var(--hello-world-section-padding);
    background-color: var(--hello-world-section-bg);
    border-radius: var(--hello-world-section-radius);
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .hello-world__count-text {
    margin: 0;
  }

  .hello-world__increment-btn {
    padding: 4px 12px;
    background-color: var(--hello-world-button-bg);
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  .hello-world__increment-btn:hover {
    background-color: var(--hello-world-button-hover-bg);
  }
</style>
