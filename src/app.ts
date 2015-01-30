/// <reference path="../scripts/_references.d.ts" />

import configAll = require('../src/config');
import config = configAll.pi;

import tcp = require('./tcp/main');
import serial = require('./serial/main');

tcp.connect();
tcp.onData((data)=>serial.write(data, (err)=> {
        if (err)
            tcp.write(new Buffer([1]));
        else
            tcp.write(new Buffer([0]));
    })
);

serial.open();