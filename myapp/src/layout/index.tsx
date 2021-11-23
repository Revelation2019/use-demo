import React from 'react';
import styles from './index.module.scss';
import { renderRoutes, RouteConfigComponentProps } from 'react-router-config';

interface IProps extends RouteConfigComponentProps<void> {

}

/** */
const Layout = (props: IProps) => {
  const { route } = props;
  return (
    <div className={styles.layout}>
      <div className={styles.header}>topbar</div>
      <div className={styles.menu}>slider</div>
      <div className={styles.content}>
        {renderRoutes(route?.routes)}
      </div>
      <div className={styles.footer}>footer</div>
    </div>
  );
};

export default React.memo(Layout);
