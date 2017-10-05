var express = require('express');
var db = require('../models');
var router = express.Router();
var bcrypt = require('bcryptjs');
var Sequelize = require('sequelize');
var Promise = require('bluebird');

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
  db.user.findById(req.session.user.id, {
    include: {
      model: db.meetup
    }
  })
  .then(function(user) {
    return user.getMeetups();
  })
  .then(function(meetups) {
    meetupsWithUsers = [];
    var meetupWithUsers;

    meetups.forEach(meetup => {
      meetupsWithUsers.push(
        Promise.all([
          meetup.getCoffeeshop(),
          meetup.getUsers()
        ])
        .spread((coffeeshop, users) => {
          meetupWithUsers = meetup;
          meetupWithUsers.name = coffeeshop.name;
          meetupWithUsers.personToMeet = (users[0].id === req.session.user.id) ? users[1].f_name : users[0].f_name;
          return meetupWithUsers;
        })
      )
    })
    console.log("meetupsWithUsers", meetupsWithUsers);
    return Promise.all(meetupsWithUsers);
  })
  .then(function(meetupsWithUsers) {
    // console.log("a;lskdfj;aslkdfj ;aslkdjf;aslkdjf ;askldfj; lkasj");
    console.log("meetupsWithUsers: ", meetupsWithUsers);
    res.render("meetups", {meetups: meetupsWithUsers});
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

  db.meetup.create({
    datetime: req.body.datetime,
    accepted: false,
    coffeeshop_id: req.body.coffeeshop_id,
    created_at: Sequelize.NOW,
    updated_at: Sequelize.NOW
  })
  .then(createdMeetup => {
    var meetup = createdMeetup
    db.user.max('id')
    .then(max => {
      userMeetup.create({
        user_id: req.session.user.id,
        meetup_id: meetup.id
      });
      userMeetup.create({
        //Meetup for Random user!
        user_id: Math.floor(Math.random() * max),
        meetup_id: meetup.id
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
