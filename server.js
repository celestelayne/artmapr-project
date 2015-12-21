  /**************************
   * SERVER-SIDE JAVASCRIPT *
   **************************/

  // require express in app
  var express = require('express');
  // get parameters from POST requests
  var bodyParser = require('body-parser');
  var path = require('path');
  // read file from the file system and display contents on terminal
  var fs = require("fs");
  // make http calls
  var request = require('request');
  // var seeds = require('node-mongo-seeds');

  var db = require('./models');
  function db (req, res, next) {
    req.db = {
      Art: connection.model('Art', models.Art, 'arts')
    };
    return next();
  }

  // generate a new express app
  var app = express();
  var views = path.join(__dirname, 'views');

  app.use(bodyParser.urlencoded({extended: true}));
  app.use(express.static("node_modules"));
  // serve static files from public folder
  app.use(express.static('public'));

  /**********
   * DATABASE *
   **********/

   // var arts = [];
   //   arts.push({
   //     _id: 1,
   //     artist: 'Aaron Siskind',
   //     classification: 'photograph',
   //     medium: 'gelatin silver print',
   //     title: 'Pleasures and Terrors of Levitation',
   //     image_src: 'https://s3-us-west-2.amazonaws.com/sfmomamedia/media/thumbs/collection_images/230897_zoom_2015-12-09T0537.jpg.850x850_q85.jpg'
   //   });
   //   arts.push({
   //     _id: 2,
   //     artist: 'Eugène Atget',
   //     classification: 'photograph',
   //     medium: 'printing-out paper print',
   //     title: 'Porte, vieille maison, 15 rue Servandoni',
   //     image_src: 'https://s3-us-west-2.amazonaws.com/sfmomamedia/media/thumbs/collection_images/248281_zoom_2015-11-21T0120.jpg.850x850_q85.jpg'
   //   });
   //   arts.push({
   //     _id: 3,
   //     artist: 'Mark Rothko',
   //     classification: 'painting',
   //     medium: 'oil on canvas',
   //     title: 'No. 14, 1960',
   //     image_src: 'http://dailyserving.com/wp-content/uploads/2013/07/BeyondBelief_12_Rothko_No.14.jpg'
   //   });

  /**********
   * ROUTES *
   **********/

  /* HTML Endpoints */

  app.get('/', function homepage (req, res) {
    // root route
    res.sendFile(__dirname + '/views/index.html');
  });

  // GET all the arts from Socrata
  app.get('/arts/index', function(req, res){
    console.log("Requesting data from socrata...")
    request({
      method: 'GET',
      uri: 'https://data.sfgov.org/resource/zfw6-95su.json?$select=artist, location_1, created_at, title, geometry, medium&$limit=10'
    }, function(err, apiRes, apiBody){
      var sfdata = JSON.parse(apiBody);
      console.log(sfdata);
    }).pipe(fs.createWriteStream("seeds/sf_data.json"));
  })

  /* JSON API Endpoints */

  app.get('/api', function api_index(req, res){
    res.json({
      message: "Welcome to the ArtMapr API.",
      documentation_url: "https://github.com/celestelayne/artmapr-project",
      base_url: "",
      endpoints: [
        {method: "GET", path: "/api", description: "The GET endpoint does things"}
      ]
    });
  });

  // get data of all the arts from database
  app.get('/api/arts', function index(req, res){
    db.Art.find({}, function (err, arts) {
      res.status(200).json(arts);
    });
  });

  // create an art item
  app.post('/api/arts', function create(req, res){
    // create a new art item with form data (req.body)
    var newArtItem = new Art(req.body);
    console.log(newArtItem);

    // save the new art item to the database
    db.newArtItem.save(function(err, savedArt){
      res.json(savedArt);
    });
  });

  // get one art item
  app.get('/api/arts/:id', function show(req, res){
    // get the id from the params (req.params)
    var artId = req.params.id;
    // console.log(artId);

    db.Art.findOne({ _id: artId }, function(err, foundArt){
      // console.log(foundArt);
      res.json(foundArt);
    });
  });

  // https://github.com/sf-wdi-25/notes/tree/master/week-04-mongo-database/day-01-mongo/dawn-mongo
  // app.put update art item

  // app.delete delete art item

  /**********
   * SERVER *
   **********/

  // listen on port 3000
  app.listen(process.env.PORT || 3000, function(){
    console.log('Express server is running on http://localhost:3000/');
  });
