var should    = require("chai").should(),
    expect    = require("chai").expect,
    supertest = require("supertest"),
    api       = supertest("http://localhost:3000");
    session = require('supertest-session');
    app = require('../app');
    testSession = null;


beforeEach(function () {
  testSession = session(app);

})


describe('GET /', function() {
  it('should return a 200 response', function(done) {
    api.get('/')
    .set('accept', 'application/json')
    .expect(200, done);
  });
});

describe('GET authentication errors', function() {
  it('accessing login error page directly returns 200 response', function(done) {
    api.get('/index_login_error')
    .set('accept', 'application/json')
    .expect(200, done);
  });

  it('accessing signup error page directly returns 200 response', function(done) {
    api.get('/index_signup_error')
    .set('accept', 'application/json')
    .expect(200, done);
  });

  it('accessing restricted page returns 302 response (redirected to main page)', function(done) {
    testSession.get('/meetups')
    .set('accept', 'application/json')
    .expect(302, done);
  })
})

describe('POST login', function() {
  it('should return a 302 when you log in incorrectly', function(done) {
    testSession.post('/login')
      .send({ username: 'huawkward', password: 'wrong' })
      .expect(302, done);
  });

  it('should log in', function(done) {
    testSession.post('/login')
      .send({ username: 'huawkward', password: 'test' })
      .expect(302, done);
  })
});

describe('POST signup', function() {
  it('should return a 302 when you sign up with duplicate username', function(done) {
    testSession.post('/signup')
      .send({ f_name: 'Cat', l_name: 'Hua', username: 'huawkward', password: 'test'})
      .expect(302, done);
  })
})
