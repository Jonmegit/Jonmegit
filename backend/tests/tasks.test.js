const request = require('supertest');
const app = require('../src/server');

let token;
let teamId;

beforeAll(async () => {
  const user = 'user' + Date.now();
  const code = 'CODE' + Date.now();
  await request(app).post('/api/auth/register').send({ username: user, password: 'pass123' });
  const res = await request(app).post('/api/auth/login').send({ username: user, password: 'pass123' });
  token = res.body.token;
  const team = await request(app)
    .post('/api/teams')
    .set('Authorization', 'Bearer ' + token)
    .send({ name: 'Team', code });
  teamId = team.body.id;
});

test('create and complete task', async () => {
  const createRes = await request(app)
    .post('/api/tasks')
    .set('Authorization', 'Bearer ' + token)
    .send({ team_id: teamId, title: 'Task1', description: 'Desc', priority: 'High', due_date: new Date().toISOString() });
  expect(createRes.status).toBe(200);
  const taskId = createRes.body.id;

  await request(app)
    .patch(`/api/tasks/${taskId}/complete`)
    .set('Authorization', 'Bearer ' + token);

  const completedRes = await request(app)
    .get('/api/tasks/completed')
    .set('Authorization', 'Bearer ' + token);
  expect(completedRes.body.length).toBeGreaterThan(0);

  const stats = await request(app)
    .get('/api/tasks/summary')
    .set('Authorization', 'Bearer ' + token);
  expect(stats.body.total).toBeGreaterThan(0);
});
