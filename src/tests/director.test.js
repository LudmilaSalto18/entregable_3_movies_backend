const request = require("supertest")
const app = require("../app.js")
const Movie = require("../models/Movie");

 require('../models/Director.js')

let directorId;
test("POST /director should create one director", async () => {
    const newDirector = {
      firstName: "Quentin",
      lastName: "Tarantino",
      nationality: "United States",
      image:
        "https://m.media-amazon.com/images/M/MV5BMTgyMjI3ODA3Nl5BMl5BanBnXkFtZTcwNzY2MDYxOQ@@._V1_.jpg",
    birthday: "1963-03-27"
    };
    const res = await request(app).post("/directors").send(newDirector);
    directorId = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.firstName).toBe(directorId.firstName);
  });
  
  test("GET /directors should return all directors", async () => {
    const res = await request(app).get("/directors");
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
  });
  
  test("PUT /directors/:id should update one actor", async () => {
    const body = {
      firstName: "Quentin Tarantino updated",
    };
    const res = await request(app).put(`/directors/${directorId}`).send(body);
    expect(res.status).toBe(200);
    expect(res.body.firstName).toBe(body.firstName);
  });
  
 
  test("DELETE /directors/:id should delete one director", async () => {
    const res = await request(app).delete(`/directors/${directorId}`);
    expect(res.status).toBe(204);
  });
  