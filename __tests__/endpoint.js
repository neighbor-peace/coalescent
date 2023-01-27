const request = require('supertest');
const dotenv = require('dotenv');
dotenv.config();

const server = process.env.URL;

describe('Route integration', () => {
  describe('/healthCheck', () => {
    describe('GET', () => {
      it('responds with 200 status', () => {
        return request(server).get('/healthCheck').expect(200);
      });
    });
  });
});
