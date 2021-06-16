const express = require('express');// require the express package
const app = express(); // initialize your express app instance
const data = require('./data/weather.json');
const axios = require('axios');
require('dotenv').config();

const PORT = process.env.PORT;
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
const MOVIE_API_KEY = process.env.MOVIE_API_KEY;

const cors = require('cors');

app.use(cors()); // after you initialize your express app instance

// a server endpoint

// app.get('/weather', // our endpoint name
//   function (req, res) { // callback function of what we should do with our request

//     const resDataWeather = data.data.map( objDataWeather => new Weather(objDataWeather));
//     res.json(resDataWeather);// our endpoint function response
//   }
// );

app.get('/weather', (req, res) => {

  const lat = req.query.lat;
  const lon = req.query.lon;

  if (lat && lon) {
    const reqWeatherBit = `https://api.weatherbit.io/v2.0/forecast/daily?key=${WEATHER_API_KEY}&lat=${lat}&lon=${lon}`;

    axios.get(reqWeatherBit).then(response => {
      const responseDataWeatherBit = response.data.data.map(objWeatherBit => new Weather(objWeatherBit));
      res.json(responseDataWeatherBit)
    }).catch(error => {
      res.send('Something went wrong in reqWeatherBit :' + error.message)
    });
  } else {
    res.send('You did not provide the lat and lon')
  }


});

class Weather {
  constructor(dataForWeather) {
    this.descriptionWeather = dataForWeather.weather.description;
    this.dateWeather = dataForWeather.valid_date;
  }
}


app.get('/movies', (req, res) => {

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


});

class Movie {
  constructor(title, overview, vote_average, vote_count, poster_path, popularity, release_date) {
    this.title = title;
    this.overview = overview;
    this.vote_average = vote_average;
    this.vote_count = vote_count;
    this.poster_path = poster_path;
    this.popularity = popularity;
    this.release_date = release_date;
  }
}

app.listen(PORT, () => {
  console.log(`Server started : ${PORT}`);
});
