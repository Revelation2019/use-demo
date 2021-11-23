import React from 'react';
import { inject, observer } from 'mobx-react';
import MainStore from '../stores/mainStore';
import Quotation from './Quotation';

import styles from './index.module.scss';

/** IProps */
interface IProps {
  mainStore?: MainStore;
}

/** Need */
const Need = (props: IProps) => {
  const { mainStore } = props;
  const { needList } = mainStore as MainStore;
  console.log('needList', needList);

  return (
    <div className={styles.container}>
      {
        needList.map((needItem: any) => (
          <div key={needItem.needId} className={styles.needItem}>
            <div className={styles.needBox}>
                <div className={styles.label}>需求名称：{needItem.needName}</div>
                <div className={styles.label}>数量：{needItem.quality}</div>
                <div className={styles.label}>备注：{needItem.remark}</div>
            </div>
            <div className={styles.quotationBox}>
                <div className={styles.label}>配件名称</div>
                <div className={styles.label}>零件号</div>
                <div className={styles.label}>价格</div>
            </div>
            {/* asdasd */}
            <Quotation quotationList={needItem.quotationList}></Quotation>
          </div>
        ))
      }
    </div>
  );
};

export default inject('mainStore')(observer(Need));
