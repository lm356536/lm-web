/**
 * API请求配置
 * 统一管理HTTP请求
 */
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

// 创建axios实例
const apiClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器
apiClient.interceptors.request.use(
  config => {
    // 从localStorage获取token
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

// 响应拦截器
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    const { data } = response;

    // 统一处理业务逻辑错误
    if (data.code !== 0 && data.code !== 200) {
      // 开发环境的调试日志
      return Promise.reject(new Error(data.message || 'Request failed'));
    }

    return data;
  },
  error => {
    // 处理网络错误
    if (!error.response) {
      // 开发环境的调试日志
      return Promise.reject(new Error('Network error'));
    }

    const { status } = error.response;

    // 处理常见错误状态码
    switch (status) {
      case 401:
        // 未授权，跳转到登录页
        // 开发环境的调试日志
        // 这里可以添加重定向到登录页的逻辑
        break;
      case 403:
        // 开发环境的调试日志
        break;
      case 404:
        // 开发环境的调试日志
        break;
      case 500:
        // 开发环境的调试日志
        break;
      default:
      // 开发环境的调试日志
    }

    return Promise.reject(error);
  },
);

// 导出请求方法
export const request = {
  get<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return apiClient.get(url, config);
  },

  post<T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    return apiClient.post(url, data, config);
  },

  put<T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    return apiClient.put(url, data, config);
  },

  delete<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return apiClient.delete(url, config);
  },

  patch<T = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    return apiClient.patch(url, data, config);
  },
};

export default apiClient;
