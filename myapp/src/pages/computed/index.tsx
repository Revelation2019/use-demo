import { Provider } from 'mobx-react';
import React from 'react';
import { RouteConfigComponentProps } from 'react-router-config';
import Main from './components/Main';
import stores from './store';

interface IProps extends RouteConfigComponentProps<void> {

}

const Computed = (props: IProps) => {
  return <Provider {...stores}><Main {...props}></Main></Provider>;
};

export default Computed;
