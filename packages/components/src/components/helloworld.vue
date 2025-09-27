<template>
  <div class="hello-world">
    <div class="hello-world__header">
      <h1>{{ title }}</h1>
    </div>
    <div class="hello-world__content">
      <p>{{ message }}</p>
      <a-button type="primary" @click="handleClick">点击我</a-button>
    </div>
    <div v-if="showCount" class="hello-world__counter">
      点击次数: {{ count }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { Button as AButton } from 'ant-design-vue';

// Props 类型定义
interface Props {
  title?: string;
  message?: string;
  showCount?: boolean;
}

// Emits 类型定义
const emit = defineEmits<{
  click: [];
  countChange: [count: number];
}>();

// 定义组件 Props
const props = withDefaults(defineProps<Props>(), {
  title: 'Hello World',
  message: '这是一个示例组件',
  showCount: false,
});

// 响应式数据
const count = ref(0);

// 计算属性 - 格式化标题
const formattedTitle = computed(() => {
  return `🎯 ${props.title}`;
});

// 方法
const handleClick = () => {
  count.value++;
  emit('click');
  emit('countChange', count.value);
};

// 暴露方法给父组件
defineExpose({
  resetCount: () => {
    count.value = 0;
    emit('countChange', 0);
  },
  getCount: () => count.value,
});
</script>

<style scoped>
.hello-world {
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
}

.hello-world:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}

.hello-world__header {
  margin-bottom: 16px;
}

.hello-world__header h1 {
  margin: 0;
  color: #1890ff;
}

.hello-world__content {
  margin-bottom: 16px;
}

.hello-world__content p {
  margin-bottom: 16px;
  color: #333;
}

.hello-world__counter {
  padding-top: 16px;
  border-top: 1px solid #e8e8e8;
  color: #666;
}
</style>