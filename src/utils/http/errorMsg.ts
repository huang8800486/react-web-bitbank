/**
 * 处理业务报错逻辑
 * @param {string}  errorMessageMode // 提示类型 none | message | modal
 * @param {any} error // 接口返回错误对象
 */
export const errorMsg = (errorMessageMode: string, error: any) => {
  let errMessage = '';
  const { code, message } = error || {};
  const err: string = error?.toString?.() ?? '';
  try {
    if (code === 'ECONNABORTED' && message.indexOf('timeout') !== -1) {
      errMessage = '接口请求超时,请刷新页面重试!';
      console.log(errMessage);
    }
    if (err?.includes('Network Error')) {
      errMessage = '网络异常，请检查您的网络连接是否正常!';
      console.log(errMessage);
    }
    if (errMessage) {
      // 弹窗提示
      if (errorMessageMode === 'modal') {
        console.log('弹窗错误提示', errorMessageMode, errMessage);
        // 消息提示
      } else if (errorMessageMode === 'message') {
        console.log('消息错误提示', errorMessageMode, errMessage);
      }
      return Promise.reject(error);
    }
  } catch (error) {
    throw new Error(error as unknown as string);
  }
};
