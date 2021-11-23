import { makeAutoObservable } from 'mobx';
import BaseStore from './BaseStore';

class Stack {
  topStore: BaseStore;

  constructor (topStore: BaseStore) {
    makeAutoObservable(this);
    this.topStore = topStore;
  }

  item: any = [];

  get size () {
    return this.item.length;
  }

  get isEmpty () {
    return this.item.length === 0;
  }

  get topEle () {
    return this.item[this.item.length - 1];
  }

  intoStack = (targetEle: {level: number, method: string}) => {
    if (this.isEmpty) {
      this.item.push(targetEle);
      (this.topStore[targetEle.method as keyof BaseStore] as (value: boolean) => void)(true);
    } else {
      if (targetEle.level > this.topEle.level) {
        (this.topStore[this.topEle.method as keyof BaseStore] as (value: boolean) => void)(false);
        this.item.pop();
        this.item.push(targetEle);
        (this.topStore[targetEle.method as keyof BaseStore] as (value: boolean) => void)(true);
      }
    }
  }
}

export default Stack;
