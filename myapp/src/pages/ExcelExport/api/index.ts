// Copyright 2015
// My company
import axios from 'axios';

export const exportExcel = () => {
  return axios.post('/exportExcel', {}).then(res => res);
};
