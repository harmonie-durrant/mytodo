require("dotenv").config();
const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "database",
	port: "3306",
    user: process.env.MYSQL_USER || "root",
    password: process.env.MYSQL_ROOT_PASSWORD || "pass",
    database: process.env.MYSQL_DATABASE || "db",
});

db.connect((err) => {
    if (err) {
        console.error(`error connecting to the database: ${err.stack}`);
        return;
    }
    console.log(`connected as id: ${db.threadId}`);
});

module.exports = db;
