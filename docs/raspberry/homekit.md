HomeKit MQTT Integration
===

The document covers the many different ways to integrate the devices that are communicating with the MQTT queue with Apple HomeKit to allow the devices to be controlled via Siri.

- [HomeKit To MQTT](#homekit-to-mqtt)
- [HomeBridge](#homebridge)
    - [MQTT Integration](#mqtt-integration)
    - [Nest Integration](#nest-integration)

## HomeKit To MQTT

[This](https://github.com/hobbyquaker/homekit2mqtt) NodeJS service supports direct integration with HomeKit and the MQTT queue.  This is a more direct approach to integration than using HomeBridge.  Also, many devices don't support MQTT and as a result requires the use of the MQTT bridge for those cases.

## HomeBridge

[HomeBridge](https://github.com/nfarina/homebridge) HomeKit support for the impatient.

### MQTT Integration

HomeBridge can be integrated to the MQTT queue using this [plugin](https://www.npmjs.com/package/homebridge-mqttthing)

### Nest Integration

Nest plugin for HomeBridge. Install the plugin as a global module with

```
npm install -g homebridge-nest
```

See the [documentation](https://www.npmjs.com/package/homebridge-nest) for how to configure the plugin with your Nest account.