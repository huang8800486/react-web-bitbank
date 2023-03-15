import { Buffer } from 'buffer';

/**
 * 格式化时间
 * @param {String, Date} dateTime 时间
 * @param {String} format 格式
 * @param {boolean} needweek 是否需要星期
 */
export function formatTime(dateTime: number, format = 'yyyy-MM-dd hh:mm:ss') {
  let newFormat = format;
  if (!dateTime) return;
  const d = new Date(dateTime);
  const o = {
    'M+': d.getMonth() + 1,
    'd+': d.getDate(),
    'h+': d.getHours(),
    'm+': d.getMinutes(),
    's+': d.getSeconds(),
    'q+': Math.floor((d.getMonth() + 3) / 3),
    S: d.getMilliseconds(),
  };
  if (/(y+)/.test(newFormat)) {
    newFormat = newFormat.replace(RegExp.$1, (d.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  for (const k in o) {
    if (new RegExp('(' + k + ')').test(newFormat)) {
      newFormat = newFormat.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
    }
  }
  return newFormat;
}
export function scientific(value: string) {
  // 科学计数法计算
  if (value.toLowerCase().indexOf('e') > -1) {
    const a = value.toLowerCase().split('e');
    let b = a[0];
    const c = Math.abs(parseFloat(a[1]));
    let d = '';
    let h = b.length;
    let i;
    if (a[0].split('.')[1]) {
      b = a[0].split('.')[0] + a[0].split('.')[1];
      h = a[0].split('.')[0].length;
    }
    for (i = 0; i < c - h; i++) {
      d = d + '0';
    }
    return '0.' + d + b;
  }
  return value;
}
export const fixD = (num: number | string, precision: number) => {
  // 不存时返回'--', 不检查对象
  if (typeof num === 'undefined' || num === null || num === '') {
    return '--';
  }
  // num初始化
  const newnum = num + '';

  // 不是数字时
  const reg = /^[0-9]+.?[0-9]*$/;
  if (!reg.test(newnum)) {
    return '--';
  }

  // 数字为0时
  if (newnum === '0' && precision > 0) {
    return '0.'.padEnd(+precision + 2, '0');
  }

  // 清除科学记数法
  let fixNum = scientific(newnum);

  // precision不存在时不处理
  if (precision < 0 || typeof precision === 'undefined' || precision === null) {
    return fixNum;
  }
  // 格式化
  const fNum = fixNum.split('.');
  if (!fNum[1]) {
    fixNum = parseFloat(fixNum).toFixed(precision);
  } else if (precision === 0) {
    fixNum = parseInt(fixNum, 10) + '';
  } else if (fNum[1].length > precision) {
    if (fNum[1].indexOf('99999999999999999') > -1) {
      const s = parseFloat(fixNum).toFixed(precision + 1);
      fixNum = s.slice(0, s.length - 1);
    } else {
      fixNum = fNum[0] + '.' + fNum[1].substring(0, precision);
    }
  } else {
    fixNum = fNum[0] + '.' + fNum[1].padEnd(precision, '0');
  }
  return fixNum;
};
/**
 * 中间显示...
 * @param str 原数据
 * @param prevNum 左边几位
 * @param nextNext 右边几位
 * @returns {String} => 121344...84748
 */
export function getString(str: string, prevNum = 6, nextNext = 4): string {
  if (typeof str !== 'string') {
    return str;
  }
  let prev = '';
  let next = '';
  let string = '';
  if (str.length > 10) {
    prev = str.slice(0, prevNum);
    next = str.slice(str.length - nextNext);
    string = prev + ' ... ' + next;
  } else if (+str.length > 10 && +str.length < 10) {
    prev = str.slice(0, prevNum);
    next = str.slice(str.length - nextNext);
    string = prev + ' ... ' + next;
  } else {
    string = str;
  }

  return string;
}
/**
 * 邀请链接
 * @param account 用户地址
 * @returns {String} => 网站地址
 */
export function getWebSite(account: string): string {
  return `${window.location.protocol}//${window.location.host}/index?inviteCode=${account}`;
}

/**
 * 引用图片
 * @param name 图片名字
 * @returns
 */
export function getImages(name: string) {
  if (typeof name === 'undefined') return '';
  const path = `/src/assets/images/${name}`;
  // const modules = import.meta.globEager('/src/assets/images/*');
  const modules: any = import.meta.glob('/src/assets/images/*', { eager: true });
  return modules[path]?.default;
}
/**
 * 引用图片
 * @param name 图片名字
 * @returns
 */
export function getIcon(name: string) {
  if (typeof name === 'undefined') return '';
  const path = `/src/assets/images/icon/${name}`;
  // const modules = import.meta.globEager('/src/assets/images/*');
  const modules: any = import.meta.glob('/src/assets/images/icon/*', { eager: true });
  return modules[path]?.default;
}

/**
 * 区间值
 */
export function sectionValue(arr: number[], num: number) {
  const reg = /^[0-9]*$/g;
  if (!reg.test(num + '')) {
    return -1;
  }
  let i = 0;
  const len = arr.length;
  if (!(len > 0)) {
    return;
  }
  //如果 num 的值超过了 数组之和，不在考虑范围之类
  for (i; i < len; i++) {
    if (arr[i] >= num) {
      return i;
    }
  }
  return i;
}
export function base64ToJs(data: string) {
  const str = data.replace('data:application/json;base64,', '');
  let unit: any = Buffer.from(str, 'base64').toString('ascii');
  try {
    unit = JSON.parse(unit);
  } catch (error) {
    unit = {};
  }
  return unit;
}

// export const vendorNames = ['Webkit', 'Moz', 'ms'];
// export function normalize(prop: string) {
//   const emptyStyle = document.createElement('div').style;
//   prop = camelize(prop);
//   if (prop !== 'filter' && prop in emptyStyle) {
//     return prop;
//   }
//   const capName = prop.charAt(0).toUpperCase() + prop.slice(1);
//   for (let i = 0; i < vendorNames.length; i++) {
//     const name = vendorNames[i] + capName;
//     if (name in emptyStyle) {
//       return name;
//     }
//   }
// }
// export const camelize = (str: string): string => {
//   return str.replace('/-(w)/g', (_, c) => (c ? c.toUpperCase() : ''));
// };
