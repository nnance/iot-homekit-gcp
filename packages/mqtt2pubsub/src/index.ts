import { createServer } from "net"

// Imports the MQTT client library
import { connect, MqttClient } from "mqtt";

import { 
    createClient,
    createOrGetTopic,
    messagePublisher,
    Topic,
} from "./google-pubsub";

// Setup configuration
const mqttServer = "mqtt://raspberrypi.local";
const mqttTopic = "telegraf/#";

const googleProjectId = "home-automation-223314";
const googleTopic = "telegraf"
const googleKeyFile = "/var/lib/gcp/Home-Automation-51534960b007.json"

type ErrorFunc = (err: Error | undefined) => void

const logError = (logger: Console): ErrorFunc => (err) => {
    if (err) {
      logger.error(err);
    }
}

const errorLogger = logError(console)

// connect to MQTT server
const mqttClient = connect(mqttServer);
mqttClient.on("connect", () => mqttClient.subscribe(mqttTopic, errorLogger))

// Instantiates a client
const pubsubClient = createClient(googleKeyFile, googleProjectId);

// main function that will auto run
(async () => {
    const topic = await createOrGetTopic(googleTopic, pubsubClient, errorLogger)
    mqttClient.on("message", messagePublisher(topic, console))
    createServer().listen()
})()
