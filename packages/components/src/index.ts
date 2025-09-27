/**
 * 组件库入口
 */

import HelloWorld from './components/HelloWorld.vue';

export { default as HelloWorld } from './components/HelloWorld.vue';

// 导出所有组件作为插件
export default {
  install(app: import('vue').App) {
    app.component('HelloWorld', HelloWorld);
  },
};