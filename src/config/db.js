require("dotenv").config();
const mysql = require("mysql2");

const db = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_ROOT_PASSWORD,
    database: process.env.MYSQL_DATABASE
});

db.connect((err) => {
    if (err) {
        console.error(`error connecting to the database: ${err.stack}`);
        return;
    }
    console.log(`connected as id: ${db.threadId}`);
});

module.exports = db;
