var express = require('express');
var db = require('../models');
var router = express.Router();
var bcrypt = require('bcryptjs');
var Sequelize = require('sequelize');
var rp = require('request-promise');
var striptags = require('striptags');

const ensureLoggedIn = (req, res, next) => {
  if (!req.session || !req.session.user) {
    console.log('req.session: ', req.session);
    res.redirect('/');
  } else {
    next();
  }
}

/* UNPROTECTED PAGES */

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET logout */
router.get('/logout', (req, res, next) => {
  console.log('logging out lol');
  req.session.destroy(err => {
    res.locals.user = {};
    res.status(200).render('index');
  });
});

/* POST user sign-up */
router.post('/signup', function(req, res){
  var genSalt = bcrypt.genSaltSync(10);
  db.user.findOne({
    where: {
      username: req.body.username
    }
  })
  .then(function(user) {
    if(!user) {
      db.user.create({
        f_name: req.body.f_name,
        l_name: req.body.l_name,
        username: req.body.username,
        hashed_password: bcrypt.hashSync(req.body.password, genSalt),
        salt: genSalt
      })
      .then(user => {
        req.session.user = user;
        res.redirect('/users');
      })
    }
    else {
      res.redirect('/index_signup_error');
    }

  })
})

/* GET error page when you mess up the login */
router.get('/index_login_error', function(req, res) {
  res.render('index_login_error');
})

/* GET error page when you have duplicate usernames */
router.get('/index_signup_error', function(req, res) {
  res.render('index_signup_error');
})



/* PROTECTED PAGES */

/* Verify login. */
router.post('/login', function(req,res) {
  const username = striptags(req.body.username.trim());
  const password = striptags(req.body.password.trim());

  db.user.findOne({
    where: {
      username: username
    }
  })
  .then(user => {
    if (!user) {
      res.render('/index_login_error');
    }
    let salt = user.salt;
    let verify = bcrypt.compareSync(password, user.hashed_password); // return T or F
    if (!verify) {
      console.log('wrong username or password');
      res.redirect('/index_login_error');
    }
    else {
      req.session.user = user;
      res.redirect('/meetups');
    }
  })
  .catch(err => {
    //render error page
    console.log('Error: ', err);
    res.status(500).json(err);
  })
})

module.exports = router;
