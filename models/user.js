var mongoose = require('mongoose');
var db = require('../libs/db')();

module.exports = (function () {

var User = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    status: Boolean,
    token : {type: String, expires:"60"},
    createdAt: {type: Date, default: Date.now}
  },{collection:'User'});

  User.plugin(require('mongoose-unique-validator', {message: "Error"}));

  return mongoose.model('user',User);
})();