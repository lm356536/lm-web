<template>
  <div class="playground">
    <header class="playground__header">
      <h1>LM Web 组件测试平台</h1>
      <p>测试 HelloWorld 组件</p>
    </header>

    <main class="playground__content">
      <!-- 使用 @lm/components 中的 HelloWorld 组件 -->
      <HelloWorld
        ref="helloWorldRef"
        :title="title"
        :message="message"
        :showCount="showCount"
        @click="handleComponentClick"
        @countChange="handleCountChange"
      />

      <div class="playground__controls">
        <h2>组件参数控制</h2>

        <div class="form-item">
          <a-input
            v-model:value="title"
            placeholder="输入标题"
            style="width: 300px; margin-bottom: 16px"
          />
        </div>

        <div class="form-item">
          <a-input-text-area
            v-model:value="message"
            placeholder="输入消息内容"
            :rows="3"
            style="width: 300px; margin-bottom: 16px"
          />
        </div>

        <div class="form-item">
          <a-switch
            v-model:checked="showCount"
            checked-children="显示计数"
            un-checked-children="隐藏计数"
          />
        </div>

        <div class="form-item">
          <a-button type="primary" @click="resetCounter">重置计数</a-button>
        </div>
      </div>

      <div class="playground__logs">
        <h2>事件日志</h2>
        <div v-if="logs.length === 0" class="no-logs">暂无事件</div>
        <div v-else class="log-items">
          <div v-for="(log, index) in logs" :key="index" class="log-item">
            {{ log }}
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { Button as AButton, Input as AInput, Switch as ASwitch } from 'ant-design-vue';
  import { HelloWorld } from '@lm/components';

  // 组件实例引用
  const helloWorldRef = ref<InstanceType<typeof HelloWorld> | null>(null);

  // 组件参数
  const title = ref<string>('Hello LM Web');
  const message = ref<string>('欢迎使用 LM Web 组件库');
  const showCount = ref<boolean>(true);
  const currentCount = ref<number>(0);

  // 事件日志
  const logs = ref<string[]>([]);

  // 处理组件点击事件
  const handleComponentClick = (): void => {
    addLog('组件被点击了');
  };

  // 处理计数变化事件
  const handleCountChange = (count: number): void => {
    currentCount.value = count;
    addLog(`计数更新: ${count}`);
  };

  // 重置计数
  const resetCounter = (): void => {
    if (helloWorldRef.value) {
      helloWorldRef.value.resetCount();
      addLog('计数已重置');
    }
  };

  // 添加日志
  const addLog = (log: string): void => {
    const timestamp = new Date().toLocaleTimeString();
    logs.value.unshift(`[${timestamp}] ${log}`);

    // 保留最新的10条日志
    if (logs.value.length > 10) {
      logs.value = logs.value.slice(0, 10);
    }
  };

  // 组件挂载后
  onMounted(() => {
    addLog('应用已启动');
  });
</script>

<style scoped>
  .playground {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
  }

  .playground__header {
    text-align: center;
    margin-bottom: 40px;
  }

  .playground__header h1 {
    color: #1890ff;
    margin-bottom: 10px;
  }

  .playground__content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 30px;
    margin-bottom: 30px;
  }

  .playground__controls,
  .playground__logs {
    background: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  .playground__controls h2,
  .playground__logs h2 {
    margin-top: 0;
    margin-bottom: 20px;
    font-size: 18px;
    color: #333;
  }

  .form-item {
    margin-bottom: 16px;
  }

  .no-logs {
    color: #999;
    text-align: center;
    padding: 20px;
  }

  .log-items {
    max-height: 300px;
    overflow-y: auto;
    border: 1px solid #f0f0f0;
    border-radius: 4px;
  }

  .log-item {
    padding: 8px 12px;
    border-bottom: 1px solid #f0f0f0;
    font-size: 14px;
    color: #666;
  }

  .log-item:last-child {
    border-bottom: none;
  }

  /* 响应式调整 */
  @media (max-width: 768px) {
    .playground__content {
      grid-template-columns: 1fr;
    }
  }
</style>
