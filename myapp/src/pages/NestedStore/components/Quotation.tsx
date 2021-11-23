import React, { useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import MainStore from '../stores/mainStore';
import { Input } from 'antd';
import styles from './index.module.scss';
import classNames from 'classnames';

/** IProps */
interface IProps {
  quotationList: any[];// quotationList
  mainStore?: MainStore;
}

/** Quotation */
const Quotation = (props: IProps) => {
  const { mainStore, quotationList } = props;
  const { fetchNeedList } = mainStore as MainStore;

  useEffect(() => {
    fetchNeedList();
  }, [fetchNeedList]);

  return (
    <div>
      {
        quotationList.map((quotation: any) => (
          <div key={quotation.quotationId}>
            <div className={classNames(styles.label, styles.pad)}>
              <Input type="text" size="small" value={quotation.partName} placeholder="请输入配件名称"></Input>
            </div>
            <div className={classNames(styles.label, styles.pad)}>
              <Input type="text" size="small" value={quotation.partNum} placeholder="请输入零件号"></Input>
            </div>
            <div className={classNames(styles.label, styles.pad)}>
              <Input type="text" size="small" value={quotation.price} placeholder="请输入价格"></Input>
            </div>
          </div>
        ))
      }
    </div>
  );
};

export default inject('mainStore')(observer(Quotation));
