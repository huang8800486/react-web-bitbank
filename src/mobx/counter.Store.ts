import { makeAutoObservable } from 'mobx';

class CounterStrong {
  count = 0;
  constructor() {
    makeAutoObservable(this);
  }
  addCounter = () => {
    this.count++;
  };
}
export { CounterStrong };
