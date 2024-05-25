import dotenv from 'dotenv';

dotenv.config();

const postgresHost = process.env.POSTGRES_HOST;
const postgresDB = process.env.POSTGRES_DB;
const postgresUser = process.env.POSTGRES_USER;
const postgresPw = process.env.POSTGRES_PW;
const postgresPort = process.env.POSTGRES_PORT;

// Json web token
export const jwtSecret = process.env.JWT_SECRET;
export const jwtExpiresIn = process.env.JWT_EXPIRES_IN;

export const connectionString = `postgresql://${postgresUser}:${postgresPw}@${postgresHost}:${postgresPort}/${postgresDB}`;