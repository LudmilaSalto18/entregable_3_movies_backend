const request = require("supertest")
const app = require("../app")
const Genre = require("../models/Genre");
const Movie = require("../models/Movie");

let movieId; 
test("POST /genres should create one genre", async () => {
    const newGenre = {
      name: "rock",
    };
    const res = await request(app).post("/genres").send(newGenre);
    genreId = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.name).toBe(newGenre.name);
  });
  
  test("GET /genres should return all genres", async () => {
    const res = await request(app).get("/genres");
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
  });
  
  test("PUT /genres/:id should update one genre", async () => {
    const body = {
      name: "rock updated",
    };
    const res = await request(app).put(`/genres/${genreId}`).send(body);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(body.name);
  });
  
  test("POST /genres/:id/movies should set the genre movies", async () => {
    const movie  = await Movie.create({
      name: "Avengers",
      releaseYear: 2012,
      synopsis: "El director de la Agencia SHIELD decide reclutar a un equipo para salvar al mundo de un desastre casi seguro cuando un enemigo inesperado surge como una gran amenaza para la seguridad mundial.",
      country: "United States",
      image:
        "https://lumiere-a.akamaihd.net/v1/images/the_avengers_2012_poster_july_disney_plus_drops_d4bd9c6e.png",
    });
    const res = await request(app)
      .post(`/genres/${genreId}/movies`)
      .send([movie.id]);
    await movie.destroy();
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
  });
  
  test("DELETE /genres/:id should delete one genre", async () => {
    const res = await request(app).delete(`/genres/${genreId}`);
    expect(res.status).toBe(204);
  });