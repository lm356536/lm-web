/**
 * API接口管理
 * 统一管理所有API端点
 */
import { request } from './request';

// 定义API响应类型
export interface ApiResponse<T = unknown> {
  code: number;
  message: string;
  data: T;
}

// 定义用户信息接口
export interface UserInfo {
  id: string;
  username: string;
  email?: string;
  role?: string;
  avatar?: string;
}

// 定义登录请求参数
export interface LoginParams {
  username: string;
  password: string;
}

// 定义登录响应数据
export interface LoginResponse {
  token: string;
  user: UserInfo;
}

// 定义用户更新参数
export interface UpdateUserParams {
  username?: string;
  email?: string;
  avatar?: string;
}

// 用户相关API
export const userApi = {
  // 获取用户信息
  getUserInfo(): Promise<UserInfo> {
    return request.get<UserInfo>('/user/info');
  },

  // 更新用户信息
  updateUserInfo(data: UpdateUserParams): Promise<ApiResponse<UserInfo>> {
    return request.put<ApiResponse<UserInfo>>('/user/info', data);
  },

  // 登录
  login(data: LoginParams): Promise<LoginResponse> {
    return request.post<LoginResponse>('/user/login', data);
  },

  // 登出
  logout(): Promise<ApiResponse<null>> {
    return request.post<ApiResponse<null>>('/user/logout');
  },
};

// 定义组件接口
export interface Component {
  id: string;
  name: string;
  category: string;
  description: string;
  createdAt?: string;
  updatedAt?: string;
}

// 定义组件创建/更新参数
export interface ComponentParams {
  name: string;
  category: string;
  description: string;
}

// 定义分页参数
export interface PaginationParams {
  page?: number;
  pageSize?: number;
}

// 定义分页响应
export interface PaginatedResponse<T> {
  list: T[];
  total: number;
  page: number;
  pageSize: number;
}

// 组件相关API
export const componentApi = {
  // 获取组件列表
  getComponents(params?: PaginationParams): Promise<PaginatedResponse<Component>> {
    return request.get<PaginatedResponse<Component>>('/components', { params });
  },

  // 获取组件详情
  getComponentDetail(id: string): Promise<Component> {
    return request.get<Component>(`/components/${id}`);
  },

  // 创建组件
  createComponent(data: ComponentParams): Promise<ApiResponse<Component>> {
    return request.post<ApiResponse<Component>>('/components', data);
  },

  // 更新组件
  updateComponent(id: string, data: Partial<ComponentParams>): Promise<ApiResponse<Component>> {
    return request.put<ApiResponse<Component>>(`/components/${id}`, data);
  },

  // 删除组件
  deleteComponent(id: string): Promise<ApiResponse<null>> {
    return request.delete<ApiResponse<null>>(`/components/${id}`);
  },
};

// 定义系统配置接口
export interface SystemConfig {
  name: string;
  version: string;
  theme?: string;
  enableFeatures?: string[];
  [key: string]: unknown;
}

// 系统配置相关API
export const configApi = {
  // 获取系统配置
  getSystemConfig(): Promise<SystemConfig> {
    return request.get<SystemConfig>('/config/system');
  },

  // 更新系统配置
  updateSystemConfig(data: Partial<SystemConfig>): Promise<ApiResponse<SystemConfig>> {
    return request.put<ApiResponse<SystemConfig>>('/config/system', data);
  },
};

// 导出所有API
export default {
  user: userApi,
  component: componentApi,
  config: configApi,
};
