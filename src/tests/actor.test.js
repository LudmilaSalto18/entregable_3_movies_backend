const request = require('supertest')
const app = require('../app')
require('../models')

let actorId;

test('POTS/actors should create all actors', async () => {
    const newActor= {
        firstName: 'Anne',
        lastName: "Hathaway",
        nationality: 'American',
        image: 'https://media.glamour.mx/photos/62b389eb60c09b56d0014c09/master/pass/anne_hathaway_rutina_de_skincare.jpg',
        birthday: 1987-11-12
    }
    const res = await request(app).post('/actors').send(newActor)
    actorId = res.body.id
    expect(res.statusCode).toBe(201)
    expect(res.body.firstName).toBe(newActor.firstName)
})

test('GET/actors should get all actors', async () => {
    const res = await request(app).get('/actors')
    expect(res.statusCode).toBe(200)
    expect(res.body).toHaveLength(1)
})

test('PUT/actors update', async () => {
    const actor = {
        firstName: 'Anne update'
    }
    const res = await request(app)
        .put(`/actors/${actorId}`)
        .send(actor)
    expect(res.statusCode).toBe(200)
    expect(res.body.firstName).toBe(actor.firstName)

})

test('DELETE/ actors delete', async () => {
    const res = await request(app).delete(`/actors/${actorId}`)
    expect(res.statusCode).toBe(204)
})