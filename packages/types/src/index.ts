/**
 * 共享类型定义
 */

/**
 * 通用响应数据结构
 */
export interface ApiResponse<T = any> {
  code: number;
  message: string;
  data: T;
  success: boolean;
}

/**
 * 分页数据结构
 */
export interface PaginatedData<T> {
  list: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPage: number;
}

/**
 * 分页请求参数
 */
export interface PaginationParams {
  page?: number;
  pageSize?: number;
  [key: string]: any;
}

/**
 * 组件Props类型基础接口
 */
export interface BaseProps {
  class?: string;
  style?: Record<string, any>;
}

/**
 * 通用事件处理函数类型
 */
export type EventHandler<T = Event> = (event: T) => void;

/**
 * 空值类型
 */
export type Nullable<T> = T | null | undefined;

/**
 * 可选键值对类型
 */
export type Recordable<T = any> = Record<string, T>;

/**
 * 深层部分可选类型
 */
export type DeepPartial<T> = T extends Function
  ? T
  : T extends object
  ? { [P in keyof T]?: DeepPartial<T[P]> }
  : T;