import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config({
    path: '../.env'
});

const dbConfig = {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
};

console.log('Database configuration:', dbConfig);

const db = new pg.Client(dbConfig);

db.connect()
  .then(() => console.log('Database connected successfully'))
  .catch(err => console.error('Database connection error', err.stack));

export default db;
