# Changelog

## [Unreleased]

### 项目初始化与架构搭建

- 基于 Vue 3、TypeScript、Vite 创建 Monorepo 架构
- 配置 pnpm-workspace.yaml 实现多包管理
- 建立 apps/lm-antd-admin 子包
- 创建 packages 目录，包含 components、utils 等共享库
- 实现 internal 目录存放项目内部配置工具

### 核心配置文件

- 创建根目录 tsconfig.json 实现统一 TypeScript 配置
- 为 apps/lm-antd-admin 添加 tsconfig.json 配置，支持路径别名和复合编译
- 实现 scripts/clean/index.js 清理脚本，支持多包清理
- 在根目录 package.json 添加 clean 命令
- 创建根目录 README.md 文档

### 兼容性问题修复

- 解决 vue-tsc 与 TypeScript 版本不兼容问题
- 安装 terser 解决 Vite 构建依赖缺失

### 功能实现

- 实现子包间依赖通过 workspace:\* 协议引用
- 支持独立构建和运行各子包

### 开发体验优化

- 支持热更新：修改共享组件/工具后，业务应用实时生效
- 配置统一的开发和构建流程

## 注意事项

- 子包间依赖通过 workspace:\* 协议引用，确保开发时实时更新
- 构建时可能需要跳过类型检查以避免兼容性问题
- 使用 pnpm add -D 安装依赖时需注意添加 -w 标志到工作区根目录
