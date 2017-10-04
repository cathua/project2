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

/* POST sign-up */
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
        salt: genSalt,
        created_at: Sequelize.NOW,
        updated_at: Sequelize.NOW
      })
    }
    if (user) throw Error();
  })
})





/* PROTECTED PAGES */

/* Verify login. */
router.post('/login', function(req,res) {
  var username = req.body.username;
  var password = req.body.password;
  // var id = req.body


  db.user.findOne({
    where: {
      username: username
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
      res.json({user: claims, token: token});

      // res.setHeader("Authorization", `Bearer ${token}`);
      // res.redirect('/meetups');
      // rp({
      //   method: "GET",
      //   uri: 'http://localhost:3000/users/api',
      //   headers: {
      //     Authorization: `Bearer ${token}`
      //   },
      //   json: true
      // })
      // .then(user => {
      //   res.json({user: user});
      // })
    }
  })
  .catch(err => {
    //render error page
    console.log('Error: ', err);
    res.status(500).json(err);
  })
})

module.exports = router;
