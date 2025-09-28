// 异步导入布局组件
const BasicLayout = () => import('./basic.vue');
const AuthLayout = () => import('./auth.vue');

export { BasicLayout, AuthLayout };
