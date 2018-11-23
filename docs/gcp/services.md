Services
===

In order to expose the applications deployed in the GKE instance we create services available on the load balancer.  

- [Grafana](#grafana)
    - [Expose App Instance](#expose-app-instance)
- [Influx](#influx)
    - [Telegraf](#telegraf)

## Grafana

To get started, you will need to lookup the App Instance Name and namespace and expose them via an environment variable.

```
export NAMESPACE=default
export APP_INSTANCE_NAME=grafana-1-grafana
```

### Expose App Instance

Expose the app instance via a service load balancer.  

```
kubectl patch svc "${APP_INSTANCE_NAME}" --namespace "${NAMESPACE}"   -p '{"spec": {"type": "LoadBalancer"}}'
```

It may take a couple of minutes before the app instance is available on the load balancer

```
SERVICE_IP=$(kubectl get svc ${APP_INSTANCE_NAME} \  --namespace ${NAMESPACE} \
--output jsonpath='{.status.loadBalancer.ingress[0].ip}')
```

```
echo "http://${SERVICE_IP}:3000/"
```

## Influx

You don't need to expose Influx on the public internet unless you want to configure Telegraf on the RaspberryPI to write directly to Influx.  To do this lookup the influx app instance.

```
export NAMESPACE=default
export APP_INSTANCE_NAME=influxdb-1-influxdb-svc
```

**Not recommended,** follow the directions [above](#expose-app-instance) to expose the app instance.

### Telegraf

You can now follow the [instructions](../raspberry/telegraf.md#send-telegraf-to-influxdb) to configure Telegraf to send the metrics to the cloud instance of Influx.
