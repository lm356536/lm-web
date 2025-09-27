// HelloWorld组件类型定义
import type { Ref } from 'vue';

// Props接口
export interface HelloWorldProps {
  /** 组件标题 */
  title: string;
  /** 组件消息内容 */
  message?: string;
  /** 是否显示计数部分 */
  showCount?: boolean;
}

// Events接口
export interface HelloWorldEmits {
  /** 标题点击事件 */
  (e: 'click', event: MouseEvent): void;
  /** 计数变化事件 */
  (e: 'countChange', count: number): void;
}

// 组件实例接口，供父组件通过ref获取
export interface HelloWorldInstance {
  /** 增加计数的方法 */
  incrementCount: () => void;
  /** 当前计数值 */
  count: Ref<number>;
}
