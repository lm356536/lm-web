# Vue3 + TypeScript + Vite Monorepo 项目架构文档

## 一、项目概述

本文档详细说明基于Vue3、TypeScript和Vite构建的Monorepo前端项目架构，包含多个相互关联但可独立开发/构建的子项目，实现代码复用、统一规范和高效依赖管理。

## 二、项目结构

```
lm-web/
├── apps/                     # 业务应用目录
│   └── lm-antd-admin/             # Ant Design Vue业务应用
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
    { "path": "./apps/lm-antd-admin/tsconfig.json" },
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
    "build:web": "pnpm -F @lm/lm-antd-admin run build",
    "check:type": "pnpm run check:type:packages && pnpm run check:type:web",
    "check:type:packages": "pnpm -F @lm/types -F @lm/utils -F @lm/components run type-check",
    "dev": "pnpm run dev:packages && pnpm run dev:web",
    "dev:packages": "pnpm -F @lm/components run dev",
    "dev:web": "pnpm -F @lm/lm-antd-admin run dev"
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

## 八、构建配置

### 1. 构建命令

```bash
# 构建特定业务应用
pnpm -F @lm/lm-antd-admin run build

# 或使用根目录脚本
pnpm run build:web
```

### 2. 业务应用优化配置

**apps/lm-antd-admin/vite.config.ts**

```typescript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  build: {
    // 避免过大chunk警告
    chunkSizeWarningLimit: 2000,
    // 仅保留vue相关依赖的代码分割
    manualChunks: {
      'vue-vendor': ['vue', 'vue-router']
    }
  },
  server: {
    port: 3001
  }
})
```

## 九、Ant Design Vue 按需引入指南

### 1. 组件按需引入方法

在组件中按需引入 Ant Design Vue 组件和图标：

```vue
<script setup lang="ts">
// 按需引入组件
import { Card, Tag, Button } from 'ant-design-vue'
import { HomeOutlined, UserOutlined } from '@ant-design/icons-vue'
// 引入重置样式
import 'ant-design-vue/dist/reset.css'
</script>
```

### 2. 图标使用规范

Ant Design Vue v4 中图标组件使用短横线格式：

```vue
<template>
  <div>
    <home-outlined />
    <user-outlined />
  </div>
</template>
```

### 3. Vite 配置简化

按需引入后，Vite 配置可以简化：

```typescript
build: {
  // 避免过大chunk警告
  chunkSizeWarningLimit: 2000,
  // 仅保留vue相关依赖的代码分割
  manualChunks: {
    'vue-vendor': ['vue', 'vue-router']
  }
}
```

### 4. 按需引入优势

- **减小打包体积**：只引入使用的组件，减小最终构建文件大小
- **优化加载性能**：减少不必要的代码加载
- **避免全量样式冲突**：降低全局样式冲突风险

### 5. 注意事项

- Ant Design Vue v4 使用 `reset.css` 作为基础样式，不再有 `antd.css`
- 确保在使用组件前正确引入组件和必要的样式
- 图标组件需要从 `@ant-design/icons-vue` 单独引入

## 十、项目优化建议

1. **添加自动化测试**：使用 Vitest + Vue Test Utils 为组件和工具函数添加单元测试

2. **避免循环依赖**：确保子包间不会形成循环引用，影响构建和运行

3. **类型定义文件位置**：将类型定义文件放在 `dist` 目录下，确保在构建时被正确引用

4. **依赖版本一致性**：使用 pnpm 的 workspace 特性确保依赖版本一致

5. **性能优化**：
   - 组件懒加载
   - 图片优化
   - 路由预加载

6. **代码规范**：
   - 使用 ESLint + Prettier 确保代码风格一致
   - 配置 TypeScript 严格模式

7. **文档维护**：
   - 为组件和工具函数添加 JSDoc 注释
   - 维护更新项目文档

8. **测试覆盖**：
   - 增加单元测试覆盖率
   - 添加 E2E 测试

9. **持续集成**：
   - 配置 GitHub Actions 或其他 CI 工具
   - 自动化测试和构建

10. **发布策略**：
    - 制定语义化版本管理规范
    - 配置自动化发布脚本

11. **实现CI/CD流程**：建立自动化的代码集成和部署流程，提高开发效率

12. **添加文档系统**：使用 VitePress 或 Storybook 为组件库添加文档和演示

通过以上配置和最佳实践，我们成功实现了一个基于 Vue 3、TypeScript 和 Vite 的多包（Monorepo）前端项目，实现了子项目间的代码复用、统一管理和高效开发。