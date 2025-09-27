#!/usr/bin/env node
import { existsSync, promises as fs } from 'fs';
import path from 'path';

// 清理指定目录的函数
async function cleanDirectory(dir: string) {
  if (existsSync(dir)) {
    console.log(`删除目录: ${dir}`);
    await fs.rm(dir, { recursive: true, force: true });
  }
}

// 清理指定文件的函数
async function cleanFile(file: string) {
  if (existsSync(file)) {
    console.log(`删除文件: ${file}`);
    await fs.unlink(file);
  }
}

// 主清理函数
async function clean() {
  try {
    const rootDir = process.cwd();
    
    // 清理node_modules
    await cleanDirectory(path.join(rootDir, 'node_modules'));
    
    // 清理子包的node_modules
    const subPackages = [
      'apps/web-antd',
      'playground',
      'internal/lint-configs',
      'internal/vite-config',
      'packages/components',
      'packages/types',
      'packages/utils'
    ];
    
    for (const pkg of subPackages) {
      await cleanDirectory(path.join(rootDir, pkg, 'node_modules'));
      await cleanDirectory(path.join(rootDir, pkg, 'dist'));
      await cleanDirectory(path.join(rootDir, pkg, 'build'));
      await cleanDirectory(path.join(rootDir, pkg, '.turbo'));
    }
    
    // 清理根目录的一些缓存文件
    await cleanDirectory(path.join(rootDir, '.turbo'));
    await cleanDirectory(path.join(rootDir, '.vite'));
    await cleanFile(path.join(rootDir, 'pnpm-lock.yaml'));
    
    console.log('\n✅ 清理完成');
  } catch (error) {
    console.error('❌ 清理过程中出现错误:', error);
    process.exit(1);
  }
}

// 执行清理
clean();