'use strict';

var mongodbPort = 25262;

var mongodbUser = "admin";
var mongodbPass = "lolxd";
var mongoAddress = "@ds125262.mlab.com";
var mongodbHost = mongodbUser + ":" + mongodbPass + mongoAddress;

var config = {
    mongodb: {
        host: mongodbHost,
        port: mongodbPort,
        name: "angular_test"
    }
}

config.mongodb.uri = `mongodb://${config.mongodb.host}:${config.mongodb.port}/${config.mongodb.name}`;

module.exports = config;