/**
 * 通用组件共同的使用的基础组件，提供统一的组件注册和访问接口
 * 可用于各种表单、模态框等组件使用
 */

import type { App, Component, RecordPropsDefinition, ComponentOptionsMixin, ExtractPropTypes, SetupContext } from 'vue';
import type { Recordable } from '@lm/types';
import { defineComponent, h, ref } from 'vue';
import { notification } from 'ant-design-vue';
import { useI18n } from '@/locales';

// 同步导入UI组件
import Button from 'ant-design-vue/es/button';
import Input from 'ant-design-vue/es/input';
import Menu from 'ant-design-vue/es/menu';
import Layout from 'ant-design-vue/es/layout';
import Card from 'ant-design-vue/es/card';
import Empty from 'ant-design-vue/es/empty';
import Dropdown from 'ant-design-vue/es/dropdown';
import Form from 'ant-design-vue/es/form';
import Modal from 'ant-design-vue/es/modal';
import Spin from 'ant-design-vue/es/spin';
import Pagination from 'ant-design-vue/es/pagination';
import Avatar from 'ant-design-vue/es/avatar';
import Tabs from 'ant-design-vue/es/tabs';
import { InputPassword, Textarea } from 'ant-design-vue/es/input';

// 同步导入图标组件
import {
  MenuOutlined,
  HomeOutlined,
  InfoCircleOutlined,
  UserOutlined,
  LogoutOutlined,
  SettingOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SearchOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  ReloadOutlined,
  FilterOutlined,
  DownloadOutlined,
  UploadOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
} from '@ant-design/icons-vue';

// 定义全局共享状态类，用于管理组件
class GlobalShareState {
  private components: Record<string, Component> = {};
  private messageHandlers: Record<string, Function> = {};

  setComponents(components: Record<string, Component>): void {
    this.components = { ...this.components, ...components };
  }

  getComponent(name: string): Component | undefined {
    return this.components[name];
  }

  getComponents(): Record<string, Component> {
    return { ...this.components };
  }

  defineMessage(handlers: Record<string, Function>): void {
    this.messageHandlers = { ...this.messageHandlers, ...handlers };
  }

  getMessageHandler(name: string): Function | undefined {
    return this.messageHandlers[name];
  }
}

// 创建全局共享状态实例
export const globalShareState = new GlobalShareState();

// 高阶组件：为组件添加默认占位符
const withDefaultPlaceholder = <T extends Component>(
  component: T,
  type: 'input' | 'select',
  componentProps: Recordable<any> = {},
) => {
  return defineComponent({
    name: component.name,
    inheritAttrs: false,
    setup: (props: Record<string, unknown>, { attrs, expose, slots }: SetupContext) => {
      // 在组件实例中获取翻译函数
      const { t: $t } = useI18n();
      const placeholder =
        props?.placeholder ||
        attrs?.placeholder ||
        ($t ? $t(`ui.placeholder.${type}`) : type === 'input' ? '请输入' : '请选择');

      // 透传组件暴露的方法
      const innerRef = ref();
      expose(
        new Proxy(
          {},
          {
            get: (_target, key) => innerRef.value?.[key],
            has: (_target, key) => key in (innerRef.value || {}),
          },
        ),
      );

      return () =>
        h(component, { ...componentProps, placeholder, ...props, ...attrs, ref: innerRef }, slots);
    },
  });
};

// 定义组件类型
export type ComponentType =
  | 'Button'
  | 'Input'
  | 'Menu'
  | 'Layout'
  | 'Card'
  | 'Empty'
  | 'Dropdown'
  | 'Form'
  | 'Modal'
  | 'Spin'
  | 'Pagination'
  | 'Avatar'
  | 'Tabs'
  | 'InputPassword'
  | 'Textarea'
  // 图标组件
  | 'MenuOutlined'
  | 'HomeOutlined'
  | 'InfoCircleOutlined'
  | 'UserOutlined'
  | 'LogoutOutlined'
  | 'SettingOutlined'
  | 'MenuFoldOutlined'
  | 'MenuUnfoldOutlined'
  | 'SearchOutlined'
  | 'PlusOutlined'
  | 'EditOutlined'
  | 'DeleteOutlined'
  | 'EyeOutlined'
  | 'ReloadOutlined'
  | 'FilterOutlined'
  | 'DownloadOutlined'
  | 'UploadOutlined'
  | 'ArrowUpOutlined'
  | 'ArrowDownOutlined'
  | 'DefaultButton'
  | 'PrimaryButton';

// 定义Ant Design配置类型
export interface AntdConfig {
  prefixCls: string;
  size: 'small' | 'middle' | 'large';
}

// 全局属性类型声明
declare module 'vue' {
  interface ComponentCustomProperties {
    $antdConfig: AntdConfig;
  }
}

/**
 * 初始化组件适配器
 * 注册所有组件并设置消息处理器
 */
export async function initComponentAdapter() {
  const components: Partial<Record<ComponentType, Component>> = {
    // UI组件
    Button,
    Input: withDefaultPlaceholder(Input, 'input'),
    Menu,
    Layout,
    Card,
    Empty,
    Dropdown,
    Form,
    Modal,
    Spin,
    Pagination,
    Avatar,
    Tabs,
    InputPassword: withDefaultPlaceholder(InputPassword, 'input'),
    Textarea: withDefaultPlaceholder(Textarea, 'input'),

    // 图标组件
    MenuOutlined,
    HomeOutlined,
    InfoCircleOutlined,
    UserOutlined,
    LogoutOutlined,
    SettingOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    SearchOutlined,
    PlusOutlined,
    EditOutlined,
    DeleteOutlined,
    EyeOutlined,
    ReloadOutlined,
    FilterOutlined,
    DownloadOutlined,
    UploadOutlined,
    ArrowUpOutlined,
    ArrowDownOutlined,

    // 自定义按钮类型
    DefaultButton: (props: Record<string, unknown>, { attrs, slots }: { attrs: Record<string, unknown>, slots: Record<string, unknown> }) => {
      return h(Button, { ...props, ...attrs, type: 'default' }, slots);
    },

    PrimaryButton: (props: Record<string, unknown>, { attrs, slots }: { attrs: Record<string, unknown>, slots: Record<string, unknown> }) => {
      return h(Button, { ...props, ...attrs, type: 'primary' }, slots);
    },
  };

  // 将组件注册到全局共享状态中
  globalShareState.setComponents(components as Record<string, Component>);

  // 定义全局共享状态中的消息提示
  globalShareState.defineMessage({
    // 复制成功消息提示
    copySuccess: (title: string, content: string) => {
      notification.success({
        description: content,
        message: title,
        placement: 'bottomRight',
      });
    },

    error: (title: string, content: string) => {
      notification.error({
        description: content,
        message: title,
        placement: 'bottomRight',
      });
    },
  });
}

/**
 * 设置Ant Design组件
 * 统一注册和配置所有使用的组件
 */
export async function setupAntd(app: App): Promise<void> {
  // 全局配置
  const $antdConfig: AntdConfig = {
    prefixCls: 'ant',
    size: 'middle',
  };

  app.config.globalProperties.$antdConfig = $antdConfig;

  // 初始化组件适配器
  await initComponentAdapter();
}
