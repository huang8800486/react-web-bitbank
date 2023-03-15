/**
 * process.env.npm_config_argv => 返回 {"remain":[],"cooked":["run","dev"],"original":["run","dev"]} | {"remain":[],"cooked":["run","build"],"original":["run","build"]}
 * runType => 执行哪个环境
 */
import * as fs from 'fs/promises';
import path from 'path';
export const setToken = function (): void {
  const development = 'dev';
  const production = 'pro';
  const hostUrl = path.resolve(__dirname, './src/config/index.ts');
  const configArgv = process.env.npm_config_argv;
  const params = process.argv.splice(2);
  const runType = configArgv ? JSON.parse(configArgv).cooked[1] : '';
  // 如果是启动 => npm run dev, 如果传参是dev => node setToken.js dev
  let type = runType ? (runType === development ? development : production) : params[0];
  if (type === 'dev') {
    type = 'test';
  } else {
    if (params[2] === 'test') {
      type = 'test';
    } else {
      // console.error('ERRL: 执行开发环境：node setToken.js serve');
      type = 'main';
    }
  }
  const routerContent = `import { ${type} } from './token';\nexport default ${type};\n`;
  fs.writeFile(hostUrl, routerContent);
};
