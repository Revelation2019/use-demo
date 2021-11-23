import React from 'react';
import Main from './components/Main';
import { Provider } from 'mobx-react';
import stores from './stores';

/** NestedStore */
const NestedStore = (props: any) => {
  return <Provider {...stores}><Main {...props}/></Provider>;
};

export default NestedStore;
