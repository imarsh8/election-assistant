const mysql = require('mysql2/promise');

let pool;

try {
  pool = mysql.createPool({
    socketPath: `/cloudsql/election-assistant-anjali-2026:us-central1:election-assistant-db`,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10
  });

  console.log("✅ DB pool created");
} catch (err) {
  console.error("❌ DB init failed:", err.message);
}

module.exports = pool;