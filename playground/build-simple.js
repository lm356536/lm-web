#!/usr/bin/env node
// 仅使用Vite构建，跳过vue-tsc类型检查
import { execSync } from 'child_process';
import { existsSync } from 'fs';

console.log('开始构建...');
try {
  // 直接运行Vite构建
  execSync('npx vite build', { stdio: 'inherit' });
  console.log('\n✅ 构建成功（跳过类型检查）');
} catch (error) {
  console.error('❌ 构建失败');
  process.exit(1);
}