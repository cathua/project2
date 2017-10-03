var express = require('express');
var db = require('../models');
var router = express.Router();
var bcrypt = require('bcryptjs');
var Sequelize = require('sequelize');
var rp = require('request-promise');
const jwt = require('jsonwebtoken');
const jwtCheck = require('express-jwt');

/* UNPROTECTED PAGES */

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET sign-up page */
router.get('/signup', function(req, res) {
  res.render('signup');
  // this view doesn't exist yet lol
})

/* POST sign-up */
router.post('/signup', function(req, res){
  var genSalt = bcrypt.genSaltSync(10);
  db.user.create({
    f_name: req.body.f_name,
    l_name: req.body.l_name,
    username: req.body.username,
    hashed_password: bcrypt.hashSync(req.body.password, genSalt),
    salt: genSalt,
    created_at: Sequelize.NOW,
    updated_at: Sequelize.NOW
  })
})

/* GET login page. */
router.get('/login', function (req, res) {
  res.render('login');
});



/* PROTECTED PAGES */

/* Verify login. */
router.post('/login', function(req,res) {
  var username = req.body.username;
  var password = req.body.password;
  // var id = req.body


  db.user.findOne({
    where: {
      username: username,
      // hashed_password: password
    }
  })
  .then(user => {
    let salt = user.salt;
    let verify = bcrypt.compareSync(password, user.hashed_password); // return T or F
    if (!verify) {
      console.log('wrong username or password');
      res.redirect('/');
    }
    else {
      // req.session.user = user;
      const claims = {
        username: username,
        id: user.userId
      }
      const options = {
        expiresIn: 3600
      }

      var token = jwt.sign(claims, process.env.JWT_SECRET, options);

      rp({
        method: "GET",
        uri: 'http://localhost:3000/users',
        headers: {
          Authorization: `Bearer ${token}`
        },
        json: true
      })
      .then(user => {
        res.json(user);
      })
    }
  })
  .catch(err => {
    //render error page
    console.log('Error: ', err);
    res.status(500).json(err);
  })
})

module.exports = router;
