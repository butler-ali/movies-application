import sayHello from './hello';
import $ from "jQuery";
sayHello('World');
const {getMovies} = require('./api.js');


//posting the new movies
function newMovie(){
  $('#submit').click(function (e) {
    e.preventDefault();

    //getting input values
    let movieTitle = $('#title').val();
    let movieRating = $('#rating').val();
    const moviePost = {"title": movieTitle, "rating": movieRating};
    const url = '/api/movies';
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(moviePost),
    };
    fetch(url, options)
        .then(
            $('#movies').html(''),
            moviesHTML()
        )
        .catch(/* handle errors */);
  });
}

function editMovie(){
  $('#editMovie').click(function (e) {
    e.preventDefault();
    console.log(('Hello this is a test for the edit movie'));
    //getting input values
    let movieTitle = $('#title').val();
    let movieRating = $('#rating').val();
    const moviePost = {"title": movieTitle, "rating": movieRating};
    const url = '/api/movies';
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(moviePost),
    };
    fetch(url, options)
        .then(
            $('#movies').html(''),
            moviesHTML()
        )
        .catch(/* handle errors */);
  });
}


function moviesHTML(){
  //After its done loading, changes the HTML
  getMovies().then((movies) => {
    $('#loading').html('');

//For each movie adds the id, title, and rating to the html

    movies.forEach(({title, rating, id}) => {
      let html = `<div id="card"><p>Movie #${id} - ${title} - rating: ${rating}</p> 
      <br><button type="button" id="editMovie">Edit</button><br><button type="button" id="deleteMovie">Delete</button></div>`;

      $('#movies').append(html);
    });
  }).catch((error) => {
    alert('Oh no! Something went wrong.\nCheck the console for details.');
    console.log(error);
  });

}

// $("#deleteMovie").click(function () {
//   $(this).parent.remove(movies.title);
//   getMovies()
// });


moviesHTML();




