/**
 * 表单适配器
 * 统一处理Ant Design表单相关的配置和扩展
 */
import { FormProps, FormInstance, type FieldValues } from 'ant-design-vue';

// 表单布局常量
export const FORM_LAYOUTS = {
  horizontal: {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  },
  vertical: {
    labelCol: {
      span: 24,
    },
    wrapperCol: {
      span: 24,
    },
  },
  inline: {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  },
};

// 定义表单值类型
export type FormValues = Record<string, unknown>;

// 默认表单配置
export const DEFAULT_FORM_CONFIG: Partial<FormProps> = {
  layout: 'horizontal',
  size: 'middle',
  colon: true,
};

/**
 * 创建表单配置
 * @param config 自定义配置
 */
export function createFormConfig(config: Partial<FormProps> = {}): FormProps {
  const layout = config.layout || DEFAULT_FORM_CONFIG.layout;
  return {
    ...DEFAULT_FORM_CONFIG,
    ...config,
    ...(layout && FORM_LAYOUTS[layout as keyof typeof FORM_LAYOUTS]),
  };
}

/**
 * 表单实例接口扩展
 */
export interface EnhancedFormInstance extends FormInstance {
  // 批量设置字段值
  setFieldsValues<T extends FormValues>(values: T): void;

  // 获取所有字段值（包括禁用字段）
  getAllFieldsValue(withDisabled?: boolean): FormValues;
}

/**
 * 扩展表单实例
 * @param formInstance 原始表单实例
 */
export function enhanceFormInstance(formInstance: FormInstance): EnhancedFormInstance {
  if (!formInstance) {
    throw new Error('Form instance cannot be null or undefined');
  }

  const enhanced = {
    ...formInstance,
    setFieldsValues<T extends FormValues>(values: T): void {
      // 使用setFields方法代替setFieldValue
      const fields = Object.entries(values).map(([field, value]) => ({
        name: field,
        value,
      }));
      formInstance.setFields(fields);
    },
    getAllFieldsValue(withDisabled = false): FormValues {
      // 使用正确的getFieldsValue参数格式
      return formInstance.getFieldsValue() as FormValues;
    },
  };

  return enhanced as EnhancedFormInstance;
}
