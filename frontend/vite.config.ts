import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react()],
    base: "/gurupadukam/",
    server: {
      proxy: {
        // Target your Node.js backend (local dev only)
        '/api-proxy': 'http://localhost:5000',
        '/ws-proxy': { target: 'ws://localhost:5000', ws: true },
      },
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    define: {
      // Example env variable (not actually used in production)
      'process.env.API_KEY': JSON.stringify('api-key-this-is-not-used-can-be-ignored!'),
    },
  };
});
