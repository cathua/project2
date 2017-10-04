var express = require('express');
var db = require('../models');
var router = express.Router();
var bcrypt = require('bcryptjs');
var Sequelize = require('sequelize');
const jwt = require('jsonwebtoken');
const jwtCheck = require('express-jwt');

const ensureLoggedIn = (req, res, next) => {
  if (!req.session || !req.session.user) {
    console.log('req.session: ', req.session);
    res.redirect('/');
  } else {
    next();
  }
}

/* ALL PROTECTED PAGES */

/* GET all meetups */
router.get('/', ensureLoggedIn, function(req, res) {
  db.user.findById(req.session.user.userId, {
    include: {
      model: db.meetup
    }
  })
  .then(function(user) {
    // user.getMeetups()
    // .then(meetups => {
      //create an array to store all the meetups with appended users and location
      var meetupsWithUsers = [];
      user.meetups.forEach(meetup => {
        var meetupWithUsers = {};
        meetupWithUsers.datetime = meetup.datetime;
        meetupWithUsers.accepted = meetup.accepted;

        //get the location from coffeeshop_id
        meetup.getCoffeeshop()
        .then(coffeeshop => {
          meetupWithUsers.name = coffeeshop.name;
        });
        meetup.getUsers()
        .then(usersInMeetup => {
          usersInMeetup.forEach(userInMeetup => {
            if (usersInMeetup.userId !== req.session.user.userId) {
              meetupWithUsers.personToMeet = usersInMeetup.f_name;
            }
          })
        })
      })
      res.render("meetups", {meetups: meetupsWithUsers});
    })
  })
// })

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
