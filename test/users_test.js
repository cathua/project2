var should    = require("chai").should(),
    expect    = require("chai").expect,
    supertest = require("supertest"),
    api       = supertest("http://localhost:3000");
    session = require('supertest-session');

    beforeEach(function () {
      testSession = session(api);
    });


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

  // it('accessing through incorrect login returns 200 response', function(done) {
  //   api.post('/login')
  //   .send({
  //     username: 'moretesting',
  //     password: 'coffee42'
  //   })
  // })
})
