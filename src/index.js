/**
 * es6 modules and imports
 */
import sayHello from './hello';
import $ from "jQuery";
sayHello('World');

/**
 * require style imports
 */
//ToDo: Make an ajax request to get a listing of all the movies

const {getMovies} = require('./api.js');

//posting the new movies
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

  function moviesHTML() {
    //After its done loading, changes the HTML
    getMovies().then((movies) => {
      $('#loading').html('');
  //For each movie adds the id, title, and rating to the html

      movies.forEach(({title, rating, id}) => {
        let html = `<div>Movie #${id} - ${title} - rating: ${rating} </div>`;
        $('#movies').append(html);
      });
    }).catch((error) => {
      alert('Oh no! Something went wrong.\nCheck the console for details.');
      console.log(error);
    });

  }
  moviesHTML();




