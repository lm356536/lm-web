# LM Web Monorepo

基于 Vue 3、TypeScript、Vite 的现代化 Monorepo 前端项目架构。

## 项目结构

```
├── apps/                    # 应用目录
│   └── lm-antd-admin/           # 基于 Ant Design Vue 的管理系统
├── packages/               # 共享包目录
│   ├── components/         # 共享组件库
│   ├── utils/              # 工具函数库
│   └── types/              # 类型定义库
├── internal/               # 内部工具和配置
│   ├── lint-configs/       # ESLint 配置
│   └── vite-config/        # Vite 共享配置
├── playground/             # 开发测试环境
├── scripts/                # 构建和部署脚本
└── docs/                   # 项目文档
```

## 快速开始

### 环境要求

- Node.js >= 16.x
- pnpm >= 7.x

### 安装依赖

```bash
pnpm install
```

### 开发命令

```bash
# 启动所有应用
pnpm dev

# 仅启动 lm-antd-admin 应用
pnpm dev:web

# 仅启动 playground 应用
pnpm dev:play
```

### 构建命令

```bash
# 构建所有项目
pnpm build

# 仅构建 lm-antd-admin 应用
pnpm build:web
```

### 代码规范检查

```bash
# ESLint 检查并自动修复
pnpm lint

# 类型检查
pnpm check

# 格式化代码
pnpm format
```

### 清理项目

```bash
# 清理构建产物和 node_modules
pnpm clean
```

## 子包说明

### @lm/components

共享组件库，提供可复用的 Vue 组件。

### @lm/utils

工具函数库，提供通用的工具函数。

### @lm/types

类型定义库，提供共享的 TypeScript 类型。

## 技术栈

- **核心框架**: Vue 3 (Composition API)
- **语言**: TypeScript
- **构建工具**: Vite
- **包管理器**: pnpm
- **UI 组件库**: Ant Design Vue 4.x
- **代码规范**: ESLint + Prettier
- **Monorepo 工具**: Turborepo

## 开发规范

1. 所有代码必须通过 TypeScript 类型检查
2. 遵循 ESLint 和 Prettier 规范
3. 组件必须包含完整的类型定义和文档
4. 子包间依赖使用 `workspace:*` 协议引用
