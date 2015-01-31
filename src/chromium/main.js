/// <reference path="../../scripts/_references.d.ts" />
var childProc = require('child_process');
function run() {
    childProc.exec('chromium --kiosk --incognito --display=:0 http://ktj7147.iptime.org', function (err, stdout, stderr) {
        if (err)
            return console.log(err);
    });
}
exports.run = run;
//# sourceMappingURL=main.js.map