import { exit } from 'process';
import WebSocket from 'ws';

const webSocketAddress = 'ws://localhost:8080'
const webSocket = new WebSocket(webSocketAddress)

webSocket.on('open', () => {
  console.log(`Connecting to ${webSocketAddress}`)
  console.log('Send pong...')
  webSocket.pong()
})

webSocket.on('ping', () => {
  console.log('Get ping')
  exit(0)
})
