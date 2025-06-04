const { db } = require('../utils/db');

const createTask = (team_id, user_id, title, description, priority, due_date) => {
  return new Promise((resolve, reject) => {
    db.run(`INSERT INTO tasks (team_id, user_id, title, description, priority, due_date) 
            VALUES (?,?,?,?,?,?)`, [team_id, user_id, title, description, priority, due_date], function(err){
      if (err) reject(err); else resolve({ id: this.lastID, title });
    });
  });
};

const completeTask = (task_id) => {
  return new Promise((resolve, reject) => {
    db.run('UPDATE tasks SET completed = 1 WHERE id = ?', [task_id], function(err){
      if (err) reject(err); else resolve();
    });
  });
};

const tasksByUser = (user_id) => {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM tasks WHERE user_id = ?', [user_id], (err, rows) => {
      if (err) reject(err); else resolve(rows);
    });
  });
};

module.exports = { createTask, completeTask, tasksByUser };
