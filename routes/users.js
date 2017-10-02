var express = require('express');
var db = require('../models');
var router = express.Router();
var bcrypt = require('bcryptjs');
var Sequelize = require('sequelize');
const jwt = require('jsonwebtoken');
const jwtCheck = require('express-jwt');
const jwtDecode = require('jwt-decode');


/* ALL PROTECTED ROUTES */

/* GET personal profile */
router.get('/:id', jwtCheck({ secret: process.env.JWT_SECRET }), function(req, res) {
  // let token = localStorage.getItem('token');
  // console.log('token', token);
  // res.send('i work');
  db.user.findById(req.params.id)
  .then(function(users) {
    // if(req.params.username ===  )
    res.status(200).json({users: users});
  })
})

/* EDIT personal profile */
router.post('/:id', jwtCheck({ secret: process.env.JWT_SECRET }), function(req, res) {

})


module.exports = router;
