# Vue3 + TypeScript + Vite Monorepo 项目架构文档

## 一、项目概述

本文档详细说明基于Vue3、TypeScript和Vite构建的Monorepo前端项目架构，包含多个相互关联但可独立开发/构建的子项目，实现代码复用、统一规范和高效依赖管理。

## 二、项目结构

```
lm-web/
├── apps/                     # 业务应用目录
│   └── web-antd/             # Ant Design Vue业务应用
│       ├── index.html
│       ├── package.json
│       ├── public/
│       ├── src/
│       ├── tsconfig.json
│       └── vite.config.ts
├── packages/                 # 共享包目录
│   ├── components/           # 共享组件库
│   │   ├── package.json
│   │   ├── src/
│   │   ├── tsconfig.json
│   │   └── vite.config.ts
│   ├── utils/                # 工具函数库
│   │   ├── package.json
│   │   ├── src/
│   │   └── tsconfig.json
│   └── types/                # 类型定义库
│       ├── package.json
│       ├── src/
│       └── tsconfig.json
├── internal/                 # 内部工具和配置
│   ├── lint-configs/
│   ├── node-utils/
│   ├── prettier-config/
│   ├── tailwind-config/
│   ├── tsconfig/
│   └── vite-config/
├── playground/               # 实验环境
├── package.json              # 根项目配置
├── pnpm-workspace.yaml       # pnpm工作区配置
├── tsconfig.json             # 根TypeScript配置
└── tsconfig.node.json        # Node环境TypeScript配置
```

### 目录说明
- **apps/**: 存放所有业务应用，每个应用可独立构建和部署
- **packages/**: 存放共享代码库，包括组件、工具函数、类型定义等
- **internal/**: 存放内部开发工具、配置和辅助脚本
- **playground/**: 用于实验和测试新功能的环境

## 三、核心配置文件

### 1. pnpm-workspace.yaml

```yaml
# 定义工作区范围
packages:
  - "apps/*"
  - "packages/*"
  - "internal/*"
  - "playground"
```

### 2. 根目录 tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "module": "ESNext",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "preserve",

    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["**/*.ts", "**/*.d.ts", "**/*.tsx", "**/*.vue"],
  "references": [
    { "path": "./tsconfig.node.json" },
    { "path": "./apps/web-antd/tsconfig.json" },
    { "path": "./packages/components/tsconfig.json" },
    { "path": "./packages/utils/tsconfig.json" },
    { "path": "./packages/types/tsconfig.json" }
  ]
}
```

### 3. 根目录 package.json（核心脚本）

```json
{
  "name": "lm-web-monorepo",
  "private": true,
  "type": "module",
  "scripts": {
    "build": "pnpm run build:packages && pnpm run build:web",
    "build:packages": "pnpm -F @lm/types -F @lm/utils -F @lm/components run build",
    "build:web": "pnpm -F @lm/web-antd run build",
    "check:type": "pnpm run check:type:packages && pnpm run check:type:web",
    "check:type:packages": "pnpm -F @lm/types -F @lm/utils -F @lm/components run type-check",
    "dev": "pnpm run dev:packages && pnpm run dev:web",
    "dev:packages": "pnpm -F @lm/components run dev",
    "dev:web": "pnpm -F @lm/web-antd run dev"
  }
}
```

## 四、共享包配置

### 1. packages/components/package.json

```json
{
  "name": "@lm/components",
  "version": "0.1.0",
  "type": "module",
  "types": "dist/index.d.ts",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "default": "./dist/index.js"
    }
  },
  "scripts": {
    "build": "vite build && tsc -d --emitDeclarationOnly",
    "dev": "vite build --watch",
    "type-check": "tsc --noEmit"
  },
  "dependencies": {
    "@lm/types": "workspace:*",
    "@lm/utils": "workspace:*",
    "ant-design-vue": "^4.0.0",
    "vue": "^3.4.0"
  },
  "devDependencies": {
    "@vitejs/plugin-vue": "^5.0.0",
    "typescript": "^5.0.0",
    "vite": "^5.0.0"
  }
}
```

### 2. packages/utils/package.json

```json
{
  "name": "@lm/utils",
  "version": "0.1.0",
  "type": "module",
  "types": "dist/index.d.ts",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "default": "./dist/index.js"
    }
  },
  "scripts": {
    "build": "tsc -d",
    "type-check": "tsc --noEmit"
  },
  "dependencies": {
    "@lm/types": "workspace:*"
  },
  "devDependencies": {
    "typescript": "^5.0.0"
  }
}
```

### 3. packages/types/package.json

```json
{
  "name": "@lm/types",
  "version": "0.1.0",
  "type": "module",
  "types": "dist/index.d.ts",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "default": "./dist/index.js"
    }
  },
  "scripts": {
    "build": "tsc -d",
    "type-check": "tsc --noEmit"
  },
  "devDependencies": {
    "typescript": "^5.0.0"
  }
}
```

## 五、构建配置

### 1. packages/components/vite.config.ts

```typescript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: '@lm/components',
      fileName: 'index'
    },
    rollupOptions: {
      external: ['vue', 'ant-design-vue'],
      output: {
        globals: {
          vue: 'Vue',
          'ant-design-vue': 'AntDesignVue'
        }
      }
    }
  }
})
```

### 2. packages/components/tsconfig.json

```json
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "outDir": "dist",
    "declaration": true,
    "rootDir": "src",
    "module": "ESNext",
    "moduleResolution": "bundler"
  },
  "include": ["src"],
  "exclude": ["node_modules"]
}
```

## 六、开发与构建流程

### 安装依赖

```bash
# 安装所有项目依赖
pnpm install
```

### 开发模式

```bash
# 启动特定业务应用（推荐开发时使用）
pnpm run dev:web

# 启动所有相关服务（组件库watch + 业务应用）
pnpm run dev
```

### 构建项目

```bash
# 构建所有共享包
pnpm run build:packages

# 构建特定业务应用
pnpm run build:web

# 构建整个项目（共享包 + 业务应用）
pnpm run build
```

### 类型检查

```bash
# 检查所有共享包类型
pnpm run check:type:packages

# 检查整个项目类型
pnpm run check:type
```

## 七、子包间依赖引用示例

### 1. 在组件库中引用工具库

```typescript
// packages/components/src/HelloWorld.vue
<script setup lang="ts">
import { formatDate } from '@lm/utils'
import type { UserInfo } from '@lm/types'

// 使用示例
const formattedDate = formatDate(new Date())
</script>
```

### 2. 在业务应用中引用组件库

```typescript
// apps/web-antd/src/App.vue
<script setup lang="ts">
import { HelloWorld } from '@lm/components'
</script>

<template>
  <HelloWorld />
</template>
```

## 八、注意事项

### 1. 依赖管理规范
- 所有子包间依赖必须使用 `workspace:*` 协议引用
- 不要在子包间直接引用 `node_modules` 中的依赖
- 类型定义文件必须放在 `dist` 目录下，确保构建时正确引用

### 2. 避免循环依赖
- 遵循单向依赖流：types → utils → components → apps
- 类型定义库（@lm/types）不应依赖其他任何包
- 工具库（@lm/utils）只可依赖类型定义库
- 组件库可依赖工具库和类型定义库
- 业务应用可依赖所有共享包

### 3. 开发环境注意事项
- 修改共享包代码后，需要重新构建才能在业务应用中生效
- 使用 `pnpm run dev:packages` 启动组件库的watch模式，实现代码热更新
- 确保类型定义文件正确导出，便于IDE提供类型提示

## 九、项目优化建议

1. **添加自动化测试**：为共享组件和工具函数添加单元测试
2. **实现CI/CD流程**：配置自动化构建、测试和部署流程
3. **添加文档系统**：为组件库和工具库添加使用文档
4. **实现版本发布工具**：支持批量发布和语义化版本管理
5. **添加代码覆盖率报告**：确保代码质量

通过以上架构设计和实现，我们成功构建了一个灵活、高效的Monorepo前端项目集合，支持代码复用、统一规范和高效依赖管理，为团队协作开发提供了良好的基础。