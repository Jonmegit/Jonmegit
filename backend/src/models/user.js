const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { db } = require('../utils/db');

const createUser = async (username, password) => {
  const hashed = await bcrypt.hash(password, 10);
  return new Promise((resolve, reject) => {
    db.run('INSERT INTO users (username, password) VALUES (?,?)', [username, hashed], function(err){
      if (err) reject(err); else resolve({ id: this.lastID, username });
    });
  });
};

const findUserByUsername = (username) => {
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM users WHERE username = ?', [username], (err, row) => {
      if (err) reject(err); else resolve(row);
    });
  });
};

const authenticate = async (username, password) => {
  const user = await findUserByUsername(username);
  if (!user) return null;
  const match = await bcrypt.compare(password, user.password);
  if (!match) return null;
  const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET || 'secret', { expiresIn: '1h' });
  return token;
};

module.exports = { createUser, findUserByUsername, authenticate };
