const Weather = require('../models/Weather.model');
const axios = require('axios');
require('dotenv').config();


const WEATHER_API_KEY = process.env.WEATHER_API_KEY;

 const weatherController = (req, res) => {

  const lat = req.query.lat;
  const lon = req.query.lon;

  if (lat && lon) {
    const reqWeatherBit = `https://api.weatherbit.io/v2.0/forecast/daily?key=${WEATHER_API_KEY}&lat=${lat}&lon=${lon}`;
    console.log(reqWeatherBit);
    axios.get(reqWeatherBit).then(response => {
      const responseDataWeatherBit = response.data.data.map(objWeatherBit => new Weather(objWeatherBit));
      res.json(responseDataWeatherBit);
    })
    .catch(error => {
      res.send('Something went wrong in reqWeatherBit :' + error.message)
    });
  } else {
    res.send('You did not provide the lat and lon')
  }


};

module.exports = weatherController;
