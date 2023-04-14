import { makeAutoObservable } from 'mobx';
class ListStore {
  list = ['react', 'vue'];
  constructor() {
    makeAutoObservable(this);
  }
  addList = () => {
    this.list = [...this.list, 'angular'];
  };
}

export { ListStore };
