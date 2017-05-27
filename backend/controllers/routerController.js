var VideogamesController = require('./videogamesController');

// API routes

exports.initRouter = function (router) {
    addMainRoute(router);
    addVideogameRoutes(router);
};

addMainRoute = function (router) {
    router.get('/', function (req, res) {
        res.send("Hello World!");
    });
};

addVideogameRoutes = function(router) {
    router.route('/videogames')
        .get(VideogamesController.findAll);
};