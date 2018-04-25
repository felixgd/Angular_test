'use strict';

module.exports = function(app, passport){

//Auth routes
app.get('/',function(req, res) {
    res.sendfile('../public/index.html');
});

app.post('/signup', passport.authenticate('local-signup', {
    successRedirect : '/user/dashboard', // redirect to the secure profile section
    failureRedirect : '/', // redirect back to the signup page if there is an error
}));

app.post('/login', passport.authenticate('local-login', {
    successRedirect : '/', // redirect to the secure profile section
    failureRedirect : '/', // redirect back to the signup page if there is an error
}));
}
