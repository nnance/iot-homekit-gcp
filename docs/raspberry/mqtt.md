MQTT Broker
===

[MQTT](https://fr.wikipedia.org/wiki/MQTT) (Message Queuing Telemetry Transport) is a messaging protocol that works on the principle of underwriting / publishing that was developed at the base to simplify communication between the machines.

I used Mosquitto which is an Open Source MQTT (Broker) server that can be installed on a Raspberry Pi (but also on other platforms) to facilitate communication between connected objects (M2M).

I followed [these](https://diyprojects.io/mqtt-mosquitto-communicating-connected-objects-iot/#.W_V6Ji2ZNTY) instructions to install it on the Raspberry PI

```
sudo apt-get update
sudo apt-get install mosquitto
```

## Testing the broker

I tested the broker by connecting to it via my laptop which required me to install it via this command.  Here is an [example](http://www.xappsoftware.com/wordpress/2014/10/30/install-mosquitto-on-mac-os-x/)

```
brew install mosquitto
```

For whatever reason it wouldn't install in a way I could run it with a path so I used this command to start the subscriber

```
/usr/local/Cellar/mosquitto/1.5.4/bin/mosquitto_sub -h raspberrypi.local -t topic
```

This command to publish

```
/usr/local/Cellar/mosquitto/1.5.4/bin/mosquitto_pub -h raspberrypi.local -t topic -m 'hello world'
```

## MQTT Devices

You can build sensors that publish events like temporary change and motion detection to the MQTT queue.  This is an example [article](https://thingsmatic.com/2017/02/07/home-assistant-getting-started-and-using-mqtt-sensors/).  