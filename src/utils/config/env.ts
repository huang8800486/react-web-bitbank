interface GlobEnvConfig {
  // Service interface url
  VITE_GLOB_API_URL: string;

  // Upload url
  VITE_GLOB_UPLOAD_URL?: string;
}
export interface GlobConfig {
  // Service interface url
  apiUrl: string;
  // Upload url
  uploadUrl?: string;
}
// 获取系统配置
export function getAppEnvConfig() {
  const ENV = import.meta.env as unknown as GlobEnvConfig;
  const { VITE_GLOB_API_URL, VITE_GLOB_UPLOAD_URL } = ENV;

  return { VITE_GLOB_API_URL, VITE_GLOB_UPLOAD_URL };
}
// 使用系统配置
export function useGlobSetting() {
  const { VITE_GLOB_API_URL, VITE_GLOB_UPLOAD_URL } = getAppEnvConfig();
  // Take global configuration
  const glob: Readonly<GlobConfig> = {
    apiUrl: VITE_GLOB_API_URL,
    uploadUrl: VITE_GLOB_UPLOAD_URL,
  };
  return glob as Readonly<GlobConfig>;
}

/**
 * @description: Development mode
 */
export const devMode = 'development';

/**
 * @description: Production mode
 */
export const prodMode = 'production';

/**
 * @description: 获取环境变量
 * @returns:
 * @example:
 */
export function getEnv(): string {
  return import.meta.env.MODE;
}

/**
 * @description: 开发模式
 * @returns:
 * @example:
 */
export function isDevMode(): boolean {
  return import.meta.env.DEV;
}

/**
 * @description: 生产模式
 * @returns:
 * @example:
 */
export function isProdMode(): boolean {
  return import.meta.env.PROD;
}
