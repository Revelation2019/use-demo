/* eslint-disable no-unused-vars */
import React from 'react';
import { observer, inject } from 'mobx-react';
import KeyofStore from '../store/KeyofStore';
import { RouteConfigComponentProps } from 'react-router-config';
import qs from 'query-string';

interface IProps extends RouteConfigComponentProps<{}>{
  keyofStore?: KeyofStore;
}

enum Oprate {
  MINUS = 'MINUS',
  PLUS = 'PLUS',
}

const Main = (props: IProps) => {
  const keyofStore = props.keyofStore;

  const oprate = (type: Oprate) => {
    switch (type) {
      case Oprate.MINUS:
        keyofStore?.setValue('count', keyofStore.count - 1);
        break;
      case Oprate.PLUS:
        keyofStore?.setValue('count', keyofStore.count + 1);
        break;
      default:
        break;
    }
  };

  const gotoPage = () => {
    props.history.push({
      pathname: '/match',
      search: qs.stringify({ id: 123123 })
    });
  };

  return (
    <div>
      <button onClick={() => oprate(Oprate.MINUS)}>-</button>
      <span>{keyofStore?.count}</span>
      <button onClick={() => oprate(Oprate.PLUS)}>+</button>
      <button onClick={gotoPage}>goto match page</button>
    </div>
  );
};

export default inject('keyofStore')(observer(Main));
