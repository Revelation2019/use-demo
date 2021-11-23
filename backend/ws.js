const http = require('http');

const PORT = 8888;

const server = http.createServer((req, res) => {
  const body = http.STATUS_CODES[426];

  res.write(426, {
    'Content-Length': body.length,
    'Content-Type': 'text/plain'
  });

  res.end();
});

const checkHeader = (req, socket, key, version) => {
  if (req.method.toLowerCase() !== 'get' ||
    req.headers.upgrade.toLowerCase() !== 'websocket' ||
    !key || version !== '13' || req.url !== '/ws') 
  {
    let message = http.STATUS_CODES[400];
    let headers = {
      Connection: 'close',
      'Content-Type': 'text/html',
      'Content-Length': Buffer.byteLength(message),
    };

    socket.write(
      `HTTP/1.1 400 ${message}\r\n` + 
      Object.keys(headers).map(h => `${h}: ${headers[h]}`).join('\r\n') + 
      '\r\n\r\n' + 
      message
    );

    socket.destroy();

    return true;
  }
  return false;
}

const decodeWsFrame = (data) => {
  let start = 0;
  let frame = {
    isFinal: (data[start] & 0x80) === 0x80,
    opcode: data[start++] & 0xF,
    masked: (data[start] & 0x80) === 0x80,
    payloadLen: data[start++] & 0x7F,
    maskingKey: '',
    payloadData: null
  };

  if (frame.payloadLen === 126) {
    frame.payloadLen = (data[start++] << 8) + data[start++];
  } else if (frame.payloadLen === 127) {
    frame.payloadLen = 0;
    for (let i = 7; i >= 0; --i) {
      frame.payloadLen += (data[start++] << (i * 8));
    }
  }

  if (frame.payloadLen) {
    if (frame.masked) {
      const maskingKey = [
        data[start++],
        data[start++],
        data[start++],
        data[start++]
      ];

      frame.maskingKey = maskingKey;

      frame.payloadData = data
        .slice(start, start + frame.payloadLen)
        .map((byte, idx) => byte ^ maskingKey[idx % 4]);
    } else {
      frame.payloadData = data.slice(start, start + frame.payloadLen);
    }
  }

  return frame;
}


const encodeWsFrame = (data) => {
  const isFinal = data.isFinal !== undefined ? data.isFinal : true,
  opcode = data.opcode !== undefined ? data.opcode : 1,
  payloadData = data.payloadData ? Buffer.from(data.payloadData) : null,
  payloadLen = payloadData ? payloadData.length : 0;

  let frame = [];

  if (isFinal) frame.push((1 << 7) + opcode);
  else frame.push(opcode);

  if (payloadLen < 126) {
    frame.push(payloadLen);
  } else if (payloadLen < 65536) {
    frame.push(126, payloadLen >> 8, payloadLen & 0xFF);
  } else {
    frame.push(127);
    for (let i = 7; i >= 0; --i) {
      frame.push((payloadLen & (0xFF << (i * 8))) >> (i * 8));
    }
  }

  frame = payloadData ? Buffer.concat([Buffer.from(frame), payloadData]) : Buffer.from(frame);

  return frame;
}

const completeUpgrade = (req, socket, key, head) => {
  const UUID = '258EAFA5-E914-47DA-95CA-C5AB0DC85B11';
  const digest = require('crypto').createHash('sha1').update(key + UUID).digest('base64');

  const headers = [
    'HTTP/1.1 101 Switching Protocols',
    'Upgrade: websocket',
    'Connection: Upgrade',
    `Sec-WebSocket-Accept: ${digest}`
  ];

  socket.write(headers.concat('\r\n').join('\r\n'));

  socket.on('data', (buffer) => {
    const data = decodeWsFrame(buffer);
    console.log(data.payloadData && data.payloadData.toString())
    // opcode为8，表示客户端发起了断开连接
    if (data.opcode === 8) {
      // socket.destroy();
      socket.end('')  // 与客户端断开连接
    } else {
      socket.write(encodeWsFrame({ payloadData: 'pong' }))
    }
  })
}

const handleUpgrade = (req, socket, head) => {
  const key = req.headers['sec-websocket-key'] ? req.headers['sec-websocket-key'].trim() : false;
  const version = req.headers['sec-websocket-version'];

  if (checkHeader(req, socket, key, version)) {
    return;
  }

  completeUpgrade(req, socket, key, head);
}

server.on('upgrade', (req, socket, head) => {
  handleUpgrade(req, socket, head);
})

server.listen(PORT, () => {
  console.info('listening on websocket~~');
})