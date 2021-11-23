import axios from 'axios';

/** fetchNeedList */
export const fetchNeedList = () => {
  return axios.get('/mock/16430/neste').then(res => res.data);
};
