/**
 *
 *  This is the mongoDB connection
 *
 */

import { MongoClient } from "mongodb";

const URI = "";

export async function connectToDatabase() {
  let cachedClient = null;
  let cachedDb = null;

  if (cachedDb) {
    return cachedDb;
  }

  if (!cachedClient) {
    // Creating the connection
    cachedClient = new MongoClient(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    try {
      // Connecting
      await cachedClient.connect();
      console.log("Connected to MongoDB");
    } catch (error) {
      console.error("Error connecting to database: " + error);
      throw error;
    }
  }

  cachedDb = cachedClient.db(); // Get the database object

  return cachedDb;
}
