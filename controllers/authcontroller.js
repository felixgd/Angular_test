var User=require('../models/user');

exports.user_controller_verification_post = function(req,res){
    res.sendfile('./public/index.html');
}