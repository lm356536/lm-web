/**
 * 工具函数库
 */

/**
 * 防抖函数
 * @param fn 需要防抖的函数
 * @param delay 延迟时间（毫秒）
 * @returns 防抖后的函数
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  fn: T,
  delay: number,
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout> | null = null;
  return function (...args: Parameters<T>) {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}

/**
 * 节流函数
 * @param fn 需要节流的函数
 * @param delay 间隔时间（毫秒）
 * @returns 节流后的函数
 */
export function throttle<T extends (...args: unknown[]) => unknown>(
  fn: T,
  delay: number,
): (...args: Parameters<T>) => void {
  let lastTime = 0;
  return function (...args: Parameters<T>) {
    const now = Date.now();
    if (now - lastTime >= delay) {
      fn(...args);
      lastTime = now;
    }
  };
}

/**
 * 安全地访问对象属性
 * @param obj 对象
 * @param path 属性路径
 * @param defaultValue 默认值
 * @returns 属性值或默认值
 */
export function get<T extends object, K extends keyof T>(
  obj: T,
  path: K,
  defaultValue?: unknown,
): T[K] | typeof defaultValue {
  if (obj === null || obj === undefined) {
    return defaultValue;
  }
  return obj[path] !== undefined ? obj[path] : defaultValue;
}

/**
 * 生成唯一ID
 * @returns 唯一ID字符串
 */
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}
