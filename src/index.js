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

getMovies().then((movies) => {
  console.log('Here are all the movies:');
  movies.forEach(({title, rating, id}) => {
    // console.log(`id#${id} - ${title} - rating: ${rating}`);
    let html = `<div>Movie #${id} - ${title} - rating: ${rating} </div>`;
    $('#movies').append(html);
  });
}).catch((error) => {
  alert('Oh no! Something went wrong.\nCheck the console for details.')
  console.log(error);
});

<<<<<<< HEAD
=======

>>>>>>> 6e9f9235bbabd678a4a56e59db4473e51ae882f0
