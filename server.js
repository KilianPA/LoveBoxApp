var WebSocket = require('ws');
var servo = require('./servo')
const address = 'wss://websocket-love.herokuapp.com/';
const client = 'k'
var timeout = 10; // seconds

connect(address);

function connect(address) {
    let ws = new WebSocket(address);
    let timerTimeout = setTimeout(() => ws.terminate(), timeout * 1000); // force close unless cleared on 'open'
    ws.on('open', () => {
        console.log('Opened. Clearing timeout ...');
        clearTimeout(timerTimeout);
        // do your thing here, like ws.send(...);
    });
    ws.on('message', function incoming(message) {
        console.log('received: %s', message);
        let sender = (message.toString().split(';')[1])
        if (sender !== client) {
            servo.runAnimation()
        }
    });
    ws.on('close', () => {
        clearTimeout(timerTimeout);
        console.error('Websocket connection closed. Reconnecting in %f seconds ...', timeout);
        setTimeout(() => connect(address), timeout * 1000);
    });
    ws.on('error', reason => console.error('Websocket error: ' + reason.toString()));
    return ws;
}

function getQueryParams(qs) {
    qs = qs.split('+').join(' ');

    var params = {},
        tokens,
        re = /[?&]?([^=]+)=([^&]*)/g;

    while (tokens = re.exec(qs)) {
        params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]);
    }

    return params;
}
