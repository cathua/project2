var express = require('express');
var db = require('../models');
var router = express.Router();
var bcrypt = require('bcryptjs');
var Sequelize = require('sequelize');
const jwt = require('jsonwebtoken');
const jwtCheck = require('express-jwt');

/* ALL PROTECTED ROUTES */

/* GET personal profile */
router.get('/', jwtCheck({ secret: process.env.JWT_SECRET }), function(req, res) {
  var token = req.headers.authorization.split(' ')[1];
  var decoded = jwt.decode(token);
  var id = decoded.payload.id;
  // let token = localStorage.getItem('token');
  // console.log('token', token);
  // res.send('i work');
  db.user.findById(id)
  .then(function(user) {
    res.status(200).json({user: user});
  })
})

/* EDIT personal profile */
router.post('/:id', jwtCheck({ secret: process.env.JWT_SECRET }), function(req, res) {

})


module.exports = router;
