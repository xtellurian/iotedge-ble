# A Module for Collecting iBeacon advertisements using a Pi3 & Azure IoT Edge 
 
 ## How to use
 
 ### On your dev machine
 
 * Clone this repo
 * `docker build --rm -f Dockerfile -t iotedge-ble:latest .`
 *  `docker tag iotedge-ble <acr-name>.azurecr.io/ramp/iotedge-ble`
 * `az acr login --name <acr-name>`
 * `docker push <acr-name>.azurecr.io/ramp/iotedge-ble`
 
 ### Azure Portal
 
 * Deploy <acr-name>.azurecr.io/ramp/iotedge-ble to your IoT Edge device, with the following Container Create Options:

```
{
  "Env": [
    "IOT_HUB_CS=HostName=<device_connetion_string>"
  ],
  "HostConfig": {
    "NetworkMode": "host"
  }
}

```

## Errors:
currently:
```
(Docker API responded with status code=InternalServerError, response={"message":"failed to add interface veth418c129 to sandbox: error setting interface \"veth418c129\" IP to 172.18.0.4/16: cannot program address 172.18.0.4/16 in sandbox interface because it conflicts with existing route {Ifindex: 5 Dst: 172.18.0.0/16 Src: 172.18.0.1 Gw: <nil> Flags: [] Table: 254}"}

```
