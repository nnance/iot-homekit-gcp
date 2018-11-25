import { createServer } from "net"

// Imports the MQTT client library
import { connect, MqttClient } from "mqtt";

// Imports the Google Cloud client library
import { PubSub, Topic } from "@google-cloud/pubsub";

// Setup configuration
const mqttServer = "mqtt://raspberrypi.local";
const mqttTopic = "telegraf/#";

const googleProjectId = "home-automation-223314";
const googleTopic = "telegraf"
const googleKeyFile = "/var/lib/gcp/Home-Automation-51534960b007.json"

const mqttClient = connect(mqttServer);

// Instantiates a client
const pubsubClient = new PubSub({
  keyFilename: googleKeyFile,
  projectId: googleProjectId,
});

type ErrorFunc = (err: Error | undefined) => void

const logError = (logger: Console): ErrorFunc => (err) => {
    if (err) {
      logger.error(err);
    }
}

// subscribe to a topic or output to error log
const subscribeToMQTT = (topic: string, client: MqttClient, errFunc: ErrorFunc) => () => {
    client.subscribe(topic, errFunc);    
}

type PublishFunc = (topicName: string, message: Buffer) => void

const publishMessage = (topic: Topic, logger: Console): PublishFunc => (topicName, message) => {
    logger.log(`${topicName} - ${message.toString()}`);
    topic.publisher().publish(message, {topicName});
}

const getTopic = (topicName: string, client: PubSub): Promise<Topic> => {
    return new Promise((resolve, reject) => {
        client.getTopics({}, (err: Error, topics: Topic[]) => {
            if (err) {
                reject(err);
            }
            resolve(topics.find( topic => topic.name === topicName))
        })
    })
}

const createOrGetTopic = (topicName: string, client: PubSub, logger: ErrorFunc): Promise<Topic> =>  {
    return new Promise((resolve) => {
        client.createTopic(topicName, async (err: Error, topic: Topic) => {
            if (err) {
                logger(err)
                const remoteTopic = await getTopic(topicName, client)
                resolve(remoteTopic)
            } else {
                resolve(topic)
            }
        });
    })
}

const errorLogger = logError(console)

const publisher = (topic: Topic) => publishMessage(topic, console)
const onMessagePublish = (topic: Topic) => mqttClient.on("message", publisher(topic))

const subscriber = subscribeToMQTT(mqttTopic, mqttClient, errorLogger)
const onConnectSubscribe = () => mqttClient.on("connect", subscriber)

createOrGetTopic(googleTopic, pubsubClient, errorLogger)
    .then(onMessagePublish)
    .then(onConnectSubscribe)

createServer().listen()