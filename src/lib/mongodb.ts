
import { getServers, setServers } from "node:dns";
import { MongoClient } from "mongodb";

if (
  process.env.NODE_ENV === "development" &&
  getServers().includes("127.0.0.1")
) {
  setServers(["8.8.8.8", "1.1.1.1"]);
}

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("MONGODB_URI is not defined");
}

const globalForMongo = globalThis as typeof globalThis & {
  mongoClient?: MongoClient;
};

export const mongoClient =
  globalForMongo.mongoClient ?? new MongoClient(uri);

if (process.env.NODE_ENV !== "production") {
  globalForMongo.mongoClient = mongoClient;
}

export const db = mongoClient.db("booknook");
