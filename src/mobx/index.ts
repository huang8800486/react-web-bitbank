import { createContext, useContext } from 'react';
import { CounterStrong } from './counter.Store';
import { ListStore } from './list.Store';

// 声明一个rootStore

class RootStore {
  public counterStrong;
  public listStore;
  constructor() {
    // 对子模块进行实例化
    this.counterStrong = new CounterStrong();
    this.listStore = new ListStore();
  }
}

// 实例化,
const rootStore = new RootStore();
// 使用react context机制完成统一封装
const context = createContext(rootStore);
const useStore = () => useContext(context);

export { useStore };
