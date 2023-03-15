import { PluginOption } from 'vite';
import react from '@vitejs/plugin-react';
import legacy from '@vitejs/plugin-legacy'; // IE11兼容
export function createVitePlugins(viteEnv: ViteEnv, isBuild: boolean) {
  const { VITE_LEGACY } = viteEnv;

  const vitePlugins: (PluginOption | PluginOption[])[] = [
    // have to
    react(),
  ];

  if (isBuild) {
    VITE_LEGACY && vitePlugins.push(legacy());
  }

  return vitePlugins;
}
