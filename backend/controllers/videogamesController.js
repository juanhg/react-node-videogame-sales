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

exports.groupByPlatform = function (req, response) {
    Videogame.aggregate(
        [{
            "$group": {
                _id: "$Platform",
                Global_Sales: { "$sum": "$Global_Sales" },
                NA_Sales: { "$sum": "$NA_Sales" },
                EU_Sales: { "$sum": "$EU_Sales" },
                JP_Sales: { "$sum": "$JP_Sales" }
            }
        }],
        function (error, videogames) {
            handler.handleResponse(response, videogames, error);
        });
}

exports.groupByPublisher = function (req, response) {
    Videogame.aggregate(
        [{
            "$group": {
                _id: "$Publisher",
                Global_Sales: { "$sum": "$Global_Sales" },
                NA_Sales: { "$sum": "$NA_Sales" },
                EU_Sales: { "$sum": "$EU_Sales" },
                JP_Sales: { "$sum": "$JP_Sales" }
            }
        }],
        function (error, videogames) {
            handler.handleResponse(response, videogames, error);
        });
}

exports.groupByGenre = function (req, response) {
    Videogame.aggregate(
        [{
            "$group": {
                _id: "$Genre",
                Global_Sales: { "$sum": "$Global_Sales" },
                NA_Sales: { "$sum": "$NA_Sales" },
                EU_Sales: { "$sum": "$EU_Sales" },
                JP_Sales: { "$sum": "$JP_Sales" }
            }
        }],
        function (error, videogames) {
            handler.handleResponse(response, videogames, error);
        });
}

exports.groupByYear = function (req, response) {
    Videogame.aggregate(
        [
            { $match : { Year : { "$ne" : "N/A"} } }, 
            {
                "$group": {
                    _id: "$Year",
                    Global_Sales: { "$sum": "$Global_Sales" },
                    NA_Sales: { "$sum": "$NA_Sales" },
                    EU_Sales: { "$sum": "$EU_Sales" },
                    JP_Sales: { "$sum": "$JP_Sales" }
                }
            },
            { "$sort": { "_id": 1 } }
        ],
        function (error, videogames) {
            handler.handleResponse(response, videogames, error);
        });
}