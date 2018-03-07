require('dotenv').config()

var connectionString = process.env.IOT_HUB_CS;
// use factory function from AMQP-specific package
var clientFromConnectionString = require('azure-iot-device-amqp').clientFromConnectionString;

// AMQP-specific factory function returns Client object from core package
var client = clientFromConnectionString(connectionString);

// use Message object from core package
var Message = require('azure-iot-device').Message;

// import bleacon
var Bleacon = require('bleacon');

var connectCallback = function (err) {
  if (err) {
    console.error('Could not connect: ' + err);
  } else {
    console.log('Client connected');
    Bleacon.startScanning(); // scan for any bleacons
    console.log('Started Scanning');
  };
};

Bleacon.on('discover', function(bleacon) {
    console.log('found a beacon');
    var data = `iBeacon, UUID: ${bleacon.uuid}, major: ${bleacon.major}, minor ${bleacon.minor}`;
    var msg = new Message(data);
    client.sendEvent(msg, function (err) {
      if (err) {
        console.log(err.toString());
      } else {
        console.log('Message sent');
        console.log(data);
      };
    });
});


client.open(connectCallback);