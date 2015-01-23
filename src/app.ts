/// <reference path="../scripts/_references.ts" />

import net = require('net');
import configAll = require('../src/config');
import config = configAll.pi;

import serial = require('./serial');

// Try to connect recursively until connected. Interval 1sec.

var socket = new net.Socket();

function connect() {
    console.log('Connecting...');
    socket.connect(config.port, config.ip);
}

socket.on('connect', ()=> {
    console.log('Connected');
});

socket.on('error', (err)=> {
    console.log(err);
});

socket.on('close', ()=> {
    socket.destroy();
    setTimeout(()=> {
        console.log('Reconnecting');
        connect();
    }, 1000);
});

socket.on('data', (data:Buffer)=> {
    console.log(data.toJSON());
    //socket.write(new Buffer([1]));
    serial.write(data, (err)=> {
        if (err)
            socket.write(new Buffer([1]));
        else
            socket.write(new Buffer([0]));
    });
});

connect();