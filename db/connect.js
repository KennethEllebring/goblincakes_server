const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.URI;
const database = process.env.DATABASE;

let db = null;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function connect() {
  if (db) {
    return db;
  }
  try {
    await client.connect();
    console.log("Connected successfully to database");
    db = client.db(database);
    return db;
  } catch (err) {
    console.error("Error connecting to the database:", err);
    throw new Error("Database connection failed");
  }
}

async function disconnect() {
  try {
    await client.close();
    db = null;
    console.log("Disconnected from database");
  } catch (err) {
    console.error("Error disconnecting from the database:", err);
  }
}

function getClientDB() {
  return db;
}

module.exports = {
  connect,
  disconnect,
  getClientDB,
};
