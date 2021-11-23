import { makeAutoObservable } from 'mobx';

class KeyofStore {
  constructor () {
    makeAutoObservable(this);
  }

  count = 0;

  setValue = (key: keyof KeyofStore, value: any) => {
    this[key] = value;
  }
}

export default KeyofStore;
