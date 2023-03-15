import { useStoreMethod, usePublicMethod } from '/@/utils/publicMethod';
import { ethers, utils } from 'ethers';
import { fixD } from './common';
import { isNullOrUnDef } from '/@/utils/is';
/**
 * 实例方法
 * @param {Object} instance // 实例
 * @param {String} method // 方法名
 * @param {Array} param // 参数
 * @returns 结果
 */
export const formatNumber = 1000000000000000000;
export const formatDigit = 3;
export const getInstance = (instance: any, method: string, param: any[] = []) => {
  const { options, getFullAccount, getIsCurrentChianId, getIsNodeConnection, getTotalSupply } = useStoreMethod();
  const { Toast, t } = usePublicMethod();
  return new Promise((resolve, reject) => {
    if (!getIsCurrentChianId.value || !getIsNodeConnection.value) {
      Toast.error(t('wallet.notWallet'));
      return reject();
    }
    if (isNullOrUnDef(getTotalSupply.value) || getTotalSupply.value < 0) {
      Toast.error(t('wallet.notWallet'));
      return reject();
    }
    if (!getFullAccount.value) {
      Toast.error(t('wallet.pleaseConnectWallet'));
      return reject();
    }
    options.setLoadingInfo(true);
    try {
      instance[method](...param)
        .then((result: any) => {
          Toast.info(t('common.wait'));
          result
            .wait()
            .then((res: any) => {
              options.setLoadingInfo(false);
              resolve(res);
            })
            .catch((err: any) => {
              options.setLoadingInfo(false);
              errorText(err);
              reject(err);
            });
        })
        .catch((err: any) => {
          options.setLoadingInfo(false);
          errorText(err);
          reject(err);
        });
    } catch (error) {
      reject(error);
      setTimeout(() => {
        options.setLoadingInfo(false);
      }, 200);
      Toast.error(t('wallet.pleaseContactAdministrator'));
      console.log(`${method}实例方法报错: `, error);
    }
  });
};
/**
 * 错误处理
 * @param {Object} err // 错误对象
 * @returns
 */
export const errorText = (err: any) => {
  const { options } = useStoreMethod();
  const { Toast, t } = usePublicMethod();
  options.setLoadingInfo(false);
  if (err && err.message) {
    let errObj = null;
    try {
      errObj = JSON.parse(JSON.stringify(err));
    } catch {
      console.log('err');
    }
    if (errObj.reason) {
      return Toast.error(errObj.reason);
    }
    if (errObj.data && errObj.data.message) {
      return Toast.error(errObj.data.message);
    }
    if (errObj.error && errObj.error.data.message) {
      return Toast.error(errObj.error.data.message);
    }
    if (errObj.error && errObj.error.message) {
      return Toast.error(errObj.error.message);
    }
    return Toast.error(err.message);
  }
  if (err && err.data) {
    return Toast.error(err.data.message);
  }
  Toast.error(t('common.fail'));
};
/**
 * 格式化精度
 * @param {bigNumber} result // 接口返回值
 * @param {Array} paraArr // 可选参数[digit, type]
 * @param {Number} digit // 精度
 * @param {String} type // 打印的值
 * @returns 数值
 */
export const formatUnits = (result: any, ...paraArr: any) => {
  // console.log('paraArr', paraArr)
  let digit = 18;
  let type = '';
  if (paraArr.length === 1) {
    if (typeof paraArr[0] === 'number') {
      digit = paraArr[0];
    } else if (typeof paraArr[0] === 'string') {
      type = paraArr[0];
    }
  }
  if (paraArr.length === 2) {
    if (typeof paraArr[0] === 'number') {
      digit = paraArr[0];
    }
    if (typeof paraArr[1] === 'string') {
      type = paraArr[1];
    }
  }
  if (result) {
    if (ethers.BigNumber.isBigNumber(result)) {
      type &&
        console.log(
          new Date().getTime(),
          type,
          result.toString(),
          '格式化精度-',
          result.isZero() ? 0 : utils.formatUnits(result.toString(), digit)
        );
      return result.isZero() ? 0 : utils.formatUnits(result.toString(), digit);
    } else {
      console.log(type + '报错', JSON.stringify(result + ''));
    }
  }
  return 0;
};
/**
 * 将合约BigNumber转化为js正常显示值
 * @param {bigNumber} result // 接口返回值
 * @param {String} type // 打印的值
 * @returns
 */
export const toString = (result: any, type = '') => {
  let value: number | string = 0;
  let text = 'error';
  if (ethers.BigNumber.isBigNumber(result)) {
    value = result.toString();
    text = 'success';
  }
  type && console.log(text, type, value);
  return value;
};
/**
 * 区块时间
 */
export const getBlockNumber = (provider: any) => {
  const { address } = useStoreMethod();
  provider.on('block', () => {
    provider.getBlock().then((result: any) => {
      address.setBlockTime(result.timestamp);
    });
  });
};
/**
 * 字段处理
 * @param {Object} instance // 实例
 * @param {String} method // 方法名
 * @param {Array} param // 参数
 * @param {String} field // 如果有下级对象名
 * @param {Boolean} toF // 格式化formatUnits
 * @param {Boolean} toS // 格式化toString
 * @param {Boolean} fix // 格式化保留位数
 * @param {Object} obj //  赋值对象
 * @returns 结果
 */
//  getContractMethods(this.PEOPLEINSTANCE, 'balanceOf', 'peopleBalance', { param: [fullAccount], toF: true, fix: true });
interface ContractType {
  field?: string;
  toF?: boolean;
  toS?: boolean;
  fix?: boolean;
  log?: string;
  isZero?: boolean;
  param?: Array<string | number>;
}
export function getContractMethod(instance: any, method: string, name: string, data: ContractType) {
  const { contract } = useStoreMethod();
  const { field, toF, toS, fix, param, log, isZero } = data;
  const pa = param ? param : '';
  try {
    instance[method](...pa)
      .then((result: any) => {
        let value = field ? result[field] : result;
        if (toF) {
          value = fix ? fixD(formatUnits(result, log), formatDigit) : formatUnits(result, log);
        }
        if (toS) {
          value = +toString(value, log);
        }
        if (isZero) {
          log && console.log(`${log}, ${method}, ${field}判断:`, !value.isZero(), '值是: ', value.toString());
          value = !value.isZero();
        }
        if (log && !toF && !toS && !isZero) {
          console.log(`${method}${log}: 值是:`, value);
        }
        (contract as any)[name] = value;
      })
      .catch((err: any) => {
        console.log(method, err);
      });
  } catch (err) {
    console.log(`${method}报错: `, err);
  }
}
