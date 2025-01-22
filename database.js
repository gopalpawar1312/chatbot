const sqlite3 = require("sqlite3").verbose();
const path = require("path");

// Create or connect to SQLite database
const dbPath = path.resolve(__dirname, "data", "chatbot.db");
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error("Error opening database:", err.message);
  } else {
    console.log("Connected to SQLite database.");
  }
});

// Initialize the messages table
const createTableQuery = `
  CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    sender TEXT NOT NULL,
    text TEXT NOT NULL,
    timestamp DATETIME NOT NULL
  )
`;

db.run(createTableQuery, (err) => {
  if (err) {
    console.error("Error creating table:", err.message);
  } else {
    console.log("Messages table ready.");
  }
});

module.exports = db;
