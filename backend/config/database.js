import pg from "pg"; 
import dotenv from 'dotenv';

dotenv.config({
    path:"../.env"
});

const db = new pg.Client({
    user: process.env.DB_USER, 
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE, 
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

console.log({
    user: process.env.DB_USER, 
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE, 
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
})

db.connect(); 

export default db; 