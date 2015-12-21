/**************************
 * CLIENT-SIDE JAVASCRIPT *
 **************************/

 var arts = [];

  //  arts.push({
  //    _id: 1,
  //    artist: 'Aaron Siskind',
  //    classification: 'photograph',
  //    medium: 'gelatin silver print',
  //    title: 'Pleasures and Terrors of Levitation',
  //    image_src: 'https://s3-us-west-2.amazonaws.com/sfmomamedia/media/thumbs/collection_images/230897_zoom_2015-12-09T0537.jpg.850x850_q85.jpg'
  //  });
  //  arts.push({
  //    _id: 2,
  //    artist: 'Eugène Atget',
  //    classification: 'photograph',
  //    medium: 'printing-out paper print',
  //    title: 'Porte, vieille maison, 15 rue Servandoni',
  //    image_src: 'https://s3-us-west-2.amazonaws.com/sfmomamedia/media/thumbs/collection_images/248281_zoom_2015-11-21T0120.jpg.850x850_q85.jpg'
  //  });
  //  arts.push({
  //    _id: 3,
  //    artist: 'Mark Rothko',
  //    classification: 'painting',
  //    medium: 'oil on canvas',
  //    title: 'No. 14, 1960',
  //    image_src: 'http://dailyserving.com/wp-content/uploads/2013/07/BeyondBelief_12_Rothko_No.14.jpg'
  //  });

  $(document).ready(function(){
    console.log('Sanity Check: app.js is working!');

      getSfPublicArtData(arts);

  });

  function getSfPublicArtData(){
    // var url = '../seeds/sf_data.json';
    var url = 'https://data.sfgov.org/resource/zfw6-95su.json?$select=artist, location_1, created_at, title, geometry, medium&$limit=10';
    $.ajax({
      method: 'GET',
      url: url,
      dataType: 'json',
      async: false,
      success: function(data) {
        // console.log(data);
        var lname, fname;
        for (var i = 1; i < data.length; i++){
          var artist = data[i].artist;
          lname = artist.split(',')[0];
          fname = artist.split(',')[1];
          // console.log(lname);
          // console.log(fname);
          arts.push({
            first_name: fname,
            last_name: lname,
            title: data[i].title,
            medium: data[i].medium
          });
        }
        console.log(arts);
        renderArt(arts);
      },
      error: function(){
        console.log('sad face');
      }
    });
  } // end of getSfPublicArtData function

  function renderArt(art) {
    console.log('rendering art: ', art);

    // handlebars template
    // get the template content
      var template = $('#artsTemplate').html();

    // compile the template data into a function
      var compiledTemplate = Handlebars.compile(template);
    // Render the data into the template
      var htmlFromCompiledTemplate = compiledTemplate({ art: art });

    // Overwrite the contents of #arts with rendered html back to document
      $('#arts').append( htmlFromCompiledTemplate );
  }
