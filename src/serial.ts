import config = require('./config');

var SerialPort = require("serialport").SerialPort;
var serialPort = new SerialPort(config.pi.serialPort, {
    baudrate: 9600
});

var isOpen:boolean = false;

serialPort.on("open", () => {
    isOpen = true;
    console.log('+++ Serial port open on "%s"', config.pi.serialPort);
});

serialPort.on("close", () => {
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

export function write(buff:Buffer, callback:(err:Error)=>void) {
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
                serialPort.write(buff, (err)=> {
                    callback(err);
                })
            }
        ],
        (err, results)=> {
            if (err)return callback(err);
            callback(null);
        }
    );
}
