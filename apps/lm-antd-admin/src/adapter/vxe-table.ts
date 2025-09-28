/**
 * 表格适配器
 * 统一处理表格相关的配置和扩展
 */

// 定义表格列配置类型
export interface TableColumn {
  key?: string;
  title?: string;
  align?: 'left' | 'center' | 'right';
  overflow?: string;
  [key: string]: unknown;
}

// 定义分页配置类型
export interface PaginationConfig {
  currentPage: number;
  pageSize: number;
  pageSizes: number[];
  showSizeChanger: boolean;
  showQuickJumper: boolean;
  showTotal?: (total: number) => string;
  total: number;
}

// 定义表格配置类型
export interface TableConfig {
  border: boolean;
  showHeader: boolean;
  resizable: boolean;
  autoResize: boolean;
  height: string;
  stripe: boolean;
  size: 'small' | 'medium' | 'large';
  rowKey: string;
  loading: boolean;
  pagination?: boolean | Partial<PaginationConfig>;
  [key: string]: unknown;
}

// 定义分页变化参数类型
export interface PaginationChange {
  currentPage: number;
  pageSize: number;
  [key: string]: unknown;
}

// 定义排序变化参数类型
export interface SortChange {
  field: string;
  order: string;
  [key: string]: unknown;
}

// 表格默认配置
export const DEFAULT_TABLE_CONFIG: TableConfig = {
  border: true,
  showHeader: true,
  resizable: true,
  autoResize: true,
  height: 'auto',
  stripe: true,
  size: 'medium',
  rowKey: 'id',
  loading: false,
};

// 分页默认配置
export const DEFAULT_PAGINATION_CONFIG: PaginationConfig = {
  currentPage: 1,
  pageSize: 10,
  pageSizes: [10, 20, 50, 100],
  showSizeChanger: true,
  showQuickJumper: true,
  showTotal: (total: number) => `共 ${total} 条`,
  total: 0,
};

/**
 * 创建表格配置
 * @param config 自定义配置
 */
export function createTableConfig(config: Partial<TableConfig> = {}): TableConfig {
  return {
    ...DEFAULT_TABLE_CONFIG,
    ...config,
    pagination:
      config.pagination !== false
        ? {
            ...DEFAULT_PAGINATION_CONFIG,
            ...(typeof config.pagination === 'object' ? config.pagination : {}),
          }
        : false,
  };
}

/**
 * 创建表格列配置
 * @param columns 列定义数组
 */
export function createTableColumns(columns: TableColumn[]): TableColumn[] {
  return columns.map(column => ({
    ...column,
    align: column.align || 'left',
    overflow: column.overflow || 'hidden',
  }));
}

/**
 * 表格事件处理辅助函数
 */
export const tableEventHandlers = {
  /**
   * 处理分页变化
   * @param callback 回调函数
   */
  handlePageChange(callback: (page: number, pageSize: number) => void) {
    return (pagination: PaginationChange) => {
      callback(pagination.currentPage, pagination.pageSize);
    };
  },

  /**
   * 处理排序变化
   * @param callback 回调函数
   */
  handleSortChange(callback: (field: string, order: string) => void) {
    return (column: SortChange) => {
      callback(column.field, column.order);
    };
  },
};
