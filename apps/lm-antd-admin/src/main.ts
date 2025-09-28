import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
// Ant Design Vue v4 重置样式
import 'ant-design-vue/dist/reset.css';
// 全局部分注册 ant-design-vue 组件
import { Button, message, Layout, Menu, Dropdown } from 'ant-design-vue';
// 导入我们的组件库
import LmComponents from '@lm/components';

// 创建Vue应用实例
const app = createApp(App);

// 使用路由
app.use(router);

// 注册组件（会自动注册组件下的子组件）
app.use(Button);
app.use(Layout);
app.use(Menu);
app.use(Dropdown);
// 使用我们的组件库
app.use(LmComponents);

// 将 message 挂载到全局属性上
app.config.globalProperties.$message = message;

// 挂载应用
app.mount('#app');
