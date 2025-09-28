// LmInput组件类型定义
import type { Ref } from 'vue';

// Props接口
export interface LmInputProps {
  /** 输入框的值 */
  modelValue: string;
  /** 占位文本 */
  placeholder?: string;
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否只读 */
  readonly?: boolean;
  /** 最大输入长度 */
  maxlength?: number;
  /** 输入框尺寸 */
  size?: 'small' | 'medium' | 'large';
  /** 输入框类型 */
  type?: 'text' | 'password' | 'email' | 'number';
}

// Events接口
export interface LmInputEmits {
  /** 值变化事件 */
  (e: 'update:modelValue', value: string): void;
  /** 输入事件 */
  (e: 'input', event: Event): void;
  /** 焦点事件 */
  (e: 'focus', event: FocusEvent): void;
  /** 失焦事件 */
  (e: 'blur', event: FocusEvent): void;
}

// 组件实例接口，供父组件通过ref获取
export interface LmInputInstance {
  /** 输入框DOM引用 */
  inputRef: Ref<HTMLInputElement | null>;
  /** 聚焦方法 */
  focus: () => void;
  /** 失焦方法 */
  blur: () => void;
  /** 清空内容 */
  clear: () => void;
}
