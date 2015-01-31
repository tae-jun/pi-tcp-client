/// <reference path="../scripts/_references.d.ts" />
var config = require('./config');
var argv = process.argv, serialport;
for (var i = 0; i < argv.length; i++) {
    var arg = argv[i];
    switch (arg) {
        case '--serial':
            i++;
            serialport = argv[i];
            break;
    }
}
config.serial.port = serialport || config.serial.port;
console.log('### APP STARTED WITH NEXT OPTIONS');
console.log('serial port: %s \n', config.serial.port);
//# sourceMappingURL=argv.js.map