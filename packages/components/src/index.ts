/**
 * 组件库入口
 */

import HelloWorld from './HelloWorld/HelloWorld.vue';

export { default as HelloWorld } from './HelloWorld/HelloWorld.vue';

// 导出所有组件作为插件
export default {
  install(app: import('vue').App) {
    app.component('HelloWorld', HelloWorld);
  },
};
