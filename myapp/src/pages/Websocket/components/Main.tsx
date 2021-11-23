import React, { useEffect, useState } from 'react';

const Main = () => {
  const [msg, setMsg] = useState(0);

  const connect = () => {
    const ws = new WebSocket('ws://localhost:8888/ws');
    let timer: NodeJS.Timeout | null = null;
    ws.onmessage = (e) => {
      setMsg(e.data);
      console.log(e.data);
    };
    ws.onopen = () => {
      timer = setInterval(() => {
        ws.send('ping');
      }, 2000);
    };
    ws.onclose = () => {
      if (timer) clearInterval(timer);
    };
    return () => {
      if (timer) clearInterval(timer);
    };
  };

  useEffect(connect, []);

  return <div>{msg}</div>;
};

export default Main;
