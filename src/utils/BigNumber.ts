import { BigNumber } from 'bignumber.js';
export interface CreateOptions {
  decimalSeparator: string;
  groupSeparator: string;
  groupSize: number;
  secondaryGroupSize: number;
  fractionGroupSeparator: string;
  fractionGroupSize: number;
}
export class VfixN {
  private handleData(value: BigNumber): string {
    // 计算为为NaN
    if (value.isNaN() || !value.isFinite()) {
      return '0';
    }
    // 不是NaN and 和是有效数字Infinity
    if (!value.isNaN() && value.isFinite()) {
      const newValue = value + '';
      if (newValue.toLowerCase().indexOf('e') > -1) {
        // BigNumber(1.123).toFixed() 原样返回'1.123'
        return value.toFixed();
      }
    }
    // 转换为js 基础数值类型
    return value.toNumber() + '';
  }
  private options: CreateOptions;

  constructor() {
    this.options = {
      decimalSeparator: '.', // 小数分隔符
      groupSeparator: ',', // 整数分隔符
      groupSize: 3, // 一组分隔几位数
      secondaryGroupSize: 0, // 从第2组分隔类型
      fractionGroupSeparator: '', // 小数区域分隔符
      fractionGroupSize: 0, // 小数区域组分隔位数
    };
  }
  // 数字格式化
  toFormat(value: number | string, options?: Partial<CreateOptions>): string {
    this.options = options ? { ...this.options, ...options } : this.options;
    BigNumber.config({ FORMAT: this.options });
    return BigNumber(value).toFormat();
  }
  // 格式化科学计算法
  toFixed(value: number | string): string {
    return BigNumber(value).toFixed();
  }
  // 加减乘除 | plus | minus multipliedBy dividedBy
  all(prevNumber: number | string, nextNumber: number | string, methods: string): string {
    const value = BigNumber(prevNumber)[methods](BigNumber(nextNumber));
    return this.handleData(value);
  }
  // 加法
  add(prevNumber: number | string, nextNumber: number | string): string {
    const value = BigNumber(prevNumber).plus(BigNumber(nextNumber));
    return this.handleData(value);
  }
  // 减法
  sub(prevNumber: number | string, nextNumber: number | string): string {
    const value = BigNumber(prevNumber).minus(BigNumber(nextNumber));
    return this.handleData(value);
  }
  // 乘法
  mul(prevNumber: number | string, nextNumber: number | string): string {
    const value = BigNumber(prevNumber).multipliedBy(BigNumber(nextNumber));
    return this.handleData(value);
  }
  // 除法
  div(prevNumber: number | string, nextNumber: number | string): string {
    const value = BigNumber(prevNumber).dividedBy(BigNumber(nextNumber));
    return this.handleData(value);
  }
  // 取模
  mod(prevNumber: number | string, nextNumber: number | string): string {
    const value = BigNumber(prevNumber).mod(BigNumber(nextNumber));
    return this.handleData(value);
  }
  // 取余
  modulo(prevNumber: number | string, nextNumber: number | string): string {
    const value = BigNumber(prevNumber).modulo(BigNumber(nextNumber));
    return this.handleData(value);
  }
  // 指数运算
  pow(prevNumber: number | string, nextNumber: number | string): string {
    const value = BigNumber(prevNumber).exponentiatedBy(BigNumber(nextNumber));
    return this.handleData(value);
  }
  // 开平方
  sqrt(prevNumber: number | string): string {
    const value = BigNumber(prevNumber).squareRoot();
    return this.handleData(value);
  }
}

function createFixN() {
  return new VfixN();
}

export const fixN = createFixN();
