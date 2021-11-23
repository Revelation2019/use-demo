import React from 'react';
import Main from './components/Main';
import { Provider } from 'mobx-react';
import stores from './store';

const Keyof = (props: any) => {
  return <Provider {...stores}><Main {...props}/></Provider>;
};

export default Keyof;
