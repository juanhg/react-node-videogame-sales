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