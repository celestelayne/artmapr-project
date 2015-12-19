/**************************
 * SERVER-SIDE JAVASCRIPT *
 **************************/

// require express in app
var express = require('express');
// generate a new express app
var app = express();

// serve static files from public folder
app.use(express.static(__dirname + '/public'));

/**********
 * DATABASE *
 **********/

 var arts = [];
   arts.push({
     _id: 1,
     artist: 'Aaron Siskind',
     classification: 'photograph',
     medium: 'gelatin silver print',
     title: 'Pleasures and Terrors of Levitation',
     image_src: 'https://s3-us-west-2.amazonaws.com/sfmomamedia/media/thumbs/collection_images/230897_zoom_2015-12-09T0537.jpg.850x850_q85.jpg'
   });
   arts.push({
     _id: 2,
     artist: 'Eugène Atget',
     classification: 'photograph',
     medium: 'printing-out paper print',
     title: 'Porte, vieille maison, 15 rue Servandoni',
     image_src: 'https://s3-us-west-2.amazonaws.com/sfmomamedia/media/thumbs/collection_images/248281_zoom_2015-11-21T0120.jpg.850x850_q85.jpg'
   });
   arts.push({
     _id: 3,
     artist: 'Mark Rothko',
     classification: 'painting',
     medium: 'oil on canvas',
     title: 'No. 14, 1960',
     image_src: 'http://dailyserving.com/wp-content/uploads/2013/07/BeyondBelief_12_Rothko_No.14.jpg'
   });

/**********
 * ROUTES *
 **********/

/* HTML Endpoints */

app.get('/', function homepage (req, res) {
  // root route
  res.sendFile(__dirname + '/views/index.html');
});

/* JSON API Endpoints */

  // GET request for all the arts
  app.get('/api/arts', function index(req, res){
    res.json({ arts: arts });
  });

  // GET request for one particular piece of art
  app.get('/api/arts/:id', function show(req, res){
    var artId = parseInt(req.params.id);
    console.log(artId);

    var foundArt = arts.filter(function (art){
      return art._id == artId;
    })[0];

    res.json(foundArt);
  });


/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(3000, function(){
  console.log('this thing works');
});
