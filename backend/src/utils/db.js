const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const db = new sqlite3.Database(path.resolve(__dirname, '../../database.sqlite'));

const init = () => {
  db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE,
      password TEXT
    )`);
    db.run(`CREATE TABLE IF NOT EXISTS teams (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      code TEXT UNIQUE
    )`);
    db.run(`CREATE TABLE IF NOT EXISTS user_teams (
      user_id INTEGER,
      team_id INTEGER
    )`);
    db.run(`CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      team_id INTEGER,
      user_id INTEGER,
      title TEXT,
      description TEXT,
      priority TEXT,
      due_date TEXT,
      completed INTEGER DEFAULT 0
    )`);
  });
};

module.exports = { db, init };
