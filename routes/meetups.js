var express = require('express');
var db = require('../models');
var router = express.Router();
var bcrypt = require('bcryptjs');
var Sequelize = require('sequelize');
const jwt = require('jsonwebtoken');
const jwtCheck = require('express-jwt');

/* ALL PROTECTED PAGES */

/* GET all meetups */
router.get('/', function(req, res) {
  res.render('meetups');
  // jwtCheck({ secret: process.env.JWT_SECRET }),
  // unsecured for now!
})

/* GET meetup by id */
router.get('/:id', function (req, res) {
  db.meetup.findById(req.body.id)
  .then(function(meetups) {
    res.status(200).json({meetups: meetups});
  })
})

/* POST meetup */
router.post('/:id', function(req, res) {
  // code to come
})
// use case: you say you are free for coffee. the post route creates a new meetup for you.

/* PUT meetup by id */
router.put('/:id', function(req, res) {
  // code to come
})

module.exports = router;
