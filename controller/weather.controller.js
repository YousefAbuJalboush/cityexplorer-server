const Weather = require('../models/Weather.model');
const Cache = require('../helper/cache');
const axios = require('axios');
require('dotenv').config();


const WEATHER_API_KEY = process.env.WEATHER_API_KEY;

const weatherCacheObj = new Cache();

const weatherController = (req, res) => {



  const lat = req.query.lat;
  const lon = req.query.lon;
  const weatherCacheKey = `weatherCacheData-${lat}-${lon}`;
  
  if (lat && lon) {

    if (weatherCacheObj[weatherCacheKey] && (Date.now() - weatherCacheObj[weatherCacheKey].timestamp < 43200000) ) {

      res.json(weatherCacheObj[weatherCacheKey]);
      
    } else {

      const reqWeatherBit = `https://api.weatherbit.io/v2.0/forecast/daily?key=${WEATHER_API_KEY}&lat=${lat}&lon=${lon}`;
      axios.get(reqWeatherBit).then(response => {
        const responseDataWeatherBit = response.data.data.map(objWeatherBit => new Weather(objWeatherBit));

        weatherCacheObj[weatherCacheKey] = responseDataWeatherBit;

        weatherCacheObj[weatherCacheKey].timestamp = Date.now();
        
        res.json(responseDataWeatherBit);
      })
        .catch(error => {
          res.send('Something went wrong in reqWeatherBit :' + error.message);
        });

    }

  } else {

    res.send('You did not provide the lat and lon');

  }


};

module.exports = weatherController;
