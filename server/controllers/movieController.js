const movieModel = require('../models/movieModel.js');
const apiHelpers = require('../helpers/apiHelpers.js');
const { API_KEY } = require('../../config');
const axios = require('axios');
const request = require('request');

//Return requests to the client
module.exports = {
  getSearch: (req, res) => {
    var options = {
      method: 'GET',
      url: 'https://api.themoviedb.org/3/discover/movie',
      qs: {
        api_key: API_KEY,
        with_genres: req.body.genre_id,
        sort_by: 'vote_average.desc'
      },
      body: '{}'
    };
    request(options, function(error, response, body) {
      if (error) throw new Error(error);
      res.send(body);
    });
    // get the search genre

    // https://www.themoviedb.org/account/signup
    // get your API KEY

    // use this endpoint to search for movies by genres, you will need an API key

    // https://api.themoviedb.org/3/discover/movie

    // and sort them by horrible votes using the search parameters in the API
  },
  getGenres: (req, res) => {
    axios
      .get('https://api.themoviedb.org/3/genre/movie/list', {
        params: { api_key: API_KEY }
      })
      .then(results => {
        var data = results.data.genres;
        res.send(data);
        // data.map(genre => {
        //   var queryString = `insert into genre (genre_id, genre_name) values (${
        //     genre.id
        //   }, '${genre.name}')`;
        //   console.log(queryString);
        //   movieModel.query(queryString, (err, results) => {
        //     if (err) {
        //       console.log(err);
        //     } else {
        //       console.log(results);
        //     }
        //   });
        // });
      })
      .catch(err => {
        console.log(err);
      });
    // make an axios request to get the list of official genres
    // use this endpoint, which will also require your API key: https://api.themoviedb.org/3/genre/movie/list
    // send back
  },
  saveMovie: (req, res) => {},
  deleteMovie: (req, res) => {}
};
