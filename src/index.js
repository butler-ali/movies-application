import sayHello from './hello';
import $ from "jQuery";
sayHello('World');
const {getMovies} = require('./api.js');

<<<<<<< HEAD
//posting the new movies
=======

//posting the new movies
function newMovie(){
>>>>>>> d1383d23b7b866c820352c10279ea0bb28f4e4bd
  $('#submit').click(function (e) {
    e.preventDefault();

    //getting input values
    let movieTitle = $('#title').val();
    let movieRating = $('#rating').val();
<<<<<<< HEAD


=======
>>>>>>> d1383d23b7b866c820352c10279ea0bb28f4e4bd
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
<<<<<<< HEAD
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
=======
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

>>>>>>> d1383d23b7b866c820352c10279ea0bb28f4e4bd

  }
  moviesHTML();




