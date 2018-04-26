'use strict';

module.exports = function(app, passport){

//Auth routes
app.get('/',function(req, res) {
    res.sendfile('../public/index.html');
});

app.post('/signup', passport.authenticate('local-signup', {
    successRedirect : '/user/signup', // redirect to the secure profile section
    failureRedirect : '/', // redirect back to the signup page if there is an error
}));

app.post('/login', passport.authenticate('local-login', {
    successRedirect : '/', // redirect to the secure profile section
    failureRedirect : '/', // redirect back to the signup page if there is an error
}));

app.get('/dashboard', function(req, res) {
    res.send(req.isAuthenticated() ? req.user : '0');
});

app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
})
}
