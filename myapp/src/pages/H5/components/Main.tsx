/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import React from 'react';
import { RouteConfigComponentProps } from 'react-router-config';
import RootStore from '../store/RootStore';
import styles from './index.module.scss';

interface IProps extends RouteConfigComponentProps<{}>{
  rootStore?: RootStore;
}

const Main = (props: IProps) => {
  const Item = () => (
    <div className={styles.itemBox}>
      <div className={styles.leftBox}>
        <p className={styles.leftWrap}>
          <p className={styles.price}><span className={styles.sign}>￥</span>100</p>
          <p className={styles.condition}>满200使用</p>
        </p>
      </div>
      <div className={styles.rightBox}>
        <div className={styles.firstLine}>
          <span className={styles.label}>开思券</span>
          <span className={styles.partName}>刹车片007</span>
        </div>
        <p className={styles.secondLine}>有效期至: 2021.06.04-202备份 2</p>
        <p className={styles.thirdLine}>挂帐、白条、现付、常规询价单、事…</p>
        <p className={styles.line}></p>
        <div className={styles.footer}>
          <span className={styles.detail}>查看详情</span>
          <span className={styles.dropdown}></span>
        </div>
      </div>
    </div>
  );

  return (
    <div className={styles.container}>
      {
        Array.from({ length: 10 }).fill(0).map(() => <Item></Item>)
      }
    </div>
  );
};

export default Main;
