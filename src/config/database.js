const sqlite3 = require("sqlite3").verbose();
const path = require("path");

// Path to your SQLite database file
const dbPath = path.join(__dirname, "../../database/jobportal.db");

// Connect to database
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Error opening database:", err.message);
  } else {
    console.log("✅ Connected to SQLite database at", dbPath);
  }
});

module.exports = db;
