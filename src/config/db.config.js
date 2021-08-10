import dotenv from 'dotenv';
dotenv.config();

export const HOST = process.env.DBHOST;
export const USER = process.env.DBUSER;
export const PASSWORD = process.env.DBPASS;
export const DB = process.env.DBNAME;
