// Imports the Google Cloud client library
import { PubSub, Topic } from "@google-cloud/pubsub"
export { Topic } from "@google-cloud/pubsub"

type ErrorFunc = (err: Error | undefined) => void

type PublishFunc = (topicName: string, message: Buffer) => void

const getTopic = (topicName: string, client: PubSub): Promise<Topic> => {
    return new Promise((resolve, reject) => {
        client.getTopics({}, (err: Error, topics: Topic[]) => {
            if (err) {
                reject(err)
            }
            resolve(topics.find( topic => topic.name.indexOf(topicName) > -1))
        })
    })
}

export function createClient(keyFilename: string, projectId: string) {
    // Instantiates a client
    return new PubSub({
        keyFilename,
        projectId,
    })
}

export function createOrGetTopic(topicName: string, client: PubSub, logger: ErrorFunc): Promise<Topic> {
    return new Promise((resolve) => {
        client.createTopic(topicName, async (err: Error, topic: Topic) => {
            if (err) {
                logger(err)
                resolve(await getTopic(topicName, client))
            } else {
                resolve(topic)
            }
        })
    })
}

export const messagePublisher = (topic: Topic, logger: Console): PublishFunc => (topicName, message) => {
    // logger.log(`${topicName} - ${message.toString()}`)
    console.log(`${topicName} - ${message.toString()}`)
    topic.publisher().publish(message, {topicName})
}
