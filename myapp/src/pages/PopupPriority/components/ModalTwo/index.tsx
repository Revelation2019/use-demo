import React from 'react';
import { Modal } from 'antd';
import BaseStore from '../../store/BaseStore';
import { inject, observer } from 'mobx-react';

interface IProps {
  baseStore?: BaseStore;
}

const ModalTwo = (props: IProps) => {
  const { baseStore } = props;

  const { showPopupFlag2, setShowPopupFlag2 } = baseStore as BaseStore;
  console.log('showPopupFlag2', showPopupFlag2);

  return (
    <Modal
      title="Basic Modal"
      visible={showPopupFlag2}
      onOk={() => setShowPopupFlag2(false)}
      onCancel={() => setShowPopupFlag2(false)}
    >
      <p>Bla bla ...</p>
      <p>Bla bla ...</p>
      <p>Bla bla ...</p>
    </Modal>
  );
};

export default inject('baseStore')(observer(ModalTwo));
