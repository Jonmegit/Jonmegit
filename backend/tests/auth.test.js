const request = require('supertest');
const app = require('../src/server');

describe('Auth endpoints', () => {
  it('registers and logs in a user', async () => {
    const u = 'test' + Date.now();
    const res = await request(app).post('/api/auth/register').send({username:u, password:'password'});
    expect(res.status).toBe(200);
    const login = await request(app).post('/api/auth/login').send({username:u, password:'password'});
    expect(login.body.token).toBeDefined();
  });
});
