import { defineConfig } from 'vite';

// Vite 基础配置
export default defineConfig({
  server: {
    port: 3000, // 指定开发服务器端口
    open: true  // 自动在浏览器打开
  }
});