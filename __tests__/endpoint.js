const request = require('supertest');
const dotenv = require('dotenv');
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
      it.todo('responds with 200 status and application/json content type');
      it.todo('catches bad usernames');
    });
  });
});
