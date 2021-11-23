import React from 'react';
import WebWorker from 'react-webworker';
import childThread from './childThread';

const Plugin = () => {
  const url = URL.createObjectURL(new Blob(['(' + childThread.toString() + ')()']));
  return (
    // 这里url不能直接使用路径./xxx.ts，webpack构建后会找不到
    // 控制台会报：Uncaught SyntaxError: Unexpected token '<'
    <WebWorker url={url}>
      <WebWorker.Pending>
        {({ postMessage }: any) => <button onClick={() => postMessage('你好子线程！，收到请回答。')}>向子线程发送消息</button>}
      </WebWorker.Pending>
      <WebWorker.Data>
        {(data: any) => (
          <div>
            <strong>Received some data:</strong>
            <pre>{JSON.stringify(data, null, 2)}</pre>
          </div>
        )}
      </WebWorker.Data>
      <WebWorker.Error>{(error: any) => `Something went wrong: ${error}`}</WebWorker.Error>
    </WebWorker>
  );
};

export default Plugin;
