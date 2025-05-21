// lib/database.ts
import { MongoClient, Db } from 'mongodb';

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB;

if (!uri) {
  throw new Error('Будь ласка, визначте змінну середовища MONGODB_URI');
}

if (!dbName) {
  throw new Error('Будь ласка, визначте змінну середовища MONGODB_DB');
}

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

export async function connectDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  // Підключення без параметрів useNewUrlParser і useUnifiedTopology
  const client = await MongoClient.connect(uri!, {
    ssl: true, // Включення SSL
    // sslValidate: true, // Вимога перевірки сертифікатівx
    tlsAllowInvalidCertificates: false, // Забезпечуємо правильний сертифікат
  });
  const db = client.db(dbName);

  cachedClient = client;
  cachedDb = db;

  return { client, db };
}