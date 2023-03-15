/**
 *  Vite Plugin for fast creating SVG sprites.
 * https://github.com/anncwb/vite-plugin-svg-icons
 */

import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import { resolve } from 'path';

export function configSvgIconsPlugin(isBuild: boolean) {
  const svgIconsPlugin = createSvgIconsPlugin({
    iconDirs: [resolve(process.cwd(), 'src/assets/images/svg')], // 生成精灵图像的图标文件夹
    svgoOptions: isBuild, // 开启svg压缩配置
    // default
    symbolId: 'icon-[dir]-[name]',
  });
  return svgIconsPlugin;
}
