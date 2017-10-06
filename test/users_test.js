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
  it('should sign you up', function(done) {
    testSession.post('/signup')
      .send({f_name: 'test', l_name: 'test_suite', username: 'testingsuite', password: 'test'})
      .expect(302, done);
  })
  // THIS TEST ONLY WORKS ONCE. This is because of our restrictions with the duplicate usernames. However, the test still passes because it will redirect you to the error page. But, if you want to check if this test works, feel free to peruse the users table in the database.
})

describe('GET /meetups', function() {
  // this is the same as successfully logging in, since it redirects to /meetups.
  it('should redirect to /meetups', function(done) {
    testSession.post('/login')
      .send({ username: 'huawkward', password: 'test' })
      .expect(302, done);
    });

  it('should get /meetups/edit', function(done) {
    before(function (done) {
    // logging in as @testingsuite'
        testSession.post('/login')
            .set('Accept', 'application/json')
            .send({ username: 'huawkward', password: 'test' })
            .then(function())
            .end(function (error, response) {
                expect(302);

                done()
            })
    });
  });
});

// describe('GET /meetups/edit')


// before(function (done) {
// // logging in as @testingsuite'
//     testSession.post('/login')
//         .set('Accept', 'application/json')
//         .send(newUser)
//         .end(function (error, response) {
//             expect(302);
//
//             done()
//         })
// });
