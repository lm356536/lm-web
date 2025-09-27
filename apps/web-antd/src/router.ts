import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

// 定义路由
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
    meta: { title: '首页' },
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/About.vue'),
    meta: { title: '关于我们' },
  },
  {
    // 404页面
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/NotFound.vue'),
    meta: { title: '页面不存在' },
  },
];

// 创建路由实例
const router = createRouter({
  history: createWebHistory(),
  routes,
  // 滚动行为
  scrollBehavior: () => ({
    top: 0,
    behavior: 'smooth',
  }),
});

// 全局前置守卫 - 设置页面标题
router.beforeEach((to, _from, next) => {
  // 设置页面标题
  if (to.meta.title) {
    document.title = `${to.meta.title} - LM Web`;
  }
  next();
});

export default router;
