const request = require('supertest')
const app = require('../app');
const Movie = require('../models/Movie');
const Genre = require('../models/Genre');
const Actor = require('../models/Actor');
const Director = require('../models/Director');
require('../models')
let movieId;
let genreId
test("POST/ moviesshould create one movie", async () => {
    const newMovie = Movie.create ( {
        name: "Freaky Fryday",
        image: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcShO_K7CpY_xIEo2PcVsPgl1hCNoZ0ocWPOFHJ6H1IzubHECk3Y",
        synopsis: "Dos galletas de la suerte provocan que una psicoterapeuta comprometida y su hija adolescente intercambien mágicamente sus cuerpos.",
        releaseYear: "2003-01-12"
    })

    const res = await request(app)      
        .pos('/movies').send(newMovie)
    movieId = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.name).toBe(newMovie.name);
})

test ('GET /movies should return all actors', async () => {
    const res = await request(app).get('movies')
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
}) 


test("PUT movies/:id should update one movie", async () => {
    const body = {
      name: "Movie updated",
    };
    const res = await request(app).put(`/movies/${movieId}`).send(body);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(body.name);
  });


  test("DELETE /movies/:id should delete movie arctor", async () => {
    const res = await request(app).delete(`/movies/${movieId}`);
    expect(res.status).toBe(204);
  });


  test("POST /movies/:id/genres should set the genre movies", async () => {
    const genres  = await Genre.create({
      name: "Romance",
    });
    const res = await request(app)
      .post(`/movies/${genreId}/genres`)
      .send([genres.id]);
    await genres.destroy();
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
  });


  test("POST /movies/:id/actors should set the genre movies", async () => {
    const actor  = await Actor.create({
        firstName: "Brad",
        lastName: "Pitt",
        nationality: "United States",
        image:
          "https://media.architecturaldigest.com/photos/64249dbb5b98a5c5b21bc25d/16:9/w_2560%2Cc_limit/GettyImages-1469289926.jpg",
      birthday: "1963-12-18"
    });
    const res = await request(app)
      .post(`/movies/${movieId}/actors`)
      .send([actor.id]);
    await actor.destroy();
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
  });

  
  test("POST /movies/:id/ directos should set the directors movies", async () => {
    const director  = await Director.create({
        firstName: "Quentin",
        lastName: "Tarantino",
        nationality: "United States",
        image:
          "https://m.media-amazon.com/images/M/MV5BMTgyMjI3ODA3Nl5BMl5BanBnXkFtZTcwNzY2MDYxOQ@@._V1_.jpg",
      birthday: "1963-03-27"
    });
    const res = await request(app)
      .post(`/movies/${movieId}/directors`)
      .send([director.id]);
    await director.destroy();
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
  });
