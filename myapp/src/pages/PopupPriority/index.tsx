import React from 'react';
import Main from './components/Main';
import { Provider } from 'mobx-react';

import stores from './store';

import 'antd/dist/antd.css';

const PopupPriority = (props: any) => {
  return <Provider {...stores}><Main {...props}/></Provider>;
};

export default PopupPriority;
