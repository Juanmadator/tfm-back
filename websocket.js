const WebSocket = require('ws');

let wss;

function initializeWebSocket(server) {
    wss = new WebSocket.Server({ server, clientTracking: true });
    wss.on('connection', (ws) => {
        console.log('Un cliente se ha conectado');
        ws.on('message', (message) => {
            console.log('Mensaje recibido del cliente:', message);
        });
        ws.on('close', () => {
            console.log('Un cliente se ha desconectado');
        });
    });
}

function getWebSocketServer() {
    return wss;
}

module.exports = { initializeWebSocket, getWebSocketServer };