import React, { useEffect } from 'react';
import { Button } from 'antd';
import childThread from './childThread';
import WebWorker from './Worker';

// 放在组件外面只会执行一次，组件重新渲染时也不会执行
const worker = new WebWorker(childThread) as Worker;

const WorkerBlob = () => {
  // 监听子线程消息
  useEffect(() => {
    worker.onmessage = (event: any) => {
      // 主线程收到子线程的消息
      console.log(event.data.msg);
    };
    return () => {
      // 组件卸载时终止掉子线程
      worker.terminate();
    };
  }, []);

  const sendMsg = () => {
    // 主线程向子线程发送消息
    worker.postMessage({ msg: '你好子线程！，收到请回答。' });
  };

  return (
    <div>
      <Button onClick={sendMsg}>向子线程发送消息</Button>
    </div>
  );
};

export default WorkerBlob;
