import { defineConfig } from 'vite';
import { resolve } from 'path'; // 路径
import react from '@vitejs/plugin-react';

function pathResolve(dir: string) {
  return resolve(process.cwd(), '.', dir);
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      // /@/xxxx => src/xxxx
      {
        find: /@\//,
        replacement: pathResolve('src') + '/',
      },
      // /#/xxxx => types/xxxx
      {
        find: /#\//,
        replacement: pathResolve('types') + '/',
      },
    ],
  },
});
