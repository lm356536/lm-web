/**
 * 状态管理
 * 使用Vue 3的响应式API实现简单的状态管理
 */
import { reactive, readonly, App } from 'vue';

// 应用状态接口
interface AppState {
  isLoading: boolean;
  error: string | null;
  user: {
    isLoggedIn: boolean;
    name: string;
    avatar: string;
    permissions: string[];
  };
  settings: {
    theme: string;
    language: string;
  };
}

// 创建初始状态
const initialState: AppState = {
  isLoading: false,
  error: null,
  user: {
    isLoggedIn: false,
    name: '',
    avatar: '',
    permissions: [],
  },
  settings: {
    theme: 'light',
    language: 'zh-CN',
  },
};

// 创建响应式状态
const state = reactive<AppState>({ ...initialState });

// 状态操作方法
const mutations = {
  // 设置加载状态
  setLoading(loading: boolean): void {
    state.isLoading = loading;
  },

  // 设置错误信息
  setError(error: string | null): void {
    state.error = error;
  },

  // 设置用户信息
  setUser(userInfo: Partial<AppState['user']>): void {
    Object.assign(state.user, userInfo);
  },

  // 设置用户登录状态
  setLoggedIn(loggedIn: boolean, userInfo?: Partial<AppState['user']>): void {
    state.user.isLoggedIn = loggedIn;
    if (userInfo) {
      Object.assign(state.user, userInfo);
    } else if (!loggedIn) {
      state.user = { ...initialState.user };
    }
  },

  // 设置设置项
  setSettings(settings: Partial<AppState['settings']>): void {
    Object.assign(state.settings, settings);
  },

  // 重置状态
  resetState(): void {
    Object.assign(state, initialState);
  },
};

// 导出只读状态和操作方法
export const store = {
  state: readonly(state),
  ...mutations,
};

/**
 * 设置状态管理
 * @param app Vue应用实例
 */
export function setupStore(app: App): void {
  // 将store挂载到全局属性
  app.config.globalProperties.$store = store;

  // 提供给Composition API使用
  app.provide('store', store);

  // 开发环境的调试日志
}

// 导出store类型
export type StoreType = typeof store;
