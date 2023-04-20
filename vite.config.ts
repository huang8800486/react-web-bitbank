import type { UserConfig, ConfigEnv } from 'vite';
import { loadEnv } from 'vite';
import { resolve } from 'path'; // 路径
import { wrapperEnv } from './build/utils';
import { createVitePlugins } from './build/vite/plugin';
import { createProxy } from './build/vite/proxy';
import { setToken } from './tokenConfig';
import nodePolyfills from 'rollup-plugin-polyfill-node';
import inject from '@rollup/plugin-inject';

function pathResolve(dir: string) {
  return resolve(process.cwd(), '.', dir);
}
// https://vitejs.dev/config/
export default ({ command, mode }: ConfigEnv): UserConfig => {
  setToken();
  const root = process.cwd();

  const env = loadEnv(mode, root);

  // The boolean type read by loadEnv is a string. This function can be converted to boolean type
  const viteEnv = wrapperEnv(env);

  const { VITE_PORT, VITE_PROXY, VITE_PUBLIC_PATH } = viteEnv;

  const isBuild = command === 'build';
  return {
    base: VITE_PUBLIC_PATH,
    root,
    plugins: createVitePlugins(viteEnv, isBuild),
    server: {
      host: true,
      port: VITE_PORT,
      // Load proxy configuration from .env
      proxy: createProxy(VITE_PROXY),
    },
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
        {
          find: /process/,
          replacement: 'process/browser',
        },
        {
          find: /buffer/,
          replacement: 'buffer',
        },
      ],
    },

    build: {
      minify: 'terser', // vite2.6.x需要配置 “build.minify” 为 “terser”
      target: 'es2015', // 浏览器兼容
      outDir: './dist', // 指定输出路径
      emptyOutDir: true, // 不在项目根目录中, 清空目录
      assetsDir: 'static', // 合并所有文件只在static
      cssCodeSplit: true, //css代码拆分,禁用则所有样式保存在一个css里面
      sourcemap: false, //是否构建source map 文件
      chunkSizeWarningLimit: 2000, // chunk 大小警告的限制
      terserOptions: {
        // 删除console, debugger
        compress: {
          // eslint-disable-next-line camelcase
          drop_console: true,
          // eslint-disable-next-line camelcase
          drop_debugger: true,
        },
      },
      rollupOptions: {
        // @ts-ignore
        plugins: [inject({ Buffer: ['buffer', 'Buffer'], process: 'process' }), nodePolyfills()],
        output: {
          /**
           * 2.以函数的形式使用
           * 将第三方包全部打包在一个chunk中，名称叫 vendor
           */
          manualChunks(id, { getModuleInfo, getModuleIds }) {
            if (id.includes('node_modules')) {
              return 'vendor';
            }
          },
          // 用于从入口点创建的块的打包输出格式[name]表示文件名,[hash]表示该文件内容hash值
          entryFileNames: 'static/js/[name].[hash].js', // 用于命名代码拆分时创建的共享块的输出命名
          chunkFileNames: 'static/js/[name].[hash].js', // 用于输出静态资源的命名，[ext]表示文件扩展名
          // assetFileNames: 'static/[ext]/name-[hash].[ext]',
          assetFileNames: (chunkInfo) => {
            // 用后缀名称进行区别处理
            const subDir = chunkInfo.name?.endsWith('.css') ? 'css' : 'images';
            return `static/${subDir}/[name].[hash].[ext]`;
          },
        },
      },
    },
  };
};
