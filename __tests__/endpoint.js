const request = require('supertest');
const dotenv = require('dotenv');
dotenv.config();

const server = process.env.SERVER_URL;

describe('Route integration', () => {
  describe('/healthCheck', () => {
    describe('GET', () => {
      it('responds with 200 status', () => {
        return request(server).get('/healthCheck').expect(200);
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
