/**************************
 * SERVER-SIDE JAVASCRIPT *
 **************************/

// require express in app
var express = require('express');

var db = require('./models');
function db (req, res, next) {
  req.db = {
    Art: connection.model('Art', models.Art, 'arts')
  };
  return next();
}

// generate a new express app
var app = express();

// serve static files from public folder
app.use(express.static(__dirname + '/public'));

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
