import type { ESLint } from 'eslint';

/**
 * 共享的ESLint配置
 */
export function defineConfig(): ESLint.Config[] {
  return [
    {
      ignores: ['**/node_modules/**', '**/dist/**', '**/coverage/**', '**/.git/**', '**/pnpm-lock.yaml'],
    },
    {
      files: ['**/*.vue', '**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
      languageOptions: {
        parser: require('@typescript-eslint/parser'),
        parserOptions: {
          ecmaVersion: 2022,
          sourceType: 'module',
          ecmaFeatures: {
            jsx: true,
          },
        },
      },
      plugins: {
        vue: require('eslint-plugin-vue'),
        '@typescript-eslint': require('@typescript-eslint/eslint-plugin'),
        prettier: require('eslint-plugin-prettier'),
      },
      rules: {
        // Vue相关规则
        'vue/multi-word-component-names': 'off',
        'vue/script-setup-no-uses-vars': 'off',
        'vue/no-v-model-argument': 'off',
        
        // TypeScript相关规则
        '@typescript-eslint/no-explicit-any': 'warn',
        '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
        '@typescript-eslint/ban-ts-comment': 'warn',
        '@typescript-eslint/no-empty-function': 'warn',
        
        // Prettier规则
        'prettier/prettier': 'error',
        
        // 基础规则
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
      },
    },
  ];
}