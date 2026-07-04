import { MongoClient, type Db } from "mongodb"

let cachedClient: MongoClient | null = null
let cachedDb: Db | null = null

/** Resolves the MongoDB connection string from either env var name. */
export function getMongoUri(): string {
  return process.env.MONGODB_URI || process.env.MONGODB_CONNECTION_STRING || ""
}

export async function connectToDatabase() {
  const uri = getMongoUri()

  if (!uri) {
    throw new Error("MONGODB_URI is not defined in environment variables")
  }

  if (!uri.startsWith("mongodb://") && !uri.startsWith("mongodb+srv://")) {
    throw new Error("MONGODB_URI must start with 'mongodb://' or 'mongodb+srv://'")
  }

  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb }
  }

  const client = new MongoClient(uri)
  await client.connect()
  const db = client.db(process.env.MONGODB_DB || "land2land")

  cachedClient = client
  cachedDb = db

  return { client, db }
}

export async function getDatabase() {
  const { db } = await connectToDatabase()
  return db
}
