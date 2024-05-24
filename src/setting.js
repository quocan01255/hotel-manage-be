import dotenv from 'dotenv';

dotenv.config();

const postgresHost = process.env.POSTGRES_HOST;
const postgresDB = process.env.POSTGRES_DB;
const postgresUser = process.env.POSTGRES_USER;
const postgresPw = process.env.POSTGRES_PW;
const postgresPort = process.env.POSTGRES_PORT;

export const connectionString = `postgresql://${postgresUser}:${postgresPw}@${postgresHost}:${postgresPort}/${postgresDB}`;