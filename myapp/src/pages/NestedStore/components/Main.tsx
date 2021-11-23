import React, { useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import MainStore from '../stores/mainStore';
import Need from './Need';

/** IProps */
interface IProps {
  mainStore?: MainStore;
}

/** Main */
const Main = (props: IProps) => {
  const { mainStore } = props;
  const { fetchNeedList } = mainStore as MainStore;

  useEffect(() => {
    fetchNeedList();
  }, [fetchNeedList]);

  return (
  /** Need */
<Need></Need>
  );
};

export default inject('mainStore')(observer(Main));
