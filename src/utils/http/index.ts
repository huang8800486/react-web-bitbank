import axios from 'axios';
import { clone } from 'lodash-es';
import { VAxios } from './Axios';
import type { RequestOptions, Result } from './axiosType';
import type { AxiosResponse } from 'axios';
import type { AxiosTransform, CreateAxiosOptions } from './axiosTransform';
import { setObjToUrlParams, deepMerge } from '/@/utils';
import { RequestEnum, ResultEnum, ContentTypeEnum } from './httpEnum';
import { isString } from '/@/utils/is';
import { retryFetch } from '/@/utils/http/axiosRetry';
import { joinTimestamp, formatRequestDate } from './helper';
import { errorMsg } from './errorMsg';
import { checkStatus } from './checkStatus';
import { useGlobSetting } from '/@/utils/config/env';

const globSetting = useGlobSetting();

console.log('globSetting', globSetting);
/**
 * @description: 数据处理，方便区分多种处理方式
 */
const transform: AxiosTransform = {
  /**
   * @description: 处理响应数据。如果数据不是预期格式，可直接抛出错误
   */
  transformResponseHook: (res: AxiosResponse<Result>, options: RequestOptions) => {
    const { isTransformResponse, isReturnNativeResponse } = options;
    // 是否返回原生响应头 比如：需要获取响应头时使用该属性
    if (isReturnNativeResponse) {
      return res;
    }
    // 不进行任何处理，直接返回
    // 用于页面代码可能需要直接获取code，data，message这些信息时开启
    if (!isTransformResponse) {
      return res.data;
    }
    // 错误的时候返回

    // const { data } = res;
    // if (!data) {
    //   // return '[HTTP] Request has no return value';
    //   throw new Error(t('sys.api.apiRequestFailed'));
    // }
    // //  这里 code，result，message为 后台统一的字段，需要在 types.ts内修改为项目自己的接口返回格式
    // const { code, result, message } = data;

    // 这里逻辑可以根据项目进行修改
    // const hasSuccess = data && Reflect.has(data, 'code') && code === ResultEnum.SUCCESS;
    // if (hasSuccess) {
    //   return result;
    // }
    if ((res as any).code === ResultEnum.SUCCESS || (res as any).code === ResultEnum.SUCCESS2) {
      return (res as any).message;
    }
    return Promise.reject(res);
  },

  // 请求之前处理config
  beforeRequestHook: (config, options) => {
    const { apiUrl, joinPrefix, joinParamsToUrl, formatDate, joinTime = true } = options;

    // joinPrefix默认为true时，拼接前缀url, apiUrl环境变更设置的，如"/api", 如"/upload"
    if (joinPrefix && apiUrl && isString(apiUrl)) {
      config.url = `${apiUrl}${config.url}`;
    }
    const params = config.params || {};
    const data = config.data || false;
    formatDate && data && !isString(data) && formatRequestDate(data);
    if (config.method?.toUpperCase() === RequestEnum.GET) {
      if (!isString(params)) {
        // 给 get 请求加上时间戳参数，避免从缓存中拿数据。
        config.params = Object.assign(params || {}, joinTimestamp(joinTime, false));
      } else {
        // 兼容restful风格
        config.url = config.url + params + `${joinTimestamp(joinTime, true)}`;
        config.params = undefined;
      }
    } else {
      if (!isString(params)) {
        formatDate && formatRequestDate(params);
        if (Reflect.has(config, 'data') && config.data && (Object.keys(config.data).length > 0 || config.data instanceof FormData)) {
          config.data = data;
          config.params = params;
        } else {
          // 非GET请求如果没有提供data，则将params视为data
          config.data = params;
          config.params = undefined;
        }
        if (joinParamsToUrl) {
          config.url = setObjToUrlParams(config.url as string, Object.assign({}, config.params, config.data));
        }
      } else {
        // 兼容restful风格
        config.url = config.url + params;
        config.params = undefined;
      }
    }
    return config;
  },

  /**
   * @description: 请求拦截器处理
   */
  requestInterceptors: (config, options) => {
    // 请求之前处理config
    return config;
  },

  /**
   * @description: 响应拦截器处理
   */
  responseInterceptors: (res: AxiosResponse<any>) => {
    return res;
  },

  /**
   * @description: 响应错误处理
   */
  responseInterceptorsCatch: (axiosInstance: AxiosResponse, error: any) => {
    // 错误对象
    const { response, config } = error || {};
    const msg: string = response?.data?.error?.message ?? '';
    const errorMessageMode = config?.requestOptions?.errorMessageMode || 'none';
    // 如果取消请求
    if (axios.isCancel(error)) {
      return Promise.reject(error);
    }
    // 业务逻辑
    errorMsg(errorMessageMode, error);
    // 接口成功状态返回异常状态码
    checkStatus(response, msg, errorMessageMode);
    // 添加自动重试机制 保险起见 只针对GET请求
    retryFetch(config, axiosInstance, error);
    return Promise.reject(error);
  },
};
function createAxios(opt?: Partial<CreateAxiosOptions>) {
  return new VAxios(
    // 深度合并
    deepMerge(
      {
        // See https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication#authentication_schemes
        // authentication schemes，e.g: Bearer
        // authenticationScheme: 'Bearer',
        authenticationScheme: '',
        timeout: 20 * 1000,
        // 基础接口地址
        // baseURL: globSetting.apiUrl,

        headers: { 'Content-Type': ContentTypeEnum.JSON },
        // 如果是form-data格式
        // headers: { 'Content-Type': ContentTypeEnum.FORM_URLENCODED },
        // 数据处理方式
        transform: clone(transform),
        // 配置项，下面的选项都可以在独立的接口请求中覆盖
        requestOptions: {
          // 默认将prefix 添加到url
          joinPrefix: true,
          // 是否返回原生响应头 比如：需要获取响应头时使用该属性
          isReturnNativeResponse: false,
          // 需要对返回数据进行处理
          isTransformResponse: true,
          // post请求的时候添加参数到url
          joinParamsToUrl: false,
          // 格式化提交参数时间
          formatDate: true,
          // 消息提示类型 none | message | none
          errorMessageMode: 'none',
          // 接口地址
          apiUrl: globSetting.apiUrl,
          //  是否加入时间戳
          joinTime: true,
          // 忽略重复请求
          ignoreCancelToken: true,
          // 是否携带token
          withToken: true,
          retryRequest: {
            isOpenRetry: false,
            count: 5,
            waitTime: 100,
          },
        },
      },
      opt || {}
    )
  );
}
export const defHttp = createAxios();
