import { makeAutoObservable } from 'mobx';
import { fetchNeedList } from '../api';

class MainStore {
  constructor () {
    makeAutoObservable(this);
  }

  needList = [];

  /** asdasd */
  asdasd () {}

/** asdasd */
asdasdsads = () => {}

/** fetchNeedList */
fetchNeedList = async () => {
  try {
    const { code, data } = await fetchNeedList();
    if (code === 200 && !!data) {
      this.needList = data;
    }
  } catch (error) {
    console.log(error);
  }
}
}

export default MainStore;
