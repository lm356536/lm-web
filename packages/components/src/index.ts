/**
 * 组件库入口
 */

import HelloWorld from './HelloWorld/HelloWorld.vue';
import LmInput from './LmInput/LmInput.vue';

export { default as HelloWorld } from './HelloWorld/HelloWorld.vue';
export { default as LmInput } from './LmInput/LmInput.vue';

// 命名导出所有组件类型
export type { HelloWorldProps, HelloWorldEmits, HelloWorldInstance } from './HelloWorld/HelloWorld';
export type { LmInputProps, LmInputEmits, LmInputInstance } from './LmInput/LmInput';

// 导出所有组件作为插件
export default {
  install(app: import('vue').App) {
    app.component('HelloWorld', HelloWorld);
    app.component('LmInput', LmInput);
  },
};
