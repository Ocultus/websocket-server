import http from 'http';
import crypto from 'crypto';
import { HANDSHAKE_GUID, PING_MESSAGE, PONG_MESSAGE, SERVER_PORT } from './constants.js';

const createHandshakeKey = (clientKey: string): string => {
  return crypto.createHash('sha1').
    update(clientKey+HANDSHAKE_GUID).
    digest('base64');
}

const server = http.createServer()

server.on('upgrade', (req, socket) => {
  const clientWebsocketKey = req.headers['sec-websocket-key'];
  const handshakeKey = createHandshakeKey(clientWebsocketKey);
  const headersForWebSocket = [
    'HTTP/1.1 101',
    'upgrade: websocket',
    'connection: upgrade',
    `sec-webSocket-accept: ${handshakeKey}`,
    '\r\n',
  ].join('\r\n');

  socket.on('data', (data: Buffer) => {
  if(data[0].valueOf() === PONG_MESSAGE)
      socket.write(PING_MESSAGE)
  })

  socket.write(headersForWebSocket)
})


server.listen(SERVER_PORT, () => console.log(`listening on ${SERVER_PORT}`));

