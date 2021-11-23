import { inject, observer } from 'mobx-react';
import React, { useEffect } from 'react';

import BaseStore from '../store/BaseStore';
import ModalOne from './ModalOne';
import ModalTwo from './ModalTwo';

interface IProps {
  baseStore?: BaseStore;
}

const Main = (props: IProps) => {
  const { baseStore } = props;

  const { fetchPopup1, fetchPopup2 } = baseStore as BaseStore;

  useEffect(() => {
    fetchPopup1();
    fetchPopup2();
  }, [fetchPopup1, fetchPopup2]);

  return (
    <div>
      <span>123123123</span>
      <ModalOne></ModalOne>
      <ModalTwo></ModalTwo>
    </div>
  );
};

export default inject('baseStore')(observer(Main));
