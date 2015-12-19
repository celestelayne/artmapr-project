/**************************
 * CLIENT-SIDE JAVASCRIPT *
 **************************/

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

  $(document).ready(function(){
    console.log('Sanity Check: app.js is working!');

      getSfPublicArtData(arts);

  });

  function getSfPublicArtData(){
    var url = 'https://data.sfgov.org/resource/zfw6-95su.json?$limit=10';

    $.ajax({
      method: 'GET',
      url: url,
      dataType: 'json',
      success: function(data) {
        console.log(data.length);
          data.forEach(function(artItem){
            arts.push(artItem);

          });
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
