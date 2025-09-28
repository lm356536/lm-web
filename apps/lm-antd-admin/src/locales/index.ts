/**
 * 国际化配置
 */
import { createI18n } from 'vue-i18n';
import { getPreferences } from '@/utils/preferences';

// 定义支持的语言类型
export type Language = 'zh-CN' | 'en-US';

// 定义翻译资源接口
export interface MessageSchema {
  // 应用名称和标题
  appName: string;
  appDescription: string;

  // 导航菜单
  navigation: {
    home: string;
    components: string;
    settings: string;
    logout: string;
    profile: string;
  };

  // 首页相关
  welcomeMessage: string;
  systemDescription: string;
  recentActivities: string;
  fetchDataFailed: string;

  // 组件库相关
  componentLibrary: string;
  componentLibraryTitle: string;
  componentNavigation: string;
  demo: string;
  code: string;
  props: string;
  events: string;
  propName: string;
  propType: string;
  required: string;
  defaultValue: string;
  eventName: string;
  basicUsage: string;
  sizes: string;
  smallSize: string;
  middleSize: string;
  largeSize: string;
  disabledState: string;
  toggleDisabled: string;

  // 添加字符串索引签名以兼容vue-i18n
  [key: string]: string | object | MessageSchema;
  placeholder: string;
  inputValue: string;
  selectComponent: string;
  basicComponents: string;
  formComponents: string;
  displayComponents: string;
  feedbackComponents: string;

  // 组件详情
  helloWorld: {
    title: string;
    description: string;
    titleProp: string;
    clickEvent: string;
    clickMessage: string;
  };
  lmInput: {
    title: string;
    description: string;
    modelValueProp: string;
    placeholderProp: string;
    disabledProp: string;
    sizeProp: string;
    updateEvent: string;
    changeEvent: string;
    focusEvent: string;
    blurEvent: string;
  };
  disabledInputValue: string;
  disabledPlaceholder: string;

  // 按钮和操作
  refresh: string;
  submit: string;
  cancel: string;
  confirm: string;
  delete: string;
  edit: string;
  add: string;
  search: string;
  reset: string;

  // 错误和提示
  error: string;
  success: string;
  warning: string;
  info: string;

  // 日期时间
  today: string;
  yesterday: string;
  lastWeek: string;
  lastMonth: string;

  // 分页
  page: string;
  of: string;
  rowsPerPage: string;
  total: string;

  // 通用表单项
  name: string;
  description: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

// 中文翻译资源
const zhCN: MessageSchema = {
  // 应用名称和标题
  appName: 'LM Web',
  appDescription: '基于Vue 3、TypeScript和Ant Design Vue构建的现代化管理系统',

  // 导航菜单
  navigation: {
    home: '首页',
    components: '组件库',
    settings: '设置',
    logout: '退出登录',
    profile: '个人设置',
  },

  // 首页相关
  welcomeMessage: '欢迎使用LM Web管理系统',
  systemDescription: '这是一个高效、美观、易用的企业级管理系统解决方案',
  recentActivities: '最近活动',
  fetchDataFailed: '获取数据失败',

  // 组件库相关
  componentLibrary: '组件库',
  componentLibraryTitle: '组件库展示',
  componentNavigation: '组件导航',
  demo: '示例',
  code: '代码',
  props: '属性',
  events: '事件',
  propName: '属性名',
  propType: '类型',
  required: '必需',
  defaultValue: '默认值',
  eventName: '事件名',
  basicUsage: '基础用法',
  sizes: '不同尺寸',
  smallSize: '小尺寸',
  middleSize: '中尺寸',
  largeSize: '大尺寸',
  disabledState: '禁用状态',
  toggleDisabled: '切换禁用状态',
  placeholder: '请输入内容',
  inputValue: '输入值',
  selectComponent: '请选择要查看的组件',
  basicComponents: '基础组件',
  formComponents: '表单组件',
  displayComponents: '展示组件',
  feedbackComponents: '反馈组件',

  // 组件详情
  helloWorld: {
    title: 'Hello World 组件',
    description: '一个简单的欢迎组件，用于展示组件的基本用法和事件处理',
    titleProp: '组件标题',
    clickEvent: '点击按钮时触发的事件',
    clickMessage: 'HelloWorld 组件被点击了',
  },
  lmInput: {
    title: 'LmInput 组件',
    description: '基于 Ant Design Vue Input 组件的二次封装，提供统一的样式和功能',
    modelValueProp: '绑定的值',
    placeholderProp: '占位文本',
    disabledProp: '是否禁用',
    sizeProp: '输入框尺寸',
    updateEvent: '值更新时触发',
    changeEvent: '值变化时触发',
    focusEvent: '获得焦点时触发',
    blurEvent: '失去焦点时触发',
  },
  disabledInputValue: '禁用的输入框',
  disabledPlaceholder: '禁用状态',

  // 按钮和操作
  refresh: '刷新',
  submit: '提交',
  cancel: '取消',
  confirm: '确认',
  delete: '删除',
  edit: '编辑',
  add: '添加',
  search: '搜索',
  reset: '重置',

  // 错误和提示
  error: '错误',
  success: '成功',
  warning: '警告',
  info: '提示',

  // 日期时间
  today: '今天',
  yesterday: '昨天',
  lastWeek: '上周',
  lastMonth: '上月',

  // 分页
  page: '页',
  of: '共',
  rowsPerPage: '每页条数',
  total: '总计',

  // 通用表单项
  name: '名称',
  description: '描述',
  status: '状态',
  createdAt: '创建时间',
  updatedAt: '更新时间',
};

// 英文翻译资源
const enUS: MessageSchema = {
  // 应用名称和标题
  appName: 'LM Web',
  appDescription: 'A modern management system built with Vue 3, TypeScript and Ant Design Vue',

  // 导航菜单
  navigation: {
    home: 'Home',
    components: 'Components',
    settings: 'Settings',
    logout: 'Logout',
    profile: 'Profile',
  },

  // 首页相关
  welcomeMessage: 'Welcome to LM Web Management System',
  systemDescription:
    'A high-efficiency, beautiful and user-friendly enterprise management system solution',
  recentActivities: 'Recent Activities',
  fetchDataFailed: 'Failed to fetch data',

  // 组件库相关
  componentLibrary: 'Component Library',
  componentLibraryTitle: 'Component Library',
  componentNavigation: 'Component Navigation',
  demo: 'Demo',
  code: 'Code',
  props: 'Props',
  events: 'Events',
  propName: 'Prop Name',
  propType: 'Type',
  required: 'Required',
  defaultValue: 'Default Value',
  eventName: 'Event Name',
  basicUsage: 'Basic Usage',
  sizes: 'Different Sizes',
  smallSize: 'Small Size',
  middleSize: 'Middle Size',
  largeSize: 'Large Size',
  disabledState: 'Disabled State',
  toggleDisabled: 'Toggle Disabled',
  placeholder: 'Please enter content',
  inputValue: 'Input Value',
  selectComponent: 'Please select a component to view',
  basicComponents: 'Basic Components',
  formComponents: 'Form Components',
  displayComponents: 'Display Components',
  feedbackComponents: 'Feedback Components',

  // 组件详情
  helloWorld: {
    title: 'Hello World Component',
    description: 'A simple welcome component demonstrating basic usage and event handling',
    titleProp: 'Component title',
    clickEvent: 'Event triggered when button is clicked',
    clickMessage: 'HelloWorld component clicked',
  },
  lmInput: {
    title: 'LmInput Component',
    description: 'Secondary encapsulation based on Ant Design Vue Input component',
    modelValueProp: 'Bound value',
    placeholderProp: 'Placeholder text',
    disabledProp: 'Whether to disable',
    sizeProp: 'Input box size',
    updateEvent: 'Triggered when value updates',
    changeEvent: 'Triggered when value changes',
    focusEvent: 'Triggered when focus is gained',
    blurEvent: 'Triggered when focus is lost',
  },
  disabledInputValue: 'Disabled input',
  disabledPlaceholder: 'Disabled state',

  // 按钮和操作
  refresh: 'Refresh',
  submit: 'Submit',
  cancel: 'Cancel',
  confirm: 'Confirm',
  delete: 'Delete',
  edit: 'Edit',
  add: 'Add',
  search: 'Search',
  reset: 'Reset',

  // 错误和提示
  error: 'Error',
  success: 'Success',
  warning: 'Warning',
  info: 'Info',

  // 日期时间
  today: 'Today',
  yesterday: 'Yesterday',
  lastWeek: 'Last Week',
  lastMonth: 'Last Month',

  // 分页
  page: 'Page',
  of: 'of',
  rowsPerPage: 'Rows per page',
  total: 'Total',

  // 通用表单项
  name: 'Name',
  description: 'Description',
  status: 'Status',
  createdAt: 'Created At',
  updatedAt: 'Updated At',
};

// 合并所有语言的翻译资源
const messages = {
  'zh-CN': zhCN,
  'en-US': enUS,
};

// 获取用户偏好的语言设置
const getPreferredLanguage = (): Language => {
  const preferences = getPreferences();
  const lang = preferences?.language;
  return lang === 'zh-CN' || lang === 'en-US' ? lang : 'zh-CN';
};

// 创建i18n实例
const i18n = createI18n({
  legacy: false, // 使用组合式API模式
  locale: getPreferredLanguage(),
  fallbackLocale: 'zh-CN',
  messages,
  silentTranslationWarn: false,
  silentFallbackWarn: false,
});

/**
 * 设置应用的语言
 * @param locale 语言代码
 */
export const setLanguage = (locale: Language): void => {
  if (i18n.global.locale && i18n.global.locale.value) {
    i18n.global.locale.value = locale;
  }
};

/**
 * 获取当前应用的语言
 * @returns 当前语言代码
 */
export const getCurrentLanguage = (): Language => {
  if (i18n.global.locale && i18n.global.locale.value) {
    return i18n.global.locale.value as Language;
  }
  return 'zh-CN';
};

/**
 * 切换应用的语言
 * @returns 切换后的语言代码
 */
export const toggleLanguage = (): Language => {
  const current = getCurrentLanguage();
  const newLocale = current === 'zh-CN' ? 'en-US' : 'zh-CN';
  setLanguage(newLocale);
  return newLocale;
};

import { App } from 'vue';

/**
 * 应用国际化
 * @param app Vue应用实例
 */
export function setupI18n(app: App): void {
  app.use(i18n);
}

/**
 * 提供i18n的useI18n函数
 */
export function useI18n() {
  return i18n.global;
}

export default i18n;
