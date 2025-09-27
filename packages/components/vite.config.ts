import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    vue(),
    dts({
      outDir: 'dist',
      insertTypesEntry: true,
      cleanVueFileName: true,
      copyDtsFiles: true,
      include: ['src/index.ts', 'src/components/**/*.vue'],
    }),
  ],
  build: {
    lib: {
      entry: {
        index: resolve(__dirname, 'src/index.ts'),
        'components/HelloWorld': resolve(__dirname, 'src/components/HelloWorld.vue'),
      },
      name: '@lm/components',
      formats: ['es'],
    },
    rollupOptions: {
      external: ['vue', 'ant-design-vue'],
      output: {
        globals: {
          vue: 'Vue',
          'ant-design-vue': 'AntDesignVue',
        },
        exports: 'named',
        // 保持文件结构
        preserveModules: true,
        preserveModulesRoot: 'src',
      },
    },
  },
});
