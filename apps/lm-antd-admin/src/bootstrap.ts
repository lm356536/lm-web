import { createApp, type App as AppType, type Component } from 'vue';
import { setupRouter } from './router';
import { setupStore } from './store';
import { setupI18n } from './locales';
import { setupAntd } from './adapter/component';
import { loadPreferences, applyPreferencesToApp } from './preferences';

/**
 * 引导应用程序启动
 * 整合所有初始化逻辑，包括路由、状态管理、国际化、UI组件等
 *
 * @param rootComponent 根组件
 * @returns 应用实例和初始化状态
 */
export async function bootstrapApp(rootComponent: Component): Promise<{
  app: AppType;
  isReady: boolean;
}> {
  // 创建应用实例
  const app = createApp(rootComponent);

  try {
    // 执行现有的bootstrap函数
    await bootstrap(app);

    // 添加额外的初始化逻辑
    setupErrorHandling(app);
    setupGlobalDirectives(app);

    return {
      app,
      isReady: true,
    };
  } catch (error) {
    // 记录初始化错误
    // 生产环境可以发送错误到监控服务
    return {
      app,
      isReady: false,
    };
  }
}

/**
 * 应用引导启动函数
 * 按顺序初始化各个模块
 */
export async function bootstrap(app: AppType) {
  // 1. 加载用户偏好设置
  await loadPreferences();

  // 2. 初始化国际化
  await setupI18n(app);

  // 3. 初始化状态管理
  setupStore(app);

  // 4. 初始化组件适配
  setupAntd(app);

  // 5. 应用用户偏好设置到应用实例
  applyPreferencesToApp(app);

  // 6. 初始化路由
  await setupRouter(app);
}

/**
 * 设置全局错误处理
 * @param app 应用实例
 */
function setupErrorHandling(app: AppType): void {
  // 未使用参数用下划线前缀标记
  app.config.errorHandler = (_err, _instance, _info) => {
    // 开发环境的调试日志可以在这里启用
    // console.log('Error:', _err);
  };
}

/**
 * 设置全局指令和混入
 * @param app 应用实例
 */
function setupGlobalDirectives(app: AppType): void {
  // 示例：创建一个防抖指令
  app.directive('debounce', {
    mounted(el, binding) {
      let timer: number | null = null;
      el.addEventListener('click', (event: Event) => {
        if (timer) clearTimeout(timer);
        timer = window.setTimeout(() => {
          binding.value(event);
        }, binding.arg || 300);
      });
    },
  });

  // 示例：创建一个权限检查指令
  app.directive('permission', {
    mounted(_el, _binding) {
      // 这里可以实现权限检查逻辑
      // const hasPermission = checkPermission(_binding.value);
      // if (!hasPermission) {
      //   _el.style.display = 'none';
      // }
    },
  });

  // 添加全局混入，用于日志记录或其他共享逻辑
  app.mixin({
    mounted() {
      // 可以在这里添加组件挂载时的通用逻辑
    },
    unmounted() {
      // 可以在这里添加组件卸载时的清理逻辑
    },
  });
}

/**
 * 应用程序生命周期钩子
 */
export class AppLifecycle {
  /**
   * 应用启动前的准备工作
   */
  static async beforeMount(): Promise<void> {
    // 可以在这里执行启动前的异步操作
    // 例如：加载配置、初始化第三方SDK等
    // 可以在这里执行启动前的异步操作
    // 例如：加载配置、初始化第三方SDK等
    // 模拟异步加载
    await new Promise(resolve => setTimeout(resolve, 0));
  }

  /**
   * 应用启动后的初始化工作
   */
  static afterMount(): void {
    // 应用挂载后的初始化工作
    // 例如：发送统计数据、初始化图表等
    // 应用挂载后的初始化工作
    // 例如：发送统计数据、初始化图表等

    // 隐藏启动加载动画
    const loading = document.getElementById('app-loading');
    if (loading) {
      loading.style.display = 'none';
    }
  }
}

export default bootstrapApp;
