"use strict";
const sqlite3 = require("sqlite3").verbose();
const dbPath = process.env.NODE_ENV === 'test' ? ":memory:" : "./database.sqlite";
// Create the SQLite database connection
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error("Error opening database:", err.message);
    }
    else {
        console.log(`Connected to the database at ${dbPath}`);
        // Initialize the database tables
        initializeTables();
    }
});
// Function to initialize tables
function initializeTables() {
    // Create the 'events' table
    db.run(`
    CREATE TABLE IF NOT EXISTS events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      description TEXT,
      date TEXT,
      location TEXT,
      organizer TEXT
    );
  `, (err) => {
        if (err) {
            console.error("Error creating 'events' table:", err.message);
        }
    });
    // Create the 'users' table
    db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT,
      password TEXT,
      fullName TEXT,
      role TEXT
    );
  `, (err) => {
        if (err) {
            console.error("Error creating 'users' table:", err.message);
        }
    });
    // Create the 'Registrations' table
    db.run(`
    CREATE TABLE IF NOT EXISTS Registrations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      event_id INTEGER,
      user_id INTEGER,
      FOREIGN KEY (event_id) REFERENCES events(id),
      FOREIGN KEY (user_id) REFERENCES users(id)
    );
  `, (err) => {
        if (err) {
            console.error("Error creating 'Registrations' table:", err.message);
        }
    });
    // Create the 'notifications' table
    db.run(`
    CREATE TABLE IF NOT EXISTS notifications (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      message TEXT,
      FOREIGN KEY (user_id) REFERENCES users(id)
    );
  `, (err) => {
        if (err) {
            console.error("Error creating 'notifications' table:", err.message);
        }
    });
}
// Export the database connection
module.exports = db;
