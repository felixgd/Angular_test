'use strict';
var user_controller = require('../controllers/usercontroller');

//User routes
  
module.exports= function(app){
app.post('/verify',user_controller.user_controller_verification_post);
}

