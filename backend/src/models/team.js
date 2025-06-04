const { db } = require('../utils/db');

const createTeam = (name, code) => {
  return new Promise((resolve, reject) => {
    db.run('INSERT INTO teams (name, code) VALUES (?,?)', [name, code], function(err){
      if (err) reject(err); else resolve({ id: this.lastID, name, code });
    });
  });
};

const getTeamByCode = (code) => {
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM teams WHERE code = ?', [code], (err, row) => {
      if (err) reject(err); else resolve(row);
    });
  });
};

const addUserToTeam = (user_id, team_id) => {
  return new Promise((resolve, reject) => {
    db.run('INSERT INTO user_teams (user_id, team_id) VALUES (?,?)', [user_id, team_id], function(err){
      if (err) reject(err); else resolve();
    });
  });
};

module.exports = { createTeam, getTeamByCode, addUserToTeam };
