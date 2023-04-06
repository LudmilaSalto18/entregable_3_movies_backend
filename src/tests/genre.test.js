const request = require('supertest')
const app = require('../app')
require('../models')
let genreId;

test('POST/genres should create genres', async () => {
    const newGenre = {
        name: 'Comedy'
    }
    const res = await request(app).post('/genres').send(newGenre)
    genreId = res.body.id;
    expect(res.statusCode).toBe(201)
    expect(res.body.name).toBe(newGenre.name)
})

test('GET/genres should get all genres', async() => {
    const res = await request(app).get('/genres')
    expect(res.statusCode).toBe(200)
    expect(res.body).toHaveLength(1)
})

test('/PUT/genres/:id update genres' , async ( ) => {
    const genre = {
        name: 'Comedy update'
    }
    const res = await request(app)
        .put(`/genres/${genreId}`)
        .send(genre)
    expect(res.status).toBe(200)
    expect(res.body.name).toBe(genre.name)
} )

test('/DELETE/genres/:id delete genres', async () => {
    const res = await request(app).delete(`/genres/${genreId}`)
    expect(res.status).toBe(204)
})