/// <reference path="../../scripts/_references.d.ts" />
var net = require('net');
var configAll = require('../config');
var config = configAll.tcp;
// Try to open recursively until connected. Interval 1sec.
var socket;
var isConnected = false;
function connect() {
    console.log('=== Tcp socket connecting...');
    socket = new net.Socket();
    socket.connect(config.port, config.ip);
    socket.on('connect', function () {
        isConnected = true;
        console.log('+++ Tcp connected');
        if (typeof onConnectListener == 'function')
            onConnectListener();
    });
    socket.on('error', function (err) {
        console.log('--- Tcp socket error');
        console.log(err);
    });
    socket.on('close', function () {
        isConnected = false;
        console.log('--- Tcp socket closed');
        socket.destroy();
        delete socket;
        setTimeout(function () {
            console.log('=== Reconnecting...');
            connect();
        }, 500);
    });
    socket.on('data', function (data) {
        console.log(data.toJSON());
        if (typeof onDataListener == 'function')
            onDataListener(data);
    });
}
exports.connect = connect;
var onDataListener;
function onData(listener) {
    onDataListener = listener;
}
exports.onData = onData;
var onConnectListener;
function onConnect(listener) {
    onConnectListener = listener;
}
exports.onConnect = onConnect;
function write(buff) {
    if (!isConnected)
        return console.log('--- Cannot write on tcp socket: Socket is closed');
    socket.write(buff);
}
exports.write = write;
//# sourceMappingURL=main.js.map