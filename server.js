const express = require('express');// require the express package
const app = express(); // initialize your express app instance
const data = require('./data/weather.json');
const axios = require('axios');
require('dotenv').config();

const PORT = process.env.PORT;
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;

const cors = require('cors');

app.use(cors()); // after you initialize your express app instance
app.options('*', cors());
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
      res.send('Something went wrong :' . error.message)
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

app.listen(PORT, () => {
  console.log(`Server started : ${PORT}`);
});
