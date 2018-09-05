'use strict';

var Transport = require('azure-iot-device-mqtt').Mqtt;
var Client = require('azure-iot-device').ModuleClient;
var Message = require('azure-iot-device').Message;

const ble = require("./ble");

console.log("Starting BLE Module");

Client.fromEnvironment(Transport, function (err, client) {
  if (err) {
    console.log("Error getting client");
    console.log(err);
    throw err;
  } else {
    client.on('error', function (err) {
      throw err;
    });
    console.log("Connected to edge instance");
    // connect to the Edge instance
    client.open(function (err) {
      if (err) {
        throw err;
      } else {
        console.log('IoT Hub module client initialized');

        // Act on input messages to the module.
        client.on('inputMessage', function (inputName, msg) {
          pipeMessage(client, inputName, msg);
        });

        ble.onDiscover((b) => {
          console.log(`Discovered iBeacon, UUID: ${b.uuid}, major: ${b.major}, minor ${b.minor}`);
          client.sendOutputEvent("ibeacon", new Message(JSON.stringify(b)), printResultFor("sending ibeacon"));

        });
        ble.startScanning();
        console.log("Started Scanning");
      }
    });
  }
});

// This function just pipes the messages without any change.
function pipeMessage(client, inputName, msg) {
  client.complete(msg, printResultFor('Receiving message'));

  if (inputName === 'input1') {
    var message = msg.getBytes().toString('utf8');
    if (message) {
      var outputMsg = new Message(message);
      client.sendOutputEvent('output1', outputMsg, printResultFor('Sending received message'));
    }
  }
}

// Helper function to print results in the console
function printResultFor(op) {
  return function printResult(err, res) {
    if (err) {
      console.log(op + ' error: ' + err.toString());
    }
    if (res) {
      console.log(op + ' status: ' + res.constructor.name);
    }
  };
}
