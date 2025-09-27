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
export const createServerConfig = (port = 8080) => ({
  server: {
    port,
    strictPort: false, // 端口被占用时自动尝试下一个可用端口
    host: true, // 显示Network地址
    open: true, // 自动打开默认浏览器
    cors: true,
    fs: {
      strict: true,
    },
  },
});
