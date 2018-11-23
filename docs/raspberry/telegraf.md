# Telegraf

I installed Telegraf on the Raspberry PI to get system metrics (CPU, MEM, Temp) as well as application metrics for the homebridge process.

## Installing Telegraf

```
sudo apt-get install telegraf
sudo service telegraf start
```

## Telegraf to MQTT

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


## Docker

Docker installation [instructions](https://medium.com/@petey5000/monitoring-your-home-network-with-influxdb-on-raspberry-pi-with-docker-78a23559ffea).