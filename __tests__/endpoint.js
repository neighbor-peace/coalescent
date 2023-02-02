const request = require('supertest');
const dotenv = require('dotenv');
const { Str } = require('@supercharge/strings');
dotenv.config();

const url = 'http://localhost:8080';

describe('Route integration', () => {
  describe('/healthCheck', () => {
    describe('GET', () => {
      it('responds with 200 status', () => {
        return request(url).get('/api/healthCheck').expect(200);
      });
    });
  });

  describe('/user', () => {
    describe('POST /signup', () => {
      it('responds with 200 status and application/json content type', () => {
        const randomStr = Str.random(50);
        return request(url)
          .post('/api/user/signup')
          .send({
            firstName: `firstName${randomStr}`,
            lastName: `lastName${randomStr}`,
            username: `username${randomStr}`,
            password: `password${randomStr}`,
            team: `team${randomStr}`,
            isAdmin: false,
          })
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200);
      });
      it.todo('catches bad usernames');
    });
  });
});
