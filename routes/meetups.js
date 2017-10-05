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
    var meetupsWithUsers = [];
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
          meetupWithUsers.personToMeetLname = (users[0].id === req.session.user.id) ? users[1].l_name : users[0].l_name;
          meetupWithUsers.date = meetup.datetime.split(" ")[0];
          meetupWithUsers.time = meetup.datetime.split(" ")[1];
          return meetupWithUsers;
        })
      )
    })
    return Promise.all(meetupsWithUsers);
  })
  .then(function(meetupsWithUsers) {
    // console.log("meetupsWithUsers: ", meetupsWithUsers);
    res.render("meetups", {meetups: meetupsWithUsers});
  })
})

/* GET meetup edit page by id */
router.get('/:id/edit', function (req, res) {
  var m;
  var Promises = [];
  db.meetup.findById(req.params.id)
  .then(function(meetup) {
    Promises.push(
    Promise.all([
      meetup.getCoffeeshop(),
      meetup.getUsers(),
      db.coffeeshop.findAll()
    ])
    .spread((coffeeshop, users, all_shops) => {
      m = {};
      m.name = coffeeshop.name;
      m.id = meetup.id;
      m.personToMeet = (users[0].id === req.session.user.id) ? users[1].f_name : users[0].f_name;
      m.personToMeetLname = (users[0].id === req.session.user.id) ? users[1].l_name : users[0].l_name;
      m.date = meetup.datetime.split(" ")[0];
      m.time = meetup.datetime.split(" ")[1];
      m.coffeeshops = all_shops;
      return m;
    })
  )
    return Promise.all(Promises);
  })
  .then(function(meetup) {
    console.log(meetup);
    res.render('editMeetups', {meetup: meetup[0], coffeeshops: meetup[0].coffeeshops});
  })
})

/* POST meetup */
router.post('/', function(req, res) {
  // console.log('i am posting');
  var date = new Date();
  console.log(date);
  db.meetup.create({
    datetime: date.toString(),
    accepted: false,
    coffeeshop_id: 1
  })
  .then(createdMeetup => {
    var meetup = createdMeetup
    db.user.max('id')
    .then(max => {
      db.userMeetup.create({
        user_id: req.session.user.id,
        meetup_id: meetup.id
      });
      db.userMeetup.create({
        //Meetup for Random user!
        user_id: 1 + Math.floor(Math.random() * (max-1)),
        meetup_id: meetup.id
      });
    })
  })
  .then(function(meetups) {
    // res.render('/meetups');
    res.redirect('/meetups');
  })
})
// use case: you say you are free for coffee. the post route creates a new meetup for you.

/* PUT meetup by id */
router.put('/:id', function(req, res) {
  console.log("puttest");
  db.coffeeshop.find({
    where: {name: req.body.name}
  })
  .then(coffeeshop => {

  })
  db.meetup.findById(req.params.id, {
    attributes: ['id', 'name', 'datetime']
  })
  .then(function(meetup) {
    // console.log('req.body', req.body);
    meetup.updateAttributes({
      name: req.body.name,
      datetime: req.body.date + " " + req.body.time
    })
    .then(function(meetups) {
      res.render('/meetups');
    })
  })
})

module.exports = router;
