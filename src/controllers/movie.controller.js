const catchError = require('../utils/catchError');
const Movie = require('../models/Movie');
const Genre = require('../models/Genre');
const Actor = require('../models/Actor');
const Director = require('../models/Director');
const getAll = catchError(async(req, res) => {
    const results = await Movie.findAll({include: [Genre, Actor, Director]});
    return res.json(results);
});

const create = catchError(async(req, res) => {
    const result = await Movie.create(req.body);
    return res.status(201).json(result);
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Movie.findByPk(id);
    if(!result) return res.sendStatus(404);
    return res.json(result);
});

const remove = catchError(async(req, res) => {
    const { id } = req.params;
    await Movie.destroy({ where: {id} });
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Movie.update(
        req.body,
        { where: {id}, returning: true }
    );
    if(result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});

const setMovieGenre = catchError(async(req,res) =>{
    const {id} = req.params;
    const genres = await Movie.findByPk(id)
    await genres.setGenres(req.body);
    const movie = await genres.getGenres()
    return res.json(movie)
})

const setMovieActor = catchError(async(req, res) =>{
    const {id} = req.params;
    const actors = await Movie.findByPk(id);
    await actors.setActors(req.body);
    const movies = await actors.getActors()
    return res.json(movies)
})

const setMovieDirector = catchError(async(req, res ) => {
    const {id} = req.params;
    const directors = await Movie.findByPk(id)
    await directors.setDirectors(req.body);
    const movie = await directors.getDirectors()
    return res.json(movie)
    
})
module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update,
    setMovieGenre,
    setMovieActor,
    setMovieDirector
}