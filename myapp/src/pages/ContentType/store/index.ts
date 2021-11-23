import { fetchData } from '../api';

export class Store {
  fetchData = async () => {
    try {
      const res = await fetchData();
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }
}

export default {
  store: new Store()
};
