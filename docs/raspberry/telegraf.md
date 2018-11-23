Telegraf
===

I installed Telegraf on the Raspberry PI to get system metrics (CPU, MEM, Temp) as well as application metrics for the homebridge process.

- [Installing Telegraf](#installing-telegraf)
  - [Docker](#docker)
- [Send Telegraf to MQTT](#send-telegraf-to-mqtt)
  - [Testing telegraf with command line](#testing-telegraf-with-command-line)
  - [Testing telegraf with mosquitto](#testing-telegraf-with-mosquitto)
- [Collect RaspberryPi temperature](#collect-raspberrypi-temperature)
- [Send Telegraf to InfluxDB](#send-telegraf-to-influxdb)
  

## Installing Telegraf

```
sudo apt-get install telegraf
sudo service telegraf start
```

### Docker

Docker installation [instructions](https://medium.com/@petey5000/monitoring-your-home-network-with-influxdb-on-raspberry-pi-with-docker-78a23559ffea).

## Send Telegraf to MQTT

I decided to use the MQTT output plugin which I configured by removing the comments the section of the config file.  I decided to take this approach to use the queue as a single source of all communication flow from the RaspberryPI to the cloud.

```
sudo nano /etc/telegraf/telegraf.conf
```

You must remove the comments for the `outputs.mqtt`, `servers` and `topic_prefix` lines.

```
 [[outputs.mqtt]]
   servers = ["localhost:1883"] # required.
#
#   ## MQTT outputs send metrics to this topic format
#   ##    "<topic_prefix>/<hostname>/<pluginname>/"
#   ##   ex: prefix/web01.example.com/mem
   topic_prefix = "telegraf"
```

Each time you make a config change you have to restart telegraf with

```
sudo service telegraf restart
```

### Testing telegraf with command line

Run test

```
telegraf -config /etc/telegraf/telegraf.conf -test
```

### Testing telegraf with mosquitto

If you have followed along and installed MQTT software on your laptop you can test if telegraf is working with:

```
/usr/local/Cellar/mosquitto/1.5.4/bin/mosquitto_sub -h raspberrypi.local -t telegraf/raspberrypi/cpu
```

## Collect RaspberryPi temperature

Add this to you telegraf.conf

```
[[inputs.file]] 
  files = ["/sys/class/thermal/thermal_zone0/temp"]
  name_override = "cpu_temperature"
  data_format = "value"
  data_type = "integer"
  
[[inputs.exec]]
  commands = [ "/opt/vc/bin/vcgencmd measure_temp" ]
  name_override = "gpu_temperature"
  data_format = "grok"
  grok_patterns = ["%{NUMBER:value:float}"]
```

Restart telegraf

```
sudo service telegraf restart
```

You can find more details [here](https://github.com/TheMickeyMike/raspberrypi-temperature-telegraf)

## Send Telegraf to InfluxDB

If you have Influx configured locally or you want to expose the cloud instance with a public IP you can configure telegraf to send direction to Influx.

```
 [[outputs.mqtt]]
   servers = ["localhost:1883"] # required.
#
#   ## MQTT outputs send metrics to this topic format
#   ##    "<topic_prefix>/<hostname>/<pluginname>/"
#   ##   ex: prefix/web01.example.com/mem
   topic_prefix = "telegraf"
```

**NOTE** Do not set the above at your cloud instance until you have deployed it.