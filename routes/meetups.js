var express = require('express');
var db = require('../models');
var router = express.Router();
var bcrypt = require('bcryptjs');
var Sequelize = require('sequelize');
const jwt = require('jsonwebtoken');
const jwtCheck = require('express-jwt');

/* ALL PROTECTED PAGES */

/* GET all meetups */
// jwtCheck({ secret: process.env.JWT_SECRET }),
// unsecured for now!
router.get('/', jwtCheck({ secret: process.env.JWT_SECRET }), function(req, res) {
  db.meetup.findAll()
  .then(meetups => {
    res.render('meetups', {meetups: meetups});
  })
})

/* GET meetup by id */
router.get('/:id', function (req, res) {
  db.meetup.findById(req.body.id)
  .then(function(meetup) {
    res.status(200).json({meetup: meetup});
  })
})

/* POST meetup */
router.post('/', function(req, res) {
  var coffeeshop_id = req.body.coffeeshop_id;
  var datetime = req.body.datetime;
  var accepted = false;
  db.meetup.create({
    datetime: datetime,
    accepted: accepted,
    coffeeshop_id: coffeeshop_id,
    created_at: Sequelize.NOW,
    updated_at: Sequelize.NOW
  })
  .then(meetup => {
    var decoded = jwt.decode(req.body.token);
    var meetupId = meetup.id;
    db.user.max('userId')
    .then(max => {
      userMeetup.create({
        user_id: decoded.id,
        meetup_id: meetupId
      });
      userMeetup.create({
        user_id: Math.floor(Math.random() * max),
        meetup_id: meetupId
      });
    })

  })
})
// use case: you say you are free for coffee. the post route creates a new meetup for you.

/* PUT meetup by id */
router.put('/:id', function(req, res) {
  // code to come
})

module.exports = router;
