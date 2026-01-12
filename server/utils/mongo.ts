import type { Db } from 'mongodb';
import { MongoClient } from 'mongodb'

let client: MongoClient | null = null
let db: Db | null = null

export async function getMongo(): Promise<Db> {
    if (db) return db

    const config = useRuntimeConfig()

    const uri = config.DB_URL
    if (!uri) {
        throw new Error('Missing runtimeConfig.dbUrl')
    }

    if (!client) {
        client = new MongoClient(uri, {
            maxPoolSize: process.env.NODE_ENV === 'production' ? 10 : 5,
        })
        await client.connect()
    }

    db = client.db()
    return db
}
