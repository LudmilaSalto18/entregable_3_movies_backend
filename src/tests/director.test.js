const request = require('supertest')
const app = require('../app')
require('../models')
let directorId;

test('POST/directors crate', async () => {
    const newDirector = {
        firstName: 'Anne',
        lastName: "Hathaway",
        nationality: 'American',
        image: 'https://media.glamour.mx/photos/62b389eb60c09b56d0014c09/master/pass/anne_hathaway_rutina_de_skincare.jpg',
        birthday: 1987-11-12
    }
    const res = await request(app).post('/directors').send(newDirector)
    directorId = res.body.id
    expect(res.statusCode).toBe(201)
    expect(res.body.firstName).toBe(newDirector.firstName)
})

test('GET/directors get all directors', async () => {
    const res = await request(app).get('/directors')
    expect(res.statusCode).toBe(200)
    expect(res.body).toHaveLength(1)
})

test('PUT/directors/:id update directos', async () => {
    const director = {
        firstName: 'Anne update'
    }
    const res = await request(app)
        .put(`/directors/${directorId}`)
        .send(director)
    expect(res.statusCode).toBe(200)
    expect(res.body.firstName).toBe(director.firstName)
})

test('DELETE/directors delete director', async () => {
    const res = await request(app).delete(`/directors/${directorId}`)
    expect(res.statusCode).toBe(204)
})