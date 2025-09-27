#!/usr/bin/env node
// 仅使用Vite构建，跳过vue-tsc类型检查
import { execSync } from 'child_process';

// eslint-disable-next-line no-console
console.log('开始构建...');
try {
  // 直接运行Vite构建
  execSync('npx vite build', { stdio: 'inherit' });
  // eslint-disable-next-line no-console
  console.log('\n✅ 构建成功（跳过类型检查）');
} catch (error) {
  // eslint-disable-next-line no-console
  console.error('❌ 构建失败');
  process.exit(1);
}
