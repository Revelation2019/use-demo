import axios from 'axios';

/** fetchData */
export const fetchData = () => {
  const formData = new FormData();
  formData.append('id', 'xxxx');
  formData.append('name', '姓名');
  return axios.post('/mock/16430/test/getData', formData, {
    headers: {
      // 'Content-Type': 'application/x-www-form-urlencoded'
      'Content-Type': 'multipart/form-data'
    }
  }).then(res => res);
};
