var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var passport = require('passport');
var favicon = require('serve-favicon');
var cors = require('cors');

var index = require('./routes/index');
var news = require('./routes/news');
var auth = require('./routes/auth');

// var logger = require('morgan');
// var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();

var config = require('./config/config.json');
require('./models/main.js').connect(config.mongoDbUri);

// view engine setup
app.set('views', path.join(__dirname, '../client/build/'));
app.set('view engine', 'jade');
app.use('/static', express.static(path.join(__dirname, '../client/build/static/')));

// app.all('*', function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "X-Requested-With");
//   // must use next to hand the request to router
//   next();
// });

//Todo: remove it when development is done
app.use(cors());

app.use(bodyParser.json());

// load passport strategies
app.use(passport.initialize());
var localSignupStrategy = require('./passport/signup_passport');
var localLoginStrategy = require('./passport/login_passport');
passport.use('local-signup', localSignupStrategy);
passport.use('local-login', localLoginStrategy);

// pass the authentication checker middleware
const authCheckMiddleware = require('./middleware/auth_checker');
//must use token to visit /news
app.use('/news', authCheckMiddleware);

app.use('/', index);
app.use('/auth', auth);
app.use('/news', news);

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, '../client/public', 'favicon.ico')));
// app.use(logger('dev'));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  //next(err);
  res.render('404 Not Found');
});

//// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
//
//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;
