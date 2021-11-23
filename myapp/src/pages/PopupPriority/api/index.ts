import axios from 'axios';

export const fetchPopup1 = () => {
  return axios.get('/mock/16430/getPopup1').then(res => res.data);
};

export const fetchPopup2 = () => {
  return axios.get('/mock/16430/getPopup2').then(res => res.data);
};
