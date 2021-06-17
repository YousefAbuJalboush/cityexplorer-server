class Weather {
  constructor(dataForWeather) {
    this.descriptionWeather = dataForWeather.weather.description;
    this.dateWeather = dataForWeather.valid_date;
  }
}

module.exports = Weather;
