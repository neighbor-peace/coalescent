const request = require('supertest');
const dotenv = require('dotenv');
const { Str } = require('@supercharge/strings');
dotenv.config();

const { TEST_PW } = process.env;

const server = 'http://localhost:8080';

describe('Route integration', () => {
  describe('/', () => {
    describe('GET', () => {
      it('responds with 200 status and text/html content type', async () => {
        const response = await request(server).get('/');
        expect(response.headers['content-type']).toMatch(/text\/html/);
        expect(response.status).toEqual(200);
      });
    });
  });

  describe('/api', () => {
    describe('/user/signup', () => {
      describe('POST', () => {
        const randomStr = Str.random(50);
        it('responds with 200 status and application/json content type', () => {
          return request(server)
            .post('/api/user/signup')
            .send({
              firstName: `firstName${randomStr}`,
              lastName: `lastName${randomStr}`,
              username: `username${randomStr}`,
              password: `password${randomStr}`,
              team: `team${randomStr}`,
              isAdmin: false,
            })
            .expect('Content-Type', /json/)
            .expect(200);
        });

        it('responds with 400 status when user data is incomplete', async () => {
          const missingFirstNameRes = await request(server)
            .post('/api/user/signup')
            .send({
              lastName: `lastName${randomStr}`,
              username: `username${randomStr}`,
              password: `password${randomStr}`,
              team: `team${randomStr}`,
              isAdmin: false,
            });
          const missingLastNameRes = await request(server)
            .post('/api/user/signup')
            .send({
              firstName: `firstName${randomStr}`,
              username: `username${randomStr}`,
              password: `password${randomStr}`,
              team: `team${randomStr}`,
              isAdmin: false,
            });
          const missingUsernameRes = await request(server)
            .post('/api/user/signup')
            .send({
              firstName: `firstName${randomStr}`,
              lastName: `lastName${randomStr}`,
              password: `password${randomStr}`,
              team: `team${randomStr}`,
              isAdmin: false,
            });
          const missingPwdRes = await request(server)
            .post('/api/user/signup')
            .send({
              firstName: `firstName${randomStr}`,
              lastName: `lastName${randomStr}`,
              username: `username${randomStr}`,
              team: `team${randomStr}`,
              isAdmin: false,
            });
          expect(missingFirstNameRes.status).toEqual(400);
          expect(missingLastNameRes.status).toEqual(400);
          expect(missingUsernameRes.status).toEqual(400);
          expect(missingPwdRes.status).toEqual(400);
        });

        it('responds with 409 status when duplicate username is submitted', () => {
          return request(server)
            .post('/api/user/signup')
            .send({
              firstName: `firstName${randomStr}`,
              lastName: `lastName${randomStr}`,
              username: `username${randomStr}`,
              password: `password${randomStr}`,
              team: `team${randomStr}`,
              isAdmin: false,
            })
            .expect(409);
        });
      });
    });

    describe('/user/login', () => {
      describe('POST', () => {
        it('responds with 200 status and application/json type', () => {
          return request(server)
            .post('/api/user/login')
            .send({
              username: 'test_username',
              password: TEST_PW,
            })
            .expect('content-type', /json/)
            .expect(200);
        });

        it('responds with 401 status for incorrect password', () => {
          return request(server)
            .post('/api/user/login')
            .send({
              username: 'test_username',
              password: '12345',
            })
            .expect(401);
        });
      });
    });
  });
});
