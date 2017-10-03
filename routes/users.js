var express = require('express');
var db = require('../models');
var router = express.Router();
var bcrypt = require('bcryptjs');
var Sequelize = require('sequelize');
const jwt = require('jsonwebtoken');
const jwtCheck = require('express-jwt');

/* ALL PROTECTED ROUTES */

/* GET personal profile */
router.get('/api', jwtCheck({ secret: process.env.JWT_SECRET }), function(req, res) {
  var token = req.headers.authorization.split(' ')[1];
  var id= jwt.decode(token).id;
  db.user.findById(id)
  .then(function(user) {
    res.status(200).json({user: user});
  })
})

/* EDIT personal profile */
router.get('/edit', jwtCheck({ secret: process.env.JWT_SECRET }), function(req, res) {

})

/* EDIT personal profile */
router.put('/edit', jwtCheck({ secret: process.env.JWT_SECRET }), function(req, res) {

})


module.exports = router;
