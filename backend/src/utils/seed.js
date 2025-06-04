const { init } = require('./db');
const { createUser } = require('../models/user');
const { createTeam, addUserToTeam } = require('../models/team');
const { createTask } = require('../models/task');

(async () => {
  init();
  const user = await createUser('admin', 'password');
  const team = await createTeam('Default', 'TEAM1');
  await addUserToTeam(user.id, team.id);
  await createTask(team.id, user.id, 'Sample Task', 'Demo', 'High', new Date().toISOString());
  console.log('Seed data created');
})();
