const Actor = require("./Actor");
const Director = require("./Director");
const Genre = require("./Genre");
const Movie = require("./Movie");

Movie.belongsToMany(Genre,{through: 'moviesandGenre'})
Genre.belongsToMany(Movie, {through: 'moviesandGenre'})

Movie.belongsToMany(Actor, {through: "actorsAndMovies"}),
Actor.belongsToMany(Movie,{through: "actorsAndMovies" })

Movie.belongsToMany(Director, {through: "movieAndDirector"})
Director.belongsToMany(Movie,{through:  "movieAndDirector" })