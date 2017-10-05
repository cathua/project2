require('dotenv').config({ silent: true });

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var methodOverride = require('method-override');
var db = require('./models');

var index = require('./routes/index');
var users = require('./routes/users');
var meetups = require('./routes/meetups');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Cookie handler
app.use(session({
  secret: process.env.SESSION_SECRET,
  cookie: { maxAge: 3600000},
  resave: false,
  saveUnitialized: false
}))

// Remove extra Express header
app.disable('x-powered-by');

app.use((req, res, next) => {
  // Convenience middleware to set current user from request
  res.locals.user = {};

  if (req.session && req.session.user) {
    const uid = req.session.user.id;

    db.user.findById(uid, {
      attributes: ['id', 'first_name', 'last_name', 'display_name']
    })
      .then(user => {
        res.locals.user = user;
        next();
      })
      .catch(err => {
        // Continue with request with no user,
        //  `ensureLoggedIn` will however fail if no valid user is found from session cookie
        next();
      })
  } else {
    next();
  }
});

app.use('/', index);
app.use('/users', users);
app.use('/meetups', meetups);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
