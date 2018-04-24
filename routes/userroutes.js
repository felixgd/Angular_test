'use strict';

var User=require('../models/user');
var user_controller = require('../controllers/usercontroller');
var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
    
    app.use(expressSession({secret: 'lolxd'}));
    app.use(passport.initialize());
    app.use(passport.session());
var router = express.Router();
//User routes
  router.get('/', user_controller.user_controller_index);
  router.post('/',passport.authenticate('local', {successRedirect: '/user/dashboard', failureRedirect:'/'}), function(req, res){res.redirect('/user/dashboard');});

  passport.serializeUser(function(user,done){
    done(null, user.username);
});

passport.deserializeUser(function(username, done){
    User.findOne({username: username})
    .exec(function(err, found_user){
        if(err){
            done(err, user);
        }
        done(null,user);
    })
});

passport.use( new LocalStrategy(
    function(username, password, done){
        console.log('lolxd');
        User.findOne({username: username})
        .exec(function(err, found_user){
            if(err||(found_user==null)) {
                console.log("username not found");
                return done (null,false, {message: 'Incorrect username'});
            }
            //ENCRIPTAR CONTRASENA
            console.log(found_user);
            if(found_user.password==password){
                console.log('match');
                return done(null, found_user)
            } 
        })
    }
));

  module.exports = router;
