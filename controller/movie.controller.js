const Movie = require('../models/Movie.model');
const MOVIE_API_KEY = process.env.MOVIE_API_KEY;
const axios = require('axios');
require('dotenv').config();


 const movieController =(req, res) => {

    const cityName = req.query.cityName;
    if (cityName) {
  
      const reqTheMovieDB = `https://api.themoviedb.org/3/search/movie?api_key=${MOVIE_API_KEY}&query=${cityName}`;
      axios.get(reqTheMovieDB).then(response => {
        const responseDataTheMovieDB = response.data.results.map( objTheMovieDB =>
            new Movie(objTheMovieDB.title, objTheMovieDB.overview, objTheMovieDB.vote_average, objTheMovieDB.vote_count, `https://image.tmdb.org/t/p/w500${objTheMovieDB.poster_path}`, objTheMovieDB.popularity, objTheMovieDB.release_date)
        );
        responseDataTheMovieDB.length == 0 ? res.json("No movies result") : res.json(responseDataTheMovieDB);
      }).catch(error => {
        res.send('Something went wrong in reqTheMovieDB :' + error.message)
      });
    } else {
      res.send('You did not provide the City Name')
    }
  
  
  };

  module.exports = movieController;
