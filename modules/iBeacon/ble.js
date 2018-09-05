// import bleacon
var Bleacon = require('bleacon');
console.log("ble.js loaded");
// var connectCallback = function (err) {
//   if (err) {
//     console.error('Could not connect: ' + err);
//   } else {
//     console.log('Client connected');
//     Bleacon.startScanning(); // scan for any bleacons
//     console.log('Started Scanning');
//   };
// };

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


exports.onDiscover = function (callback) {
    Bleacon.on('discover', callback );
}; 


exports.startScanning = function() {
    Bleacon.startScanning();
};

exports.stopScanning = function () {
    Bleacon.stopScanning();
};