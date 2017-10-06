var should    = require("chai").should(),
    expect    = require("chai").expect,
    supertest = require("supertest"),
    api       = supertest("http://localhost:3000");

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

  // it('accessing through incorrect login returns 200 response', function(done) {
  //   api.post
  // })
})
