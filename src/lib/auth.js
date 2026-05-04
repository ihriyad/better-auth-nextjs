import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

console.log("DB URI:", process.env.AUTH_DB_URI ? "Found" : "MISSING"); // move this up to debug early

const client = new MongoClient(process.env.AUTH_DB_URI);

const clientPromise = client.connect();
await clientPromise;

const db = client.db("better-auth-db");

export const auth = betterAuth({
  emailAndPassword: { enabled: true },
  database: mongodbAdapter(db, { client }),
});
