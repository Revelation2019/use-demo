import React, { useEffect } from 'react';
import { exportExcel } from '../api';

const Main = () => {
  useEffect(() => {
    exportExcel();
  });
  return <div>
    <form action="/exportExcel" method="post">
      <input type="submit" value="提交"/>
    </form>
  </div>;
};

export default Main;
