<template>
  <div class="home">
    <a-card title="欢迎使用LM Web管理系统" :bordered="false">
      <template #extra>
        <a-button type="primary" @click="fetchData">刷新数据</a-button>
      </template>

      <div class="system-info">
        <h2>{{ t('welcomeMessage') }}</h2>
        <p>{{ t('systemDescription') }}</p>

        <a-row :gutter="[16, 16]" class="stats-row">
          <a-col :xs="24" :sm="12" :lg="6">
            <a-statistic
              title="用户总数"
              :value="stats.users"
              :precision="0"
              :value-style="{ color: '#3f8600' }"
              prefix-icon="user-outlined"
              suffix="人"
            />
          </a-col>
          <a-col :xs="24" :sm="12" :lg="6">
            <a-statistic
              title="组件数量"
              :value="stats.components"
              :precision="0"
              :value-style="{ color: '#1890ff' }"
              prefix-icon="appstore-outlined"
              suffix="个"
            />
          </a-col>
          <a-col :xs="24" :sm="12" :lg="6">
            <a-statistic
              title="今日访问"
              :value="stats.todayVisits"
              :precision="0"
              :value-style="{ color: '#fa8c16' }"
              prefix-icon="eye-outlined"
              suffix="次"
            />
          </a-col>
          <a-col :xs="24" :sm="12" :lg="6">
            <a-statistic
              title="系统版本"
              value="v1.0.0"
              :value-style="{ color: '#722ed1' }"
              prefix-icon="code-outlined"
            />
          </a-col>
        </a-row>
      </div>

      <div class="recent-activities">
        <h3>{{ t('recentActivities') }}</h3>
        <a-list item-layout="horizontal" :data-source="activities">
          <template #renderItem="{ item }">
            <a-list-item>
              <a-list-item-meta>
                <template #avatar>
                  <a-avatar icon="clock-circle-outlined" />
                </template>
                <template #title>
                  <a href="#">{{ item.title }}</a>
                </template>
                <template #description>
                  {{ item.time }}
                </template>
              </a-list-item-meta>
              <a-tag :color="item.type">{{ item.type }}</a-tag>
            </a-list-item>
          </template>
        </a-list>
      </div>

      <div class="feature-section" style="margin-top: 30px">
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
        </div>
      </div>
    </a-card>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { store } from '@/store';
  import { useI18n } from '@/locales';
  // 移除未使用的导入
  import { message } from 'ant-design-vue';

  // 导入我们的组件
  import { HelloWorld, LmInput } from '@lm/components';

  // 使用国际化
  const { t } = useI18n();

  // 仪表盘统计数据
  const stats = ref({
    users: 128,
    components: 45,
    todayVisits: 256,
  });

  // 活动列表
  const activities = ref([
    { id: 1, title: '系统已更新到最新版本', time: '10分钟前', type: 'success' },
    { id: 2, title: '新增了5个组件', time: '1小时前', type: 'info' },
    { id: 3, title: '完成了数据备份', time: '3小时前', type: 'default' },
    { id: 4, title: '修复了已知问题', time: '昨天', type: 'warning' },
  ]);

  // 输入框相关数据
  const inputValue = ref('');

  // 获取数据
  const fetchData = async () => {
    try {
      store.setLoading(true);
      // 在实际应用中，这里会调用API获取数据
      // const response = await fetchDashboardStats();
      // stats.value = response.data;

      // 模拟API调用延迟
      await new Promise(resolve => setTimeout(resolve, 500));

      // 模拟更新数据
      stats.value = {
        users: Math.floor(Math.random() * 200) + 100,
        components: Math.floor(Math.random() * 50) + 30,
        todayVisits: Math.floor(Math.random() * 300) + 200,
      };
    } catch (error) {
      // 错误处理，在实际应用中可能需要更复杂的错误处理逻辑
      store.setError(t('fetchDataFailed'));
    } finally {
      store.setLoading(false);
    }
  };

  // 处理 HelloWorld 组件的点击事件
  const handleHelloWorldClick = () => {
    message.success('HelloWorld 组件被点击了');
  };

  // 处理输入事件
  const handleInput = (_event: Event) => {
    // 移除开发环境的调试日志
  };

  // 处理聚焦事件
  const handleInputFocus = () => {
    // 移除开发环境的调试日志
  };

  // 处理失焦事件
  const handleInputBlur = () => {
    // 移除开发环境的调试日志
  };

  // 组件挂载时获取数据
  onMounted(() => {
    fetchData();
  });
</script>

<style scoped>
  .home {
    padding: 0;
  }

  .system-info {
    margin-bottom: 32px;
  }

  .system-info h2 {
    margin-bottom: 16px;
    color: #1890ff;
  }

  .system-info p {
    margin-bottom: 24px;
    color: #666;
    font-size: 16px;
  }

  .stats-row {
    margin-bottom: 24px;
  }

  .recent-activities h3 {
    margin-bottom: 16px;
    color: #333;
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
</style>
