import { Provider } from 'mobx-react';
import React from 'react';
import { RouteConfigComponentProps } from 'react-router-config';
import Main from './components/Main';
import stores from './store';

import 'antd/dist/antd.css';

interface IProps extends RouteConfigComponentProps<any> {

}

/** WebWorker */
const WebWorker = (props: IProps) => {
  return (
    <Provider {...stores}>
      <Main {...props}></Main>
    </Provider>
  );
};

export default WebWorker;
