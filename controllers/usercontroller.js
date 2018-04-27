var User = require('../models/user');
var db = require('../libs/db');
var path = require("path");
var express = require('express');
var app = express();


exports.user_controller_verification_post = function(req, res){
    console.log(req.body.token);
    User.findOne({token: req.body.token})
    .exec(function(err, found_user){
        if(err){
            console.log('error');
            return (err)
        }

        console.log(found_user);

        if(found_user){
            found_user.status = true;
            found_user.save(function(err, suser){
                if(err){
                    console.log('error');
                    return (err)
                }

                console.log(suser.status);
                return res.redirect('/');
            })
            
        }else{
        console.log('User not found');
        return res.redirect('/#/signup');
    }
    });
}
