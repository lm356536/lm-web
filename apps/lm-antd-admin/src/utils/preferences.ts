/**
 * 用户偏好设置管理
 */

// 定义用户偏好接口
export interface UserPreferences {
  language?: string;
  theme?: string;
  layout?: string;
  size?: 'small' | 'middle' | 'large';
  [key: string]: unknown;
}

// 默认偏好设置
const DEFAULT_PREFERENCES: UserPreferences = {
  language: 'zh-CN',
  theme: 'light',
  layout: 'side',
  size: 'middle',
};

/**
 * 获取用户偏好设置
 * @returns 用户偏好设置对象
 */
export function getPreferences(): UserPreferences {
  try {
    // 在实际项目中，这里可能会从localStorage或API获取
    // 目前返回默认值
    return { ...DEFAULT_PREFERENCES };
  } catch (error) {
    console.error('Failed to get user preferences:', error);
    return { ...DEFAULT_PREFERENCES };
  }
}

/**
 * 保存用户偏好设置
 * @param preferences 偏好设置对象
 */
export function savePreferences(preferences: Partial<UserPreferences>): void {
  try {
    // 在实际项目中，这里可能会保存到localStorage或API
    console.log('Preferences saved:', preferences);
  } catch (error) {
    console.error('Failed to save user preferences:', error);
  }
}
