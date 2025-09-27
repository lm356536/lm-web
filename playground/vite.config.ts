import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { createBaseConfig, createServerConfig } from '@lm/vite-config';

// https://vitejs.dev/config/
export default defineConfig({
  ...createBaseConfig(),
  ...createServerConfig(3001), // 使用3001端口避免与其他应用冲突
  plugins: [vue()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
});