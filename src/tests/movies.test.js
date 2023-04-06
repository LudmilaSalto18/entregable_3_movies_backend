const request = require('supertest')
const app = require('../app');
const Actor = require('../models/Actor');
const Director = require('../models/Director');
const Genre = require('../models/Genre');
require('../models')
let movieId;
test('POST/movies should create movies', async() => {
    const newMovies= {
        name: "Harry potter",
        image: "https://static.wikia.nocookie.net/esharrypotter/images/9/99/Harry_Potter_y_la_Piedra_Filosof%C3%A1l_%28DVD%29.png/revision/latest?cb=20110208175444",
        synopsis: 'harry goes to howgars',
        releaseYear: 2000
    }
    const res = await request(app).post('/movies').send(newMovies)
    movieId = res.body.id
    expect(res.statusCode).toBe(201)
    expect(res.body.name).toBe(newMovies.name)
})

test('GET/movies should get all movies', async () => {
    const res = await request(app).get('/movies')
    expect(res.statusCode).toBe(200)
    expect(res.body).toHaveLength(1)
})

test('PUT/movies/:id update', async () => {
    const movie = {
        name: 'Harry potter update'
    }
    const res = await request(app)
        .put(`/movies/${movieId}`)
        .send(movie)
    expect(res.statusCode).toBe(200)
    expect(res.body.name).toBe(movie.name)
})
test('POST/movies/:id/actors', async() => {
    const newActor= await Actor.create({
        firstName: 'Anne',
        lastName: "Hathaway",
        nationality: 'American',
        image: 'https://media.glamour.mx/photos/62b389eb60c09b56d0014c09/master/pass/anne_hathaway_rutina_de_skincare.jpg',
        birthday: 1987-11-12
    })
    const res = await request(app)
        .post(`/movies/${movieId}/actors`)
        .send([newActor.id])
    await newActor.destroy()
    expect(res.statusCode).toBe(200)
    expect(res.body).toHaveLength(1)
})

test('POST/movies/:id/ directors', async () => {
    const director= await Director.create({
        firstName: 'Anne',
        lastName: "Hathaway",
        nationality: 'American',
        image: 'https://media.glamour.mx/photos/62b389eb60c09b56d0014c09/master/pass/anne_hathaway_rutina_de_skincare.jpg',
        birthday: 1987-11-12
    })
    const res = await request(app)
        .post(`/movies/${movieId}/directors`)
        .send([director.id])
    await director.destroy()
    expect(res.statusCode).toBe(200)
    expect(res.body).toHaveLength(1)
})

test('POST/movies/:id/genres', async () => {
    const genre= await Genre.create({
        name: 'Terror'
    })
    const res = await request(app)
        .post(`/movies/${movieId}/genres`)
        .send([genre.id])
    await genre.destroy()
    expect(res.statusCode).toBe(200)
    expect(res.body).toHaveLength(1)
})
test('DELETE/movies/:id delete movies', async() => {
    const res = await request(app).delete(`/movies/${movieId}`)
    expect(res.statusCode).toBe(204)
})