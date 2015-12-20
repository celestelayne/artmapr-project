  // run 'node seed.js' from the root folder

  var db = require('./models');

  var artsList = [
    {
      artist: 'Aaron Siskind',
      classification: 'photograph',
      medium: 'gelatin silver print',
      title: 'Pleasures and Terrors of Levitation',
      image_src: 'https://s3-us-west-2.amazonaws.com/sfmomamedia/media/thumbs/collection_images/230897_zoom_2015-12-09T0537.jpg.850x850_q85.jpg'
    },
    {
      artist: 'Eugène Atget',
      classification: 'photograph',
      medium: 'printing-out paper print',
      title: 'Porte, vieille maison, 15 rue Servandoni',
      image_src: 'https://s3-us-west-2.amazonaws.com/sfmomamedia/media/thumbs/collection_images/248281_zoom_2015-11-21T0120.jpg.850x850_q85.jpg'
    },
    {
      artist: 'Mark Rothko',
      classification: 'painting',
      medium: 'oil on canvas',
      title: 'No. 14, 1960',
      image_src: 'http://dailyserving.com/wp-content/uploads/2013/07/BeyondBelief_12_Rothko_No.14.jpg'
    }
  ];

  db.Art.remove({}, function(err, arts){

    db.Art.create(artsList, function(err, arts){
      if (err) { return console.log('ERROR', err); }
      console.log('all arts: ', arts);
      // console.log('created', arts.length, 'arts');
      process.exit();
    });

  });
