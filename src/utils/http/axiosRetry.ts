import { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import { RequestEnum } from './httpEnum';
/**
 *  请求重试机制
 */

export class AxiosRetry {
  /**
   * 重试
   */
  retry(AxiosInstance: AxiosInstance, error: AxiosError) {
    // @ts-ignore
    const { config } = error.response;
    const retryRequest = config?.requestOptions?.retryRequest;
    config.__retryCount = config.__retryCount || 0;
    if (config.__retryCount >= retryRequest?.count) {
      return Promise.reject(error);
    }
    config.__retryCount += 1;
    return this.delay(retryRequest?.waitTime).then(() => AxiosInstance(config));
  }

  /**
   * 延迟
   */
  private delay(waitTime: number) {
    return new Promise((resolve) => setTimeout(resolve, waitTime));
  }
}
/**
 *  调用重试机制
 */
export const retryFetch = (config: any, axiosInstance: AxiosResponse, error: any) => {
  // 添加自动重试机制 保险起见 只针对GET请求
  const retryRequest = new AxiosRetry();
  const { isOpenRetry } = config.requestOptions.retryRequest;
  config.method?.toUpperCase() === RequestEnum.GET &&
    isOpenRetry &&
    // @ts-ignore
    retryRequest.retry(axiosInstance, error);
};
