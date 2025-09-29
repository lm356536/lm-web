import { bootstrapApp, AppLifecycle } from './bootstrap';

/**
 * 应用入口函数
 * 负责初始化和挂载应用程序
 */
async function main() {
  try {
    // 应用启动前的准备工作
    await AppLifecycle.beforeMount();

    // 初始化应用实例 - 先解析App组件再传递
    const appComponentModule = await import('./App.vue');
    const { app, isReady } = await bootstrapApp(appComponentModule.default);

    if (isReady) {
      // 挂载应用到DOM
      app.mount('#app');
      // 应用已成功挂载，开发环境日志

      // 应用启动后的初始化工作
      AppLifecycle.afterMount();
    } else {
      throw new Error('应用初始化状态异常');
    }
  } catch (error) {
    // 记录应用启动错误信息

    // 显示错误信息给用户
    const errorContainer = document.getElementById('app-error');
    if (errorContainer) {
      errorContainer.innerHTML = `
        <div style="
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          text-align: center;
          padding: 20px;
          background-color: #f5f5f5;
        ">
          <h2 style="color: #ff4d4f;">应用启动失败</h2>
          <p style="margin: 20px 0;">请刷新页面重试或联系管理员</p>
          <pre style="
            background-color: #fff;
            padding: 16px;
            border-radius: 4px;
            border: 1px solid #d9d9d9;
            max-width: 600px;
            max-height: 300px;
            overflow: auto;
            text-align: left;
            font-size: 14px;
          ">${error instanceof Error ? error.message : String(error)}</pre>
          <button onclick="window.location.reload()" style="
            margin-top: 20px;
            padding: 8px 16px;
            background-color: #1890ff;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
          ">刷新页面</button>
        </div>
      `;
    }
  }
}

// 执行应用入口函数
main();
