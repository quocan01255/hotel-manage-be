import { connectionString } from '../settings';
import { Pool } from 'pg';
import pgPromise from 'pg-promise';
import dotenv from 'dotenv';

dotenv.config();

const pgp = pgPromise({
  /* Initialization Options */
});

console.log('connectionString: ' + connectionString);

const db = pgp(connectionString);

db.connect()
  .then(obj => {
    // Can check the server version here (pg-promise v10.1.0+):
    const serverVersion = obj.client.serverVersion;
    console.log('postgresql connected: ', serverVersion);
    obj.done(); // success, release the connection;
  })
  .catch(error => {
    console.log('Postgresql ERROR:', error.message || error);
  });

export const pool = new Pool({ connectionString });
export const database = db;
