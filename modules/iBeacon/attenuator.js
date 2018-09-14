
// this should be uuid string -> lastSent Date
const lastSentTimes = {}
let timeout = 0;

const Logger = require("logplease");
const logger = Logger.create("attenuator.js");

export function setTimeoutInSeconds(seconds) {
    logger.info(`Setting timeout to ${seconds} seconds`);
    timeout = seconds;
}

export function filterByUuidTimeout(beacon, callback) {

    if (!timeout || timeout == 0) {
        callback(beacon); // pass through if not set
    } else {
        var now = new Date();
        var lastSent = lastSentTimes[beaon.uuid];

        if (lastSent) {
            var newDate = new Date(lastSent.getTime() + (1000 * timeout));
            if (lastSent + newDate > now) {
                // update last seen time (dont reference lastSentTimes after this line)
                lastSentTimes[beacon.uuid] = now;
                callback(beacon)
            } else {
                // don't do the beacon
            }
        }
    }
}