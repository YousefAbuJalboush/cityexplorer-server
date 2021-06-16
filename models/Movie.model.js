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

  module.exports = Movie;
