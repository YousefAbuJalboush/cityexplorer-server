const Movie = require('../models/Movie.model');
const Cache = require('../helper/cache');
const axios = require('axios');
require('dotenv').config();

const MOVIE_API_KEY = process.env.MOVIE_API_KEY;

const cityCacheObj = new Cache();


const movieController = (req, res) => {


  const cityName = req.query.cityName;
  const cityCacheKey = `cityName-${cityName}`;

  if (cityName) {


    if (cityCacheObj[cityCacheKey] && (Date.now() - cityCacheObj[cityCacheKey].timestamp < 43200000)) {

      res.json(cityCacheObj[cityCacheKey]);

      console.log(cityCacheObj[cityCacheKey]);

    } else {

      const reqTheMovieDB = `https://api.themoviedb.org/3/search/movie?api_key=${MOVIE_API_KEY}&query=${cityName}`;

      axios.get(reqTheMovieDB).then(response => {
        const responseDataTheMovieDB = response.data.results.map(objTheMovieDB =>
          new Movie(objTheMovieDB.title, objTheMovieDB.overview, objTheMovieDB.vote_average, objTheMovieDB.vote_count, `https://image.tmdb.org/t/p/w500${objTheMovieDB.poster_path}`, objTheMovieDB.popularity, objTheMovieDB.release_date)
        );

        cityCacheObj[cityCacheKey] = responseDataTheMovieDB;

        cityCacheObj[cityCacheKey].timestamp = Date.now();

        responseDataTheMovieDB.length == 0 ? res.json("No movies result") : res.json(responseDataTheMovieDB);
      }).catch(error => {
        res.send('Something went wrong in reqTheMovieDB :' + error.message)
      });
    }

  } else {
    res.send('You did not provide the City Name')
  }


};

module.exports = movieController;
