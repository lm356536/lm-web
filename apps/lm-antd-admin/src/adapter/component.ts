import type { App } from 'vue';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';
import * as Icons from '@ant-design/icons-vue';

/**
 * 设置Ant Design Vue组件库
 * @param app 应用实例
 */
export function setupAntd(app: App): void {
  // 注册Ant Design Vue组件库
  app.use(Antd);

  // 注册所有图标组件
  Object.keys(Icons).forEach(key => {
    // 只注册具名导出的图标组件
    if (key !== 'default') {
      const iconComponent = Icons[key as keyof typeof Icons];
      if (typeof iconComponent === 'object' && 'name' in iconComponent) {
        // 以组件名称作为全局注册名
        app.component(iconComponent.name, iconComponent);
      }
    }
  });
}
