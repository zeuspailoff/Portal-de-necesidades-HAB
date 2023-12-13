import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const {
    MYSQL_PORT,
    MYSQL_HOST,
    MYSQL_USER,
    MYSQL_PASS,
    MYSQL_DB
} = process.env;

let pool;

const getPool = async () => {
    try { 
        if (!pool) { 

            
            const poolTemp = mysql.createPool({
                port: MYSQL_PORT,
                host: MYSQL_HOST, 
                user: MYSQL_USER, 
                password: MYSQL_PASS, 
            })

            await poolTemp.query(`CREATE DATABASE IF NOT EXISTS ${MYSQL_DB}`);

            pool = mysql.createPool({ 
                port: MYSQL_PORT,
                host: MYSQL_HOST, 
                user: MYSQL_USER, 
                password: MYSQL_PASS, 
                connectionLimit: 10, 
                database: MYSQL_DB, 
                timezone: 'Z' 
            }) 

        } 

        return pool; 
    } catch (error) { 
        console.error(error) 
    } 
}

export default getPool;