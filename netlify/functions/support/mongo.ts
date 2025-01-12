import {MongoClient, ServerApiVersion} from 'mongodb'

export const MONGODB_URL = process.env.MONGODB_URL || 'mongodb://localhost:27017';
export const MONGODB_DATABASE = process.env.MONGODB_DATABASE || '18XX-support';

export const createMongoClient: () => Promise<MongoClient> = async () => {
    return new MongoClient(MONGODB_URL, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        },
        // Optimize settings for serverless environment
        connectTimeoutMS: 5000,
        socketTimeoutMS: 5000,
    })
}

export const mongoConnect = async (mongoClient: MongoClient) => {
    await mongoClient.connect();
    const db = mongoClient.db(MONGODB_DATABASE)
    await db.command({ ping: 1 });
    console.log("Pinged database deployment. Successfully connected to MongoDB!");
    return db;
}




