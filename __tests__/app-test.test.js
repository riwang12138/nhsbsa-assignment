const request = require('supertest');
const app = require('../app');

describe('app error hanlder', () => {
  it('it should handle 404 error', (done) => {
    request(app)
      .get('/notExist')
      .expect(404, done);
  });
});

describe('Get methods should show pages and status correctly', () => {
  it('Should redirect to /dataEntry path by default with status 302', (done) => {
    request(app).get('/').expect('Location', '/data-entry').expect(302, done);
  });

  it('Should show a html data entry page with status 200', (done) => {
    request(app).get('/data-entry').expect('content-type', 'text/html; charset=utf-8').expect(200, done);
  });

  it('Should show a html success-page with status 201', (done) => {
    request(app).get('/success-page').expect('content-type', 'text/html; charset=utf-8').expect(201, done);
  });
});

describe('Post to the /data-entry path should follow the PRG pattern', () => {
  it('Should redirect page back with status 303 for empty input ', (done) => {
    request(app).post('/data-entry').expect('location', '/data-entry').expect(303, done);
  });

  it('Should redirect page back with status 303 with input longer than 10 characters', (done) => {
    request(app).post('/data-entry').send({ input: '0123456789a' }).expect('location', '/data-entry')
      .expect(303, done);
  });

  it('Should redirect to the success page with a valid input ', (done) => {
    request(app)
      .post('/data-entry')
      .send({ input: '0123456789' })
      .expect('location', '/success-page')
      .expect(302, done);
  });
});
