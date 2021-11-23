/* eslint-disable no-restricted-globals */
const childThread = () => {
  const webWorker: Worker = self as any; // self代表子线程自身，即子线程的全局对象
  webWorker.addEventListener('message', event => {
    console.log(event.data.msg);
    // 部署message事件接收主进程的信息
    webWorker.postMessage({
      msg: '消息已收到，好久不见！' // 使用 postMessage 方法向主进程传输信息
    });
  });
};

export default childThread;
