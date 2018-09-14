var Bleacon = require('bleacon');
const Logger = require("logplease");

const logger = Logger.create("ble.js");

exports.onDiscover = function (callback) {
    Bleacon.on('discover', callback );
}; 


exports.startScanning = function() {
    Bleacon.startScanning();
    logger.info("Started Scanning");
};

exports.stopScanning = function () {
    Bleacon.stopScanning();
    logger.info("Stopped Scanning");
};


// Bleacon.on('discover', function(b) {
//     console.log('found a beacon');
//     var data = `iBeacon, UUID: ${b.uuid}, major: ${b.major}, minor ${b.minor}`;
//     var msg = new Message(data);
//     client.sendEvent(msg, function (err) {
//       if (err) {
//         console.log(err.toString());
//       } else {
//         console.log('Message sent');
//         console.log(data);
//       };
//     });
// });