/* eslint-disable import/no-anonymous-default-export */
import { makeAutoObservable } from 'mobx';

class Store {
  constructor () {
    makeAutoObservable(this);
  }

  count = 0;

  setCount = (count: number) => {
    this.count = count;
  }
}

export default Store;
