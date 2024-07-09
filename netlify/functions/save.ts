import type { Handler } from "@netlify/functions";

export const handler: Handler = async (event, context) => {

    console.log(event.body)

    console.log('context', context)

    return {
        body: JSON.stringify({ message: "OK Saved" }),
        statusCode: 200,
    }
}
