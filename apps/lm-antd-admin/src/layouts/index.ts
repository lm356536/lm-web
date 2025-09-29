// 异步导入布局组件
const BasicLayout = () => import('./basic.vue');
const AuthLayout = () => import('./auth.vue'); // 导出认证布局用于登录页面

export { BasicLayout, AuthLayout };
