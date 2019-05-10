/**
 * es6 modules and imports
 */
import sayHello from './hello';
import $ from "jQuery";
sayHello('World');
//
const {getMovies} = require('./api.js');
//
// //posting the new movies
// // function newMovie(){
//   $('#submit').click(function (e) {
//     e.preventDefault();
//
//     //getting input values
//     let movieTitle = $('#title').val();
//     let movieRating = $('#rating').val();
//     const moviePost = {"title": movieTitle, "rating": movieRating};
//     const url = '/api/movies';
//     const options = {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(moviePost),
//     };
//     fetch(url, options)
//         .then(
//             $('#movies').html(''),
//             moviesHTML()
//         )
//         .catch(/* handle errors */);
//   });
// // }
//
// function editMovie(){
//   $('#editMovie').click(function (e) {
//     e.preventDefault();
//     console.log(('Hello this is a test for the edit movie'));
//     //getting input values
//     let movieTitle = $('#title').val();
//     let movieRating = $('#rating').val();
//     const moviePost = {"title": movieTitle, "rating": movieRating};
//     const url = '/api/movies';
//     const options = {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(moviePost),
//     };
//     fetch(url, options)
//         .then(
//             $('#movies').html(''),
//             moviesHTML()
//         )
//         .catch(/* handle errors */);
//   });
// }
//
// function moviesHTML(){
//   //After its done loading, changes the HTML
//   getMovies().then((movies) => {
//     $('#loading').html('');
//
// /**
//  * require style imports
//  */
// //ToDo: Make an ajax request to get a listing of all the movies
//
// const {getMovies} = require('./api.js');
//
// getMovies().then((movies) => {
//   console.log('Here are all the movies:');
//   movies.forEach(({title, rating, id}) => {
//     // console.log(`id#${id} - ${title} - rating: ${rating}`);
//     let html = `<div>Movie #${id} - ${title} - rating: ${rating} </div>`;
//     $('#movies').append(html);
//   });
// }).catch((error) => {
//   alert('Oh no! Something went wrong.\nCheck the console for details.')
//   console.log(error);
// });
//
// }
//
//   moviesHTML();
$('#display').hide();
$(function() {
  // GET/READ
  // ajax request to get a listing of all the movies
  // remove the "loading..." message and replace it with html generated from the json response your code
  function showMovies(){
    $.ajax({
      url: 'api/movies',
      contentType: 'application/json',
      success: function(movies) {
        // console.log(movies);
        $('#display').show();
        $('#movies').html('');

        var tbodyEl = $('tbody');
        tbodyEl.html('');

        movies.forEach(function(movie) {  //Display all movies within json api
          tbodyEl.append('\
                        <tr>\
                            <td class="id">' + movie.id + '</td>\
                            <td><input type="text" class="title" value="' + movie.title + '"></td>\
                            <td><input type="text" class="rating" value="' + movie.rating + '"></td>\
                            <td>\
                                <button class="update-button">UPDATE/PUT</button>\
                                <button class="delete-button">DELETE</button>\
                            </td>\
                        </tr>\
                    ');
        });
      }
    });
}
  showMovies();

  // CREATE/POST
  //Allow users to add new movies
  $('#create-form').on('submit', function(event) {
    event.preventDefault();

    // getting input values
    let createTitle = $('#create-title').val();
    let createRating = $('#create-rating').val();
    const moviePost = {"title": createTitle, "rating": createRating};

    $.ajax({
      url: 'api/movies',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(moviePost),
      success: function(response) {
        console.log(response);
        //clear the input fields
        $('#create-title').val(' ');
        $('#create-rating').val(' ');
        //display with the new movie
        showMovies();
      }
    });
  });

  // UPDATE/PUT
  //Allow users to edit existing movies
  $('table').on('click', '.update-button', function() {

    //selecting movie description
    let rowEl = $(this).closest('tr');
    let id = rowEl.find('.id').text();
    let newTitle = rowEl.find('.title').val();
    let newRating = rowEl.find('.rating').val();
    const editedMovie = {"title": newTitle, "rating": newRating};

    $.ajax({
      url: 'api/movies/' + id,            //select movie by id on json server
      method: 'PUT',
      contentType: 'application/json',
      data: JSON.stringify(editedMovie),
      success: function(response) {
        console.log(response);
        showMovies();
      }
    });
  });

  // DELETE
  //Delete movies
  $('table').on('click', '.delete-button', function() {
    var rowEl = $(this).closest('tr');
    var id = rowEl.find('.id').text();

    $.ajax({
      url: 'api/movies/' + id,
      method: 'DELETE',
      contentType: 'application/json',
      success: function(response) {
        console.log(response);
        showMovies();
      }
    });
  });
});





