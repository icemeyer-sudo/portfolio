import mysql from 'mysql2';

const pool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.MYSQL_HOST || 'localhost',
    user: process.env.MYSQL_USER,
    port: process.env.MYSQL_PORT || 3306,
    password: process.env.MYSQL_PASS,
    database: process.env.MYSQL_DATABASE || 'portfolio',
});

export default pool;