/// <reference path="../scripts/_references.d.ts" />
// Parse command line arguments
require('./argv');
var tcp = require('./tcp/main');
var serial = require('./serial/main');
var chromium = require('./chromium/main');
tcp.connect();
tcp.onData(function (data) { return serial.write(data, function (err) {
    if (err)
        tcp.write(new Buffer([1]));
    else
        tcp.write(new Buffer([0]));
}); });
tcp.onConnect(function () {
    chromium.run();
});
serial.open();
//# sourceMappingURL=app.js.map