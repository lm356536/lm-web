/**
 * 组件库入口
 */

export { default as HelloWorld } from './components/HelloWorld.vue';

// 导出所有组件作为插件
export default {
  install(app) {
    app.component('HelloWorld', HelloWorld);
  },
};