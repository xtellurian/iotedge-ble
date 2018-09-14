'use strict';

var Transport = require('azure-iot-device-mqtt').Mqtt;
var Client = require('azure-iot-device').ModuleClient;
var Message = require('azure-iot-device').Message;
const Logger = require("logplease");
const attenuator = require("./attenuator");
const ble = require("./ble");

const logger = Logger.create("app.js");

// logger.debug(`This is a debug message`);
// logger.log(`This is a log message`); // alias for debug()
// logger.info(`This is a info message`);
// logger.warn(`This is a warning`);
// logger.error(`This is an error`);

// set environment variable to set log level, e.g. LOG=debug

// DEBUG
// INFO
// WARN
// ERROR
// NONE

const timeout = parseInt(process.env.ATTENUATION_TIME);
attenuator.setTimeoutInSeconds(timeout);

var beaconCount = 0;
var sentBeaconCount = 0;

function logBeaconCount() {
  logger.info(`Beacon Count for last 10 seconds was ${beaconCount}`);
  logger.info(`Sent ${sentBeaconCount} Beacons in last 10 seconds`);
  beaconCount = 0;
  sentBeaconCount = 0;
}

setInterval(logBeaconCount, 1000 * 10);


logger.info("Starting BLE Module");

Client.fromEnvironment(Transport, function (err, client) {
  if (err) {
    logger.error("Error getting client", err)
    throw err;
  } else {
    client.on('error', function (err) {
      throw err;
    });
    logger.info("Got a Client");
    // connect to the Edge instance
    client.open(function (err) {
      if (err) {
        throw err;
      } else {
        logger.info("Client Opened");

        // Act on input messages to the module.
        client.on('inputMessage', function (inputName, msg) {
          pipeMessage(client, inputName, msg);
        });

        ble.onDiscover((ble) => {
          beaconCount++;
          attenuator.filterByUuidTimeout(ble, (filteredBle) => {
            filteredBle.timestamp = new Date();
            filteredBle.type = "beacon";
            logger.debug(`Discovered iBeacon, ${JSON.stringify(filteredBle)}`);
            client.sendOutputEvent("ibeacon", new Message(JSON.stringify(filteredBle)), printResultFor("sending ibeacon"));
            sentBeaconCount++;
          });
        });

        client.getTwin(function (err, twin) {
          if (err) {
            logger.error('Error getting twin', err.message);
          } else {
            twin.on('properties.desired', function (delta) {
              logger.info("Desired properties changed");
            });
          }
        });

        ble.startScanning();
        logger.info("Started Scanning");
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
      logger.error(op + ' error: ' + err.toString());
    }
    if (res) {
      logger.debug(op + ' status: ' + res.constructor.name);
    }
  };
}
