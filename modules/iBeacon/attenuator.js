
// this should be uuid string -> lastSeen Date
const lastSeenTimes = {}
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
        var lastSeen = lastSeenTimes[beaon.uuid];

        // update last seen time (dont reference lastSeenTimes after this line)
        lastSeenTimes[beacon.uuid] = now;

        if (lastSeen) {
            var newDate = new Date(lastSeen.getTime() + (1000 * timeout));
            if (lastSeen + newDate > now) {
                callback(beacon)
            } else {
                // don't do the beacon
            }
        }
    }
}