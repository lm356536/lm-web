import { createApp } from 'vue';
import App from './App.vue';
// 移除全量引入，改为在各组件中按需引入
import router from './router';
import { HelloWorld } from '@lm/components';

// 创建Vue应用实例
const app = createApp(App);

// 注册HelloWorld组件
app.component('HelloWorld', HelloWorld);

// 使用路由
app.use(router);

// 挂载应用
app.mount('#app');
