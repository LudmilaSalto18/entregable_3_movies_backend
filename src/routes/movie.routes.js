const { getAll, create, getOne, remove, update, setMovieGenre, setMovieActor, setMovieDirector } = require('../controllers/movie.controller');
const express = require('express');

const movieRouter = express.Router();

movieRouter.route('/')
    .get(getAll)
    .post(create);

movieRouter.route('/:id')
    .get(getOne)
    .delete(remove)
    .put(update);

movieRouter.route('/:id/genres')
    .post(setMovieGenre)

movieRouter.route('/:id/actors')
    .post(setMovieActor)

movieRouter.route('/:id/directors')
    .post(setMovieDirector)
module.exports = movieRouter;