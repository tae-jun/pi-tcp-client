var async = require('async');
var configAll = require('./../config');
var config = configAll.serial;
var isOpen = false;
var SerialPort = require('serialport').SerialPort;
var serialPort;
function open() {
    console.log('=== Serial port connecting...');
    serialPort = new SerialPort(config.port, {
        baudrate: config.baudrate
    });
    serialPort.on('open', function () {
        isOpen = true;
        console.log('+++ Serial port open on "%s"', config.port);
    });
    serialPort.on('error', function (err) {
        isOpen = false;
        console.log('--- Serial port error');
        console.log(err);
        reopen();
    });
    serialPort.on('close', function () {
        isOpen = false;
        console.log('--- Serial port closed');
        reopen();
    });
}
exports.open = open;
function reopen() {
    setTimeout(open, config.reopenPeriod);
}
function write(buff, callback) {
    async.series([
        // Check is serial open
        function (callback) {
            if (isOpen)
                callback();
            else
                callback(new Error('Serial port is closed'));
        },
        // Send message to serial
        function (callback) {
            serialPort.write(buff, function (err) {
                callback(err);
            });
        }
    ], function (err, results) {
        if (err)
            return callback(err);
        callback(null);
    });
}
exports.write = write;
//# sourceMappingURL=main.js.map