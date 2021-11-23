import React from 'react';
import Main from './component/Main';
import { Provider } from 'mobx-react';
import stores from './store';

const ContentType = (props: any) => {
  return <Provider {...stores}><Main {...props}/></Provider>;
};

export default ContentType;
