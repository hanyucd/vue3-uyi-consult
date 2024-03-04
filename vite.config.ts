import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import eslintPlugin from 'vite-plugin-eslint';
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from 'unplugin-vue-components/resolvers';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    // port: 8080,
    port: 80,
    host: true,
    proxy: {
      '/api': {
        target: 'https://consult-api.itheima.net',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      }
    },
  },
  plugins: [
    vue(),
    eslintPlugin(),
    Components({
      dts: 'src/components.d.ts', // generate `components.d.ts` global declarations
      // vant 样式全局引入了，关闭自动按需引入
      resolvers: [VantResolver({ importStyle: false })],
    }),
    createSvgIconsPlugin({
      // 指定图标文件夹，绝对路径（NODE代码）
      iconDirs: [path.resolve(process.cwd(), 'src/icons')]
    })
  ],
});
