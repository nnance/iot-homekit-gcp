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
const subscribeToMQTT = (client: MqttClient, topic: string, errFunc: ErrorFunc) => () => {
    client.subscribe(topic, errFunc);    
}

type PublishFunc = (topicName: string, message: Buffer) => void

const publishMessage = (topic: Topic): PublishFunc => (topicName, message) => {
    topic.publisher().publish(message, {topicName});
}

type CreateTopicFunc = (client: PubSub, publishFunc: PublishFunc, errFunc: ErrorFunc) => (topicName: string, message: Buffer) => void

const createPubSubTopic: CreateTopicFunc = (client, publishFunc, errFunc) => (topicName, message) => {
    // message is Buffer
    // tslint:disable-next-line:no-console
    console.log(`${topicName} - ${message.toString()}`);
    publishFunc(topicName, message)
}

const getTopic = (topicName: string, client: PubSub): Promise<Topic> => {
    return new Promise((resolve, reject) => {
        client.getTopics({}, (err: Error, topics: Topic[]) => {
            if (err) {
                reject(err);
            }
            return topics.find( topic => topic.name === topicName)
        })
    })
}

const googleTopicCreator = (logger: ErrorFunc, client: PubSub) => async (err: Error, topic: Topic) => {
    const errorOrTopic = async () => {
        if (err) {
            logger(err)
            return await getTopic(googleTopic, client)
        } else {
            return Promise.resolve(topic)
        }
    }
    
    const actualTopic = await errorOrTopic()
    const publisher = publishMessage(actualTopic);
    mqttClient.on("message", createPubSubTopic(client, publisher, logger));
}


const errorLogger = logError(console)

const topicCreator = googleTopicCreator(errorLogger, pubsubClient)

pubsubClient.createTopic(googleTopic, topicCreator);

mqttClient.on("connect", subscribeToMQTT(mqttClient, mqttTopic, errorLogger));

createServer().listen();
