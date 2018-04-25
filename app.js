var express = require('express');
var path = require('path');
var app = express();

var bodyParser = require('body-parser');
var passport = require('passport');
//var user = require('./routes/userroutes')(app,passport);
//var auth = require('./routes/auth')(app,passport);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var session = require('express-session');

require('./config/passport')(passport);

app.use(session({ secret: 'lolxd' })); // session secret
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(__dirname + '/public'));

require('./routes/auth')(app, passport);
//require('./routes/userroutes')(app, passport);

app.use(function(req, res, next){
  var err = new Error ('Not Found');
  err.status = 404;
  next(err); 
});

app.use(function(err, req, res, next){
  res.status(err.status || 500);
  console.log(err); 
});

app.listen(1337, function(){
  console.log('Listening at port 1337');
});