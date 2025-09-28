import type { App, Component } from 'vue';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';
import * as Icons from '@ant-design/icons-vue';
import { message, Modal, notification } from 'ant-design-vue';
/**
 * 设置Ant Design Vue组件库
 * @param app 应用实例
 */
export function setupAntd(app: App): void {
  // 注册Ant Design Vue组件库
  app.use(Antd);

  // 注册所有图标组件
  const iconsComponent: Record<string, Component> = Icons;
  Object.keys(iconsComponent).forEach(key => {
    // 只注册具名导出的图标组件
    if (key !== 'default') {
      const iconComponent = iconsComponent[key];
      if (typeof iconComponent === 'object' && iconComponent && 'name' in iconComponent) {
        // 以组件名称作为全局注册名
        app.component(iconComponent.name as string, iconComponent as Component);
      }
    }
  });

  // 全局挂载通知组件
  app.config.globalProperties.$message = message;
  app.config.globalProperties.$modal = Modal;
  app.config.globalProperties.$notification = notification;

  // 提供注入值
  app.provide('message', message);
  app.provide('modal', Modal);
  app.provide('notification', notification);
}
