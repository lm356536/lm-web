import { type UserConfig } from 'vite';

/**
 * 基础Vite配置
 */
export const createBaseConfig = (): UserConfig => ({
  plugins: [],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
});

/**
 * 开发服务器配置
 */
export const createServerConfig = (port = 3000) => ({
  server: {
    port,
    open: true,
    cors: true,
    fs: {
      strict: true,
    },
  },
});