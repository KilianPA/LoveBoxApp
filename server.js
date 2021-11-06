var WebSocket = require('ws');
var servo = require('./servo')
const ws = new WebSocket('wss://websocket-love.herokuapp.com/');

ws.on('message', function incoming(message) {
    console.log('received: %s', message);
    servo.runAnimation()
});
