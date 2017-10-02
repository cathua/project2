var express = require('express');
var db = require('../models');
var router = express.Router();
var bcrypt = require('bcryptjs');
var Sequelize = require('sequelize');
// var salt = bcrypt.genSaltSync(10);
// console.log('salt', salt);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET login page. */
router.get('/login', function (req, res) {
  res.render('login');
});

/* Verify login. */
router.post('/login', function(req,res) {
  var username = req.body.username;
  var password = req.body.password;


  user.findOne({
    username: username,

    // hashed_password: password
  })
  .then(user => {
    console.log('user.salt', user.salt);
    let salt = user.salt;
    var attemptedPassword = bcrpt.hashSync(password, salt);
    let verify = bcrypt.compareSync(attemptedPassword, user.hashed_password); // return T or F
    if (!verify) {
      log('wrong password');
    }
    else {
      req.session.user = user;
      console.log('you did it!');
      res.redirect('/')
    }
  })
  .catch(err => {
    console.log('Error: ', err);
    res.status(500).json(err);
  })
})

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


module.exports = router;
