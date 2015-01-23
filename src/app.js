/// <reference path="../scripts/_references.ts" />
var net = require('net');
var configAll = require('../src/config');
var config = configAll.pi;

var serial = require('./serial');

// Try to connect recursively until connected. Interval 1sec.
var socket = new net.Socket();

function connect() {
    console.log('Connecting...');
    socket.connect(config.port, config.ip);
}

socket.on('connect', function () {
    console.log('Connected');
});

socket.on('error', function (err) {
    console.log(err);
});

socket.on('close', function () {
    socket.destroy();
    setTimeout(function () {
        console.log('Reconnecting');
        connect();
    }, 1000);
});

socket.on('data', function (data) {
    console.log(data.toJSON());

    //socket.write(new Buffer([1]));
    serial.write(data, function (err) {
        if (err)
            socket.write(new Buffer([1]));
        else
            socket.write(new Buffer([0]));
    });
});

connect();
//# sourceMappingURL=app.js.map
