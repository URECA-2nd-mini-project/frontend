import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr({
      // A minimatch pattern, or array of patterns, which specifies the files in the build the plugin should include.
      include: '**/*.svg?react',
    }),
  ],
  server: {
    // 프록시 설정 추가
    proxy: {
      // Spring 서버
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
      // Youtube v3 API
      '/youtube': {
        target: 'https://youtube.googleapis.com',
        rewrite: (path) => path.replace(/^\/youtube/, ''),
        changeOrigin: true,
        secure: false, // TLS 인증서 검사 비활성화
      },
    },
  },
});
