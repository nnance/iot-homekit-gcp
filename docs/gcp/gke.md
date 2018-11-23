Google Kubernetes Engine
===

- [Create Project](#create-project)
- [Create GKE Cluster](#create-gke-cluster)
- [Deploy InfluxDB](#deploy-influxdb)
    - [Verifying the database](#verifying-the-database)

I recommend starting a new project so all the resources you provision as part of the home automation project will be grouped together.  This will also help track the billing associated with project as well.

## Create Project

Create new project with:

```

```

## Create GKE Cluster

Using GKE makes deploying applications like InfluxDB and Grafana easier.  However, you can create a cheap single machine cluster with:

```

```

## Deploy InfluxDB

Once the Kubernetes cluster is in place you can easily deploy the Influx app using the Google console. 

```
```

### Verifying the database

Using the Google console you can use the following commands to connect to the database:

```
kubectl exec -it "influxdb-1-influxdb-0" --namespace "default" -- influx -host localhost -port 8086 -username ${INFLUX_USER} -password ${INFLUX_PSW}
```

You can use the [Influx getting Started guide]() to verify the database is functioning properly

```
SHOW DATABASES
```

