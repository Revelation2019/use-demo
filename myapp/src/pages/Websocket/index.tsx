import { Provider } from 'mobx-react';
import React from 'react';
import { RouteConfigComponentProps } from 'react-router-config';
import Main from './components/Main';

interface IProps extends RouteConfigComponentProps<any> {

}

const Websocket = (props: IProps) => {
  return (
    <Provider>
      <Main></Main>
    </Provider>
  );
};

export default Websocket;
