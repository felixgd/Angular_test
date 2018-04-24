var User = require('../models/user');
var db = require('../libs/db');
var path = require("path");
var express = require('express');
var app = express();
var salt = 10;
var crypto = require('crypto');
var nodemailer = require('nodemailer');
var expressSession = require('express-session');
var passport = require('passport');



app.use(expressSession({secret: 'lolxd'}));
app.use(passport.initialize());
app.use(passport.session());

var LocalStrategy = require('passport-local').Strategy;

var { body,validationResult } = require('express-validator/check');
var { sanitizeBody } = require('express-validator/filter');

var token;

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
           user: 'nodemailer.test1337@gmail.com',
           pass: 'felixjose17'
       }
   });



exports.user_controller_index = function(req,res){
    res.sendfile('./public/index.html');
}

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
        User.findOne({username: username}), function(err, found_user){
            if(err) {
                console.log("username not found");
                return done (null,false, {message: 'Incorrect username'});
            }
            //ENCRIPTAR CONTRASENA
            console.log(found_user);
            if(found_user.password==password){
                return done(null, found_user)
            } 
        }
    }
));

exports.user_controller_index_post = [
    sanitizeBody('username').trim().escape(),
    sanitizeBody('password').trim().escape(),

    (req, res, next)=>{
        console.log('lolxd');
    }
]

function send_email(token, email, host){
    var mailOptions = { from: 'no-reply@to-doapp.com', to: email, subject: 'Account Verification Token', text: 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + host + '\/verification\/' +'/'+ token +'\/' + "\nAnd enter this Token:\n " + token};
                            
        transporter.sendMail(mailOptions, function (err) {
        if (err) { return res.status(500).send({ msg: err.message }); }
    })
}