# iot-homekit-gcp

Home automation project based on Apple Homekit and Google Cloud.  This is the documentation and code I used to automate my home.

Table Of Contents
- [iot-homekit-gcp](#iot-homekit-gcp)
    - [Requirements](#requirements)
    - [Technical Design](#technical-design)
        - [The Stack](#the-stack)
        - [Architecture](#architecture)
    - [Deployment](#deployment)
        - [Raspberry PI](#raspberry-pi)
        - [Google Cloud](#google-cloud)

## Requirements

The following list outlines the key requirements I had when designing the system.  It's important to note that the requirements are optimized for cloud infrastructure and not the overall operational costs.

1. Programmable automation via JavaScript.

2. Voice capable command and control via Siri or Alexa.

3. Simple software architecture with minimal components and state managed on the home network.  The system should restart and recover completely after power failure.

4. Simplified network configuration minimizing the number of components exposed to the public internet.  Specifically no need to open access to home network.

5. Cloud based monitoring and management

## Technical Design

The technical design is focused on an open IoT architecture with MQTT at the center of the control and management of the system.

### The Stack

* RaspberryPi - Home network bridge
* MQTT - Local IoT queue
* HomeBridge - Integrate devices with Apple HomeKit
* Telegraf / InfluxDB / Grafana - Metrics and monitoring
* Google Kubernetes Engine - Manage compute workloads
* NodeJS - Runtime for automation logic

### Architecture

All devices are registered and interacting with the MQTT queue which provides the infrastructure necessary for building the automation logic via a service.  HomeBridge is connected to the queue to provide voice support via Siri.

![Network Diagram](https://www.lucidchart.com/publicSegments/view/dba85aa8-a7e6-4d71-b736-4e39beef4e3a/image.png "Network Diagram")

Most of this project is deploying and configuring existing software components to achieve the requirements.  As such most of this repo is documentation that details the process I followed to deploy these components.

## Deployment

As I have described previously, there is a combination of components running on the local network on a Raspberry PI as well as components running in the cloud.  Over time I want to simplify the local deployment and have more components running in the cloud where possible.

Some initial thoughts on items that can be moved to the cloud include the `MQTT server` and `HomeBridge`.  Google IoT platform provides a cloud based MQTT server that could replace the local one.

This being said if running more things in the cloud isn't cost effective or has too much latency the following articles might be helpful in a local installation:

* [Gist](https://gist.github.com/xoseperez/e23334910fb45b0424b35c422760cb87) - Raspberry Pi 3 with Mosquitto, Node-RED, InfluxDB, Grafana and Nginx (as a reverse proxy)
* [Tick stack](https://www.influxdata.com/blog/running-the-tick-stack-on-a-raspberry-pi/) with Docker
* Self hosted MQTT three part series, [Part 1](https://thingsmatic.com/2016/06/24/a-self-hosted-mqtt-environment-for-internet-of-things-part-1/), [Part 2](https://thingsmatic.com/2016/06/24/a-self-hosted-mqtt-environment-for-internet-of-things-part-2/), [Part 3](https://thingsmatic.com/2016/06/24/a-self-hosted-mqtt-environment-for-internet-of-things-part-3/)
 
### Raspberry PI

The [Respberry PI](https://www.amazon.com/gp/product/B07BLRSKBV/ref=oh_aui_detailpage_o05_s00?ie=UTF8&psc=1) is used to bridge the local IoT devices with the cloud.  The following list of docs cover the process of installing and configuring it.

* [Installation](./docs/raspberry/installation.md)
* [MQTT](./docs/raspberry/mqtt.md)
* [Telegraf](./docs/raspberry/telegraf.md)
* [HomeBridge](./docs/raspberry/homebridge.md)

I am considering using Docker to install the above components to simplify the process and allow for greater automation.

### Google Cloud

I used Google Kubernetes Engine to easly spin up and deploy Influx and Grafana.