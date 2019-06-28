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
        with_genres: req.query.genre_id,
        sort_by: 'vote_average.desc'
      },
      body: '{}'
    };
    request(options, function(error, response, body) {
      if (error) throw new Error(error);
      res.status(200).send(body);
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
        res.status(200).send(data);
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
  getFaves: (req, res) => {
    movieModel.query(`select * from movies`, (err, results) => {
      if (err) {
        console.log(err);
        res.sendStatus(500);
      } else {
        console.log(results);
        var faves = [];
        results.map(rawdata => {
          faves.push({
            id: rawdata.movie_id,
            title: rawdata.movie_title,
            poster_path: rawdata.poster_path,
            release_date: rawdata.release_date,
            vote_average: rawdata.vote_average
          });
        });
        res.send(faves);
      }
    });
  },
  saveMovie: (req, res) => {
    var data = req.body.data;
    //search if movie exists
    movieModel.query(
      `select * from movies where movie_id = ?`,
      data.id,
      (err, results) => {
        if (err) {
          console.log(err);
          res.sendStatus(500);
        } else {
          if (results.length !== 0) {
            console.log('eisting:', results),
              res.status(304).send('Movie already exists');
          } else {
            movieModel.query(
              `
            INSERT INTO movies 
            (movie_id,movie_title,poster_path,release_date,vote_average) 
            values 
            (?,?,?,?,?)`,
              [
                data.id,
                data.title,
                data.poster_path,
                data.release_date,
                data.average_vote
              ],
              (err, data) => {
                if (err) {
                  console.log(err);
                  res.sendStatus(500);
                } else {
                  console.log('saved to my movielist');
                  res.sendStatus(201);
                }
              }
            );
          }
        }
      }
    );
  },
  deleteMovie: (req, res) => {
    var data = req.body;
    console.log(req);
    //search if movie exists
    movieModel.query(
      `select * from movies where movie_id = ?`,
      data.id,
      (err, results) => {
        if (err) {
          console.log(err);
          res.sendStatus(500);
        } else {
          if (results.length === 0) {
            console.log('not eisting'),
              res.status(404).send('Movie does not exist');
          } else {
            movieModel.query(
              `
            Delete from movies 
            where movie_id = ? `,
              [data.id],
              (err, data) => {
                if (err) {
                  console.log(err);
                  res.sendStatus(500);
                } else {
                  console.log('removed from my movielist');
                  res.sendStatus(204);
                }
              }
            );
          }
        }
      }
    );
  }
};
