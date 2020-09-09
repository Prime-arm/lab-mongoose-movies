const express = require('express');
const router  = express.Router();
const Movie = require('../models/Movie');

router.get('/movies', (req, res, next) => {
    
    Movie.find().then(moviesFromDB => {
      console.log('This is movies',moviesFromDB);
      res.render('movies/index', { moviesList: moviesFromDB})
    })
    .catch(error => {
        console.log(error);
    })
  });

  router.get('/movies/add', (req, res) => {
    res.render('movies/moviesForm')
  });

router.get('/movies/:id', (req, res) => {
    const id = req.params.id
    Movie.findById(id).then(movieFromDB => {
      res.render('movies/movieDetails', { movie: movieFromDB });
    })
    .catch(error => {
        console.log(error);
    })
  });

  router.post('/movies', (req, res) => {
    const {title, genre, plot} = req.body;
    Movie.create({
      title: title,
      genre: genre,
      plot: plot,
    //   cast: cast,
    }).then(movie => {
      console.log(`new Movie is here: ${movie}`);
      res.redirect(`/movies/${movie._id}`)
    }). catch(error => {
      console.log(error);
    })
  });

  module.exports = router;