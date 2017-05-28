require('../models/videogame');

var mongoose = require('mongoose');
var handler = require('../utils/responseHandler');
var Videogame = mongoose.model('videogame');


// Get all videogames
exports.findAll = function (req, response) {
    console.log('GET videogames');

    Videogame.find(function (error, videogames) {
        handler.handleResponse(response, videogames, error);
    });
};


exports.findByName = function (req, response) {
     console.log("findByName")

    var filter = req.params.filter;
    Videogame.find({ "Name": { "$regex": filter, "$options": "i" } }, function (error, videogames) {
        handler.handleResponse(response, videogames, error);
    });
}

exports.findByPlatform = function (req, response) {
    console.log("findByPlatform")

    var filter = req.params.filter;
    Videogame.find({ "Platform": { "$regex": filter, "$options": "i" } }, function (error, videogames) {
        handler.handleResponse(response, videogames, error);
    });
}

exports.findByPublisher = function (req, response) {
    console.log("findByPublisher")

    var filter = req.params.filter;
    Videogame.find({ "Publisher": { "$regex": filter, "$options": "i" } }, function (error, videogames) {
        handler.handleResponse(response, videogames, error);
    });
}

exports.findByGenre = function (req, response) {
    console.log("findByGenre")

    var filter = req.params.filter;
    Videogame.find({ "Genre": { "$regex": filter, "$options": "i" } }, function (error, videogames) {
        handler.handleResponse(response, videogames, error);
    });
}