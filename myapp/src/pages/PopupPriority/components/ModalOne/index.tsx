import React from 'react';
import { Modal } from 'antd';
import BaseStore from '../../store/BaseStore';
import { inject, observer } from 'mobx-react';

interface IProps {
  baseStore?: BaseStore;
}

const ModalOne = (props: IProps) => {
  const { baseStore } = props;

  const { showPopupFlag1, setShowPopupFlag1 } = baseStore as BaseStore;
  console.log('showPopupFlag1', showPopupFlag1);

  return (
    <Modal
      title="Basic Modal"
      visible={showPopupFlag1}
      onOk={() => setShowPopupFlag1(false)}
      onCancel={() => setShowPopupFlag1(false)}
    >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Modal>
  );
};

export default inject('baseStore')(observer(ModalOne));
