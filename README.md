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



### Raspberry PI

