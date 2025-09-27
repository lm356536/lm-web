<script setup lang="ts">
  import { ref } from 'vue';

  // Props定义
  interface Props {
    title: string;
    message?: string;
    showCount?: boolean;
  }

  // 定义props
  withDefaults(defineProps<Props>(), {
    title: 'Hello World',
    message: 'Welcome to your Vue3 + TypeScript project!',
    showCount: true,
  });

  // Emits定义
  interface Emits {
    (e: 'click', event: MouseEvent): void;
    (e: 'countChange', count: number): void;
  }

  const emit = defineEmits<Emits>();

  // 响应式数据
  const count = ref(0);

  // 方法
  const handleClick = () => {
    emit('click', new MouseEvent('click'));
  };

  const incrementCount = () => {
    count.value++;
    emit('countChange', count.value);
  };

  // 暴露方法给父组件
  defineExpose({
    incrementCount,
  });
</script>

<template>
  <div class="hello-world">
    <h1 @click="handleClick">{{ title }}</h1>
    <p v-if="message">{{ message }}</p>
    <div v-if="showCount" class="count-section">
      <p>Count: {{ count }}</p>
      <button @click="incrementCount">Increment</button>
    </div>
  </div>
</template>

<style scoped>
  .hello-world {
    padding: 20px;
    background-color: #f0f2f5;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  h1 {
    color: #1890ff;
    cursor: pointer;
    margin-bottom: 16px;
  }

  .count-section {
    margin-top: 20px;
    padding: 10px;
    background-color: #fff;
    border-radius: 4px;
  }

  button {
    padding: 4px 12px;
    background-color: #1890ff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-left: 10px;
  }

  button:hover {
    background-color: #40a9ff;
  }
</style>
