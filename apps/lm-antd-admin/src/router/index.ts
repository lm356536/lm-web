import { defineAsyncComponent } from 'vue';
import {
  createRouter,
  createWebHistory,
  RouteRecordRaw,
  NavigationGuardNext,
  RouteLocationNormalized,
} from 'vue-router';
import { App } from 'vue';
import { BasicLayout } from '@/layouts';

// 导入认证布局（如果需要的话）
// import { AuthLayout } from '@/layouts'; // 暂时注释，因为我们还没有登录页面

// 路由配置
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: BasicLayout,
    children: [
      {
        path: '',
        name: 'Home',
        component: defineAsyncComponent(() => import('@/views/Home.vue')),
        meta: {
          title: '首页',
          requiresAuth: false,
        },
      },
      {
        path: 'about',
        name: 'About',
        component: defineAsyncComponent(() => import('@/views/About.vue')),
        meta: {
          title: '关于我们',
          requiresAuth: false,
        },
      },
    ],
  },
  {
    // 404页面
    path: '/404',
    name: 'NotFound',
    component: defineAsyncComponent(() => import('@/views/NotFound.vue')),
    meta: {
      title: '页面不存在',
    },
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
  },
];

// 创建路由实例
const router = createRouter({
  history: createWebHistory(import.meta.env?.BASE_URL || '/'),
  routes,
  // 滚动行为
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return { top: 0 };
  },
});

// 路由守卫 - 全局前置守卫
router.beforeEach(
  (_to: RouteLocationNormalized, _from: RouteLocationNormalized, next: NavigationGuardNext) => {
    // 设置页面标题
    document.title = `${_to.meta.title || 'LM Admin'} - LM Web`;

    // 权限验证
    if (_to.meta.requiresAuth) {
      const token = localStorage.getItem('authToken');
      if (!token) {
        // 未登录，跳转到登录页（如果有）
        // next({ name: 'Login' });

        next();
      } else {
        next();
      }
    } else {
      next();
    }
  },
);

// 路由守卫 - 全局后置守卫
router.afterEach((_to, _from) => {
  // 可以在这里添加页面访问日志等功能
});

/**
 * 设置路由
 * @param app Vue应用实例
 */
export async function setupRouter(app: App): Promise<void> {
  app.use(router);

  // 等待路由初始化
  await router.isReady();
}

export default router;
