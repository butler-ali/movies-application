import sayHello from './hello';
import $ from "jQuery";
sayHello('World');



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
        $('.loader').hide();
        $('#display').show();
        $('#movies').html('');

        var tbodyEl = $('#movie-row');
        tbodyEl.html('');

        movies.forEach(function(movie) {  //Display all movies within json api
          $("#movie-row").append(
              "<div class='card-deck'>" +
              "<div class='card'>" +
              "<p id='delete-id'>" + movie.id + "</p>" +
              "<h2>" + movie.title + "</h2>" +
              "<h5 class='mb-3 text-center'>" + movie.rating + "</h5>" +
              "<button class='update-button btn btn-primary'>Update</button>" +
              "<button class='delete-button btn btn-primary'>Delete</button>"
              + "</div>"
              + "</div>"
          )
        });
      }
    });
}



                        //   <tr>\
                        //       <td class="id">' + movie.id + '</td>\
                        //     <td><input type="text" class="title" value="' + movie.title + '"></td>\
                        //     <td><input type="text" class="rating" value="' + movie.rating + '"></td>\
                        //     <td>\
                        //         <button class="update-button">UPDATE/PUT</button>\
                        //         <button class="delete-button">DELETE</button>\
                        //     </td>\
                        // </tr>\
                        //


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
  $('div').on('click', '.delete-button', function() {
    var rowEl = $(this).closest('div');
    var id = rowEl.find('#delete-id').text();

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






