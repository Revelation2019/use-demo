import { makeAutoObservable, runInAction } from 'mobx';
import { fetchPopup1, fetchPopup2 } from '../api';

import PRIORITY from '../config/priority';
import Stack from './Stack';

class BaseStore {
  constructor () {
    makeAutoObservable(this);
  }

  /** 弹窗优先级-栈 */
  stack: Stack = new Stack(this);

  /** 弹窗1的控制变量 */
  showPopupFlag1 = false;

  /** 弹窗2的控制变量 */
  showPopupFlag2 = false;

  /** 弹窗1 */
  setShowPopupFlag1 = (showPopupFlag1: boolean) => {
    this.showPopupFlag1 = showPopupFlag1;
  }

  /** 弹窗2 */
  setShowPopupFlag2 = (showPopupFlag2: boolean) => {
    this.showPopupFlag2 = showPopupFlag2;
  }

  /** 调接口模拟消息，是否展示弹窗1 */
  fetchPopup1 = async () => {
    try {
      const { code } = await fetchPopup1();
      if (code === 200) {
        runInAction(() => {
          this.stack.intoStack(PRIORITY.popup1);
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  /** 调接口模拟消息，是否展示弹窗2 */
  fetchPopup2 = async () => {
    try {
      const { code } = await fetchPopup2();
      if (code === 200) {
        runInAction(() => {
          this.stack.intoStack(PRIORITY.popup2);
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export default BaseStore;
