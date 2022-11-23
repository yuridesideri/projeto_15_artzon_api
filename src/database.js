import {MongoClient} from "mongodb";
import * as dotenv from "dotenv";
dotenv.config();

const DB_URI = process.env.DB_URI;

const client = new MongoClient(DB_URI);

const db = await client.db('Artzon');

export const usersCol = await db.collection('usersCollection');
export const sessionsCol = await db.collection('sessionsCollection');
export const wallpapersCol = await db.collection('wallapapersCollection');