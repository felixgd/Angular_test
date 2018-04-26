// config/passport.js

// load all the things we need
var LocalStrategy = require('passport-local').Strategy;

// load up the user model
var User = require('../models/user');
var crypto = require('crypto');
var token;

var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
           user: 'nodemailer.test1337@gmail.com',
           pass: 'felixjose17'
       }
   });
// expose this function to our app using module.exports
module.exports = function(passport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
            console.log('User logged in');
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        console.log('User logged out');
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('local-signup', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'username',
        passwordField : 'password',
        emailField: 'email'
    },
    function(req, username, password, email, done) {

        // asynchronous
        // User.findOne wont fire unless data is sent back
        process.nextTick(function() {

        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        User.findOne({ 'username' :  username }, function(err, user) {
            // if there are any errors, return the error
            if (err){
                return done(err);
            }
            // check to see if theres already a user with that email
            if (user) {
                console.log('user already created');
                return done(null, false);
            } else {

                // if there is no user with that email
                // create the user
                var newUser            = new User();
                token = crypto.randomBytes(16).toString('hex');
                // set the user's local credentials
                newUser.username    = username;
                newUser.password = password;
                newUser.email = email;
                newUser.token = token;
                newUser.status = false;
                // save the user
                newUser.save(function(err) {
                    if (err){
                        throw err;
                    }
                    console.log('User Sign Up');
                });
                send_email(newUser.email,req.body.host);
                return done(null, newUser);
                    
            }

        });    

        });

    }));

    passport.use('local-login', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'username',
        passwordField : 'password'
    },
    function(req,username, password, done) { // callback with email and password from our form

        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        User.findOne({ 'username' :  username }, function(err, user) {
            // if there are any errors, return the error before anything else
            if (err){
                return done(err);
            }
            console.log(user);
            console.log(password);
            // if no user is found, return the message
            if (!user){
                console.log('user not found');
                return done(null, false); // req.flash is the way to set flashdata using connect-flash
            }
            // if the user is found but the password is wrong
            if (!(user.password==password)){
                console.log('incorrect password');
                return done(null, false); // create the loginMessage and save it to session as flashdata
            }
            // all is well, return successful user
            console.log('logged in');
            return done(null, user);
        });

    }));

    function send_email(email, host){
        var mailOptions = { from: 'no-reply@to-doapp.com', to: email, subject: 'Account Verification Token', text: 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + host + '\/verification\/' +'/'+ token +'\/' + "\nAnd enter this Token:\n " + token};
                                
            transporter.sendMail(mailOptions, function (err) {
            if (err) { return res.status(500).send({ msg: err.message }); }
        })
    }

};

