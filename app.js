var express = require('express');
var path = require('path');
var app = express();

var bodyParser = require('body-parser');

var user = require('./routes/userroutes');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/public'));

app.use('/', user);

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
})