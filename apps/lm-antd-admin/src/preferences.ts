/**
 * 应用偏好设置
 * 管理用户界面偏好、主题设置等
 */
import type { Ref } from 'vue';

/**
 * 用户偏好设置接口
 */
export interface Preferences {
  // 语言设置
  language: string;
  // 布局设置
  layout: {
    // 是否折叠侧边栏
    collapsed: boolean;
    // 布局模式: 'sidemenu' | 'topmenu'
    mode: 'sidemenu' | 'topmenu';
    // 内容区域宽度: 'fixed' | 'fluid'
    contentWidth: 'fixed' | 'fluid';
  };
  // UI设置
  ui: {
    // 主题模式
    theme: 'light' | 'dark' | 'system';
    // 主题颜色
    primaryColor: string;
    // 组件大小
    size: 'small' | 'middle' | 'large';
    // 字体大小
    fontSize: 'small' | 'medium' | 'large';
  };
  // 数据设置
  data: {
    // 默认分页大小
    pageSize: number;
    // 分页选项
    pageSizeOptions: string[];
  };
  // 其他个性化设置
  others: Record<string, unknown>;
}

// 默认偏好设置
const defaultPreferences: Preferences = {
  language: 'zh-CN',
  layout: {
    collapsed: false,
    mode: 'sidemenu',
    contentWidth: 'fixed',
  },
  ui: {
    theme: 'light',
    primaryColor: '#1890ff',
    size: 'middle',
    fontSize: 'medium',
  },
  data: {
    pageSize: 20,
    pageSizeOptions: ['10', '20', '50', '100'],
  },
  others: {},
};

// 当前偏好设置
let currentPreferences: Preferences = { ...defaultPreferences };

/**
 * 加载应用偏好设置
 * 从localStorage读取或使用默认值
 */
export async function loadPreferences(): Promise<void> {
  try {
    const stored = localStorage.getItem('appPreferences');
    if (stored) {
      const parsed = JSON.parse(stored);
      // 合并默认设置和保存的设置，确保结构完整
      currentPreferences = {
        ...defaultPreferences,
        ...parsed,
        layout: {
          ...defaultPreferences.layout,
          ...(parsed.layout || {}),
        },
        ui: {
          ...defaultPreferences.ui,
          ...(parsed.ui || {}),
        },
        data: {
          ...defaultPreferences.data,
          ...(parsed.data || {}),
        },
      };
    }

    applyPreferences();
    // 开发环境的调试日志
  } catch (error) {
    // 开发环境的调试日志
    // 使用默认设置
    currentPreferences = { ...defaultPreferences };
    applyPreferences();
  }
}

/**
 * 保存应用偏好设置到localStorage
 */
export function savePreferences(preferences: Partial<Preferences>): void {
  // 合并新的设置
  currentPreferences = {
    ...currentPreferences,
    ...preferences,
    layout: {
      ...currentPreferences.layout,
      ...(preferences.layout || {}),
    },
    ui: {
      ...currentPreferences.ui,
      ...(preferences.ui || {}),
    },
    data: {
      ...currentPreferences.data,
      ...(preferences.data || {}),
    },
  };

  localStorage.setItem('appPreferences', JSON.stringify(currentPreferences));
  applyPreferences();
  // 开发环境的调试日志
}

/**
 * 获取当前偏好设置
 */
export function getPreferences(): Preferences {
  return { ...currentPreferences };
}

/**
 * 获取偏好设置的特定部分
 */
export function getPreference<K extends keyof Preferences>(key: K): Preferences[K] {
  return currentPreferences[key];
}

/**
 * 设置偏好设置的特定部分
 */
export function setPreference<K extends keyof Preferences>(key: K, value: Preferences[K]): void {
  currentPreferences[key] = value;
  savePreferences({});
}

/**
 * 重置偏好设置到默认值
 */
export function resetPreferences(): void {
  currentPreferences = { ...defaultPreferences };
  localStorage.setItem('appPreferences', JSON.stringify(currentPreferences));
  applyPreferences();
  // 开发环境的调试日志
}

/**
 * 创建响应式的偏好设置引用
 * 用于在Vue组件中直接绑定偏好设置
 */
export function usePreference<K extends keyof Preferences>(key: K): Ref<Preferences[K]> {
  // 返回响应式对象引用
  const preferenceRef = {
    get value(): Preferences[K] {
      return getPreference(key);
    },
    set value(val: Preferences[K]) {
      setPreference(key, val);
    },
  } as Ref<Preferences[K]>;

  return preferenceRef;
}

/**
 * 应用偏好设置到应用
 */
function applyPreferences(): void {
  const { ui, layout } = currentPreferences;

  // 应用主题
  applyTheme(ui.theme);

  // 应用字体大小
  applyFontSize(ui.fontSize);

  // 应用主题颜色
  document.documentElement.style.setProperty('--primary-color', ui.primaryColor);

  // 设置布局相关的CSS类
  document.body.setAttribute('data-layout-mode', layout.mode);
  document.body.setAttribute('data-content-width', layout.contentWidth);
}

/**
 * 应用主题设置
 */
function applyTheme(theme: 'light' | 'dark' | 'system'): void {
  let actualTheme = theme;

  // 如果设置为跟随系统，则检测系统主题
  if (theme === 'system' && window.matchMedia) {
    actualTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  document.documentElement.setAttribute('data-theme', actualTheme);

  // 添加或移除暗色模式类
  if (actualTheme === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
}

/**
 * 应用字体大小设置
 */
function applyFontSize(size: 'small' | 'medium' | 'large'): void {
  const fontSizeMap = {
    small: '14px',
    medium: '16px',
    large: '18px',
  };

  document.documentElement.style.fontSize = fontSizeMap[size];
}

/**
 * 应用偏好设置到应用实例
 */
import type { App } from 'vue';

export function applyPreferencesToApp(app: App): void {
  const { ui } = currentPreferences;

  // 设置组件大小
  if (app.config.globalProperties.$antdConfig) {
    app.config.globalProperties.$antdConfig.size = ui.size;
  }
}

// 监听系统主题变化（如果设置为跟随系统）
if (typeof window !== 'undefined' && window.matchMedia) {
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', _e => {
    if (currentPreferences.ui.theme === 'system') {
      applyTheme('system');
    }
  });
}
