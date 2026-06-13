import mysql from 'mysql2';

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    port: 3306,
    password: 'root',
    database: 'portfolio',
});

export default pool;