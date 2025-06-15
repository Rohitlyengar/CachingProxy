const Database = require('better-sqlite3');
const db = new Database('./db.sqlite');

db.prepare(`
  CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  url TEXT NOT NULL,
  accessed_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP)
`).run();

db.prepare(`
  CREATE TABLE IF NOT EXISTS blacklisted (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  url TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP)
`).run();

module.exports = db;
