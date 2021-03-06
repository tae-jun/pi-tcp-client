/// <reference path="../scripts/_references.d.ts" />
var config;
(function (config) {
    config.tcp = {
        ip: 'ktj7147.iptime.org',
        port: 9090
    };
    config.serial = {
        port: '/dev/ttyUSB0',
        baudrate: 9600,
        reopenPeriod: 1000
    };
})(config || (config = {}));
module.exports = config;
//# sourceMappingURL=config.js.map