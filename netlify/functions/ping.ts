import type { Handler, HandlerEvent, HandlerContext } from "@netlify/functions"
import {createMongoClient, mongoConnect} from './support/mongo'
import {getClientIp, getEnvironmentInfo} from './support/client'

interface PingRequestBody {
    sessionId: string;
}

export const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {

    console.log('ping.ts')

    const mongoClient = await createMongoClient()

    try {
        const body: PingRequestBody = event.body ? JSON.parse(event.body) : { sessionId: 'unknown' };

        let db = await mongoConnect(mongoClient)

        const cursor = db.collection('ping')

        const clientIp = getClientIp(event)
        const environment = getEnvironmentInfo()

        await cursor.insertOne({
            ping: new Date(),
            ip: clientIp,
            environment,
            session_id: body.sessionId
        })

        return {
            statusCode: 201,
        }
    } catch (e) {
        console.error('Failed to store ping', e)
        return {
            statusCode: 200,
        }
    } finally {
        await mongoClient.close()
    }
}
