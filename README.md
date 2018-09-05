# BLE iBeacon - IoT Edge Module

This is an IoT Edge module for [Azure IoT Edge](https://github.com/Azure/iotedge), Linux ARM32v7, tested on Raspberry Pi 3.

## Docker Image

You can find the docker image [here](https://hub.docker.com/r/flanagan89/iotedgemodule-ibeacon/).

## Deploying

Include this module in your deployment.template.json file:

```js

"modules": {
          "iBeacon": {
            "version": "1.0",
            "type": "docker",
            "status": "running",
            "restartPolicy": "always",
            "settings": {
              "image": "flanagan89/iotedgemodule-ibeacon:0.0.2-arm32v7",
              "createOptions": "{\"NetworkingConfig\":{\"EndpointsConfig\": {\"host\": {}}},\"HostConfig\": {\"NetworkMode\": \"host\"}}"
            }
          }
        }

```

> Important: You must set the create options with HostConfig.NetworkMode = "host" (as above)

## How it works

This module uses the [Bleacon](https://github.com/sandeepmistry/node-bleacon) package