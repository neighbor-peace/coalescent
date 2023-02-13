const request = require('supertest');
const dotenv = require('dotenv');
const { Str } = require('@supercharge/strings');
dotenv.config();

const { TEST_PW, TEST_ID } = process.env;

const server = 'http://localhost:8080';

describe('Route integration', () => {
  xdescribe('/', () => {
    describe('GET', () => {
      it('responds with 200 status and text/html content type', async () => {
        const response = await request(server).get('/');
        expect(response.headers['content-type']).toMatch(/text\/html/);
        expect(response.status).toEqual(200);
      });
    });
  });

  describe('/api', () => {
    xdescribe('/user', () => {
      describe('GET', () => {
        it('responds with 200 status, application/json content type, and correct data', () => {
          return request(server)
            .get('/api/user')
            .set('cookie', [`id=${TEST_ID}`])
            .send()
            .expect('content-type', /json/)
            .expect(200, {
              _id: TEST_ID,
              username: 'test_username',
              password: TEST_PW,
              createdAt: '2023-02-07T03:00:23.743Z',
              isAdmin: false,
              firstName: 'test_first_name',
              lastName: 'test_last_name',
              team: 'test_team',
              __v: 0,
            });
        });

        it('responds with 400 when invalid ID is passed', () => {
          return request(server)
            .get('/api/user')
            .set('Cookie', ['id=12345'])
            .send()
            .expect(400);
        });
      });

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

    xdescribe('/project', () => {
      describe('POST', () => {
        it('responds with 200 and content-type application/json', () => {
          return request(server)
            .post('/api/project', { title: 'test_project' })
            .expect('content-type', /json/)
            .expect(200, { test: 'test' });
        });
      });
    });
  });
});
