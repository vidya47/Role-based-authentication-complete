var express  = require('express');
var app      = express();
var mongoose = require('mongoose');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cors = require('cors');

var databaseConfig = require('./config/database');
var router = require('./app/routes');

mongoose.connect(databaseConfig.url, { useMongoClient: true });

mongoose.connection.on('open', function() {

  app.listen(process.env.PORT || 8080);
  console.log('Mongo is connected!');
  console.log("App listening on port 8080");

  app.use(bodyParser.urlencoded({ extended: false })); // Parses urlencoded bodies
  app.use(bodyParser.json()); // Send JSON responses
  app.use(logger('dev')); // Log requests to API using morgan
  app.use(cors());

  var originsWhitelist = [
  'http://localhost:8100',      //this is my front-end url for development
  ];
  var corsOptions = {
    origin: function(origin, callback){
          var isWhitelisted = originsWhitelist.indexOf(origin) !== -1;
          callback(null, isWhitelisted);
    },
    credentials:true
  }
  //here is the magic
  app.use(cors(corsOptions));

  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
        return res.status(200).json({});
    }
    next();
});

  router(app);

});
