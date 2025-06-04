const request = require('supertest');
const app = require('../src/server');

describe('Auth endpoints', () => {
  it('registers and logs in a user', async () => {
    const res = await request(app).post('/api/auth/register').send({username:'test', password:'password'});
    expect(res.status).toBe(200);
    const login = await request(app).post('/api/auth/login').send({username:'test', password:'password'});
    expect(login.body.token).toBeDefined();
  });
});
