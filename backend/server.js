var express = require("express");  
var app = express();
var bodyParser  = require("body-parser");
var methodOverride = require("method-override");
var mongoose = require('mongoose');
var routerController = require("./controllers/routerController");
var router = express.Router();

app.use(bodyParser.urlencoded({ extended: false }));  
app.use(bodyParser.json());  
app.use(methodOverride());

routerController.initRouter(router);

app.use('/api', router);  
app.use(router);

mongoose.connect('mongodb://localhost/videogamesdb', function(error, res) {  
  if(error) {onError(error)};
  initServer(app);
});

onError = function(error){
    console.log('ERROR: connecting to Database. ' + error);
};

initServer = function(app){
  app.listen(3000, function() {
    console.log("Node server running on http://localhost:3000");
  });
};