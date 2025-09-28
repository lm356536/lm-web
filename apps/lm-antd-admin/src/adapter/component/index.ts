import type { App, Component } from 'vue';
import { type MessageInstance } from 'ant-design-vue/es/message';
import { type ModalStaticFunctions } from 'ant-design-vue/es/modal';
import { type NotificationInstance } from 'ant-design-vue/es/notification';
import {
  Button,
  Input,
  Menu,
  Layout,
  Card,
  Empty,
  Dropdown,
  Form,
  Modal,
  message,
  Spin,
  Pagination,
  Avatar,
  Tabs,
} from 'ant-design-vue';
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

// 全局属性类型声明
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $message: MessageInstance;
    $modal: ModalStaticFunctions;
    $notification: NotificationInstance;
    $antdConfig: AntdConfig;
  }
}

// 定义组件类型
export interface ComponentType extends Component<any> {
  name?: string;
  props?: Record<string, unknown>;
  events?: string[];
  [key: string]: unknown;
}

// 定义Ant Design配置类型
export interface AntdConfig {
  prefixCls: string;
  size: 'small' | 'middle' | 'large';
}

// 定义组件适配器的接口
export interface ComponentAdapter {
  // 组件安装方法
  install(app: App): void;
  // 获取组件
  getComponents(): Record<string, ComponentType>;
  // 获取单个组件
  getComponent(name: string): ComponentType | undefined;
}

/**
 * Ant Design Vue 组件适配器
 * 提供统一的组件注册和访问接口
 */
export class AntdComponentAdapter implements ComponentAdapter {
  // 注册的组件列表
  private components: Record<string, ComponentType> = {
    // UI组件
    Button,
    Input,
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
  } as Record<string, ComponentType>;

  /**
   * 安装所有组件到 Vue 应用实例
   * @param app Vue 应用实例
   */
  install(app: App): void {
    // 遍历组件列表，注册到全局
    Object.entries(this.components).forEach(([name, component]) => {
      app.component(name, component);
    });

    // 注册全局属性
    app.config.globalProperties.$message = message;
    app.config.globalProperties.$modal = Modal;
    app.config.globalProperties.$notification = Modal.notification;

    // 全局配置
    const $antdConfig = {
      prefixCls: 'ant',
      size: 'middle' as const,
    };
    app.config.globalProperties.$antdConfig = $antdConfig as AntdConfig;
  }

  /**
   * 获取所有已注册的组件
   * @returns 组件映射对象
   */
  getComponents(): Record<string, ComponentType> {
    return { ...this.components };
  }

  /**
   * 获取单个组件
   * @param name 组件名称
   * @returns 组件实例或undefined
   */
  getComponent(name: string): ComponentType | undefined {
    return this.components[name];
  }
}

// 创建组件适配器实例
const componentAdapter = new AntdComponentAdapter();

/**
 * 设置Ant Design组件
 * 统一注册和配置所有使用的组件
 */
export function setupAntd(app: App): void {
  componentAdapter.install(app);
}

// 导出组件适配器和相关功能
export { componentAdapter };
export type { ComponentAdapter, AntdConfig };
export default componentAdapter;
