var express = require('express');
var db = require('../models');
var router = express.Router();
var bcrypt = require('bcryptjs');
var Sequelize = require('sequelize');

const ensureLoggedIn = (req, res, next) => {
  if (!req.session || !req.session.user) {
    console.log('req.session: ', req.session);
    res.redirect('/');
  } else {
    next();
  }
}

/* ALL PROTECTED ROUTES */

/* GET personal profile */
router.get('/', ensureLoggedIn, function(req, res) {
  db.user.findById(req.session.user.userId, {
    attributes: ['userId', 'f_name', 'l_name', 'username']
  })
  .then(function(user) {
    res.render("users",{user: user});
  })
})

/* GET edit profile */
router.get('/edit', ensureLoggedIn, function(req, res) {
  db.user.findById(req.session.user.userId, {
    attributes: ['userId', 'f_name', 'l_name', 'username']
  })
  .then(function(user) {
    res.render('edit', {user: user});
  })})

/* EDIT personal profile */
router.put('/edit', ensureLoggedIn, function(req, res) {

})


module.exports = router;
