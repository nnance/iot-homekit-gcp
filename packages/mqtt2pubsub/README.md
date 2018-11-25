mqtt2pubsub
===

The service is designed to listen to many different topics on a MQTT queue and publish them to Google Pub/Sub.  This provides a common way for all device events and system metrics to be forward to the Google Cloud.

This architecture is based on similar work described in this [article](https://thingsmatic.com/2017/03/02/influxdb-and-grafana-for-sensor-time-series/).

