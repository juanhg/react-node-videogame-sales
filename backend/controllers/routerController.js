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

addVideogameRoutes = function (router) {
    router.route('/videogames')
        .get(VideogamesController.findAll);
    router.route('/videogames/name/:filter')
        .get(VideogamesController.findByName)
    router.route('/videogames/platform/:filter')
        .get(VideogamesController.findByPlatform)
    router.route('/videogames/genre/:filter')
        .get(VideogamesController.findByGenre)
    router.route('/videogames/publisher/:filter')
        .get(VideogamesController.findByPublisher)
};