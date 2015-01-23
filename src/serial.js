var config = require('./config');

var SerialPort = require("serialport").SerialPort;
var serialPort = new SerialPort(config.pi.serialPort, {
    baudrate: 9600
});

var isOpen = false;

serialPort.on("open", function () {
    isOpen = true;
    console.log('+++ Serial port open on "%s"', config.pi.serialPort);
});

serialPort.on("close", function () {
    isOpen = false;
    console.log('--- Serial port closed');

    function connect() {
        console.log('=== Connecting...');

        serialPort = new SerialPort(config.pi.serialPort, {
            baudrate: 9600
        });
    }

    while (!isOpen)
        setTimeout(connect, 1000);
});

function write(buff, callback) {
    async.series([
        function (callback) {
            if (isOpen)
                callback();
            else
                callback(new Error('Serial port is closed'));
        },
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
//# sourceMappingURL=serial.js.map
