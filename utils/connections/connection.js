/**
 *
 *  This is the mongoDB connection
 *
 */

import { MongoClient } from "mongodb";

export async function connectToDatabase(uri) {
  let cachedClient = null;
  let cachedDb = null;

  if (cachedDb) {
    return cachedDb;
  }

  if (!cachedClient) {
    // Creating the connection
    cachedClient = new MongoClient(uri, {
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
