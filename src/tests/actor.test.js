const request = require("supertest")
const app = require("../app.js")
const Movie = require("../models/Movie");
const Genre = require("../models/Genre");
const Actor = require ("../models/Actor.js")

let actorId;
test("POST /artors should create one artor", async () => {
    const newArtor = {
      firstName: "Brad",
      lastName: "Pitt",
      nationality: "United States",
      image:
        "https://media.architecturaldigest.com/photos/64249dbb5b98a5c5b21bc25d/16:9/w_2560%2Cc_limit/GettyImages-1469289926.jpg",
    birthday: "1963-12-18"
    };
    const res = await request(app).post("/actors").send(newArtor);
    actorId = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.firstName).toBe(newArtor.firstName);
  });
  
  test("GET /actors should return all actors", async () => {
    const res = await request(app).get("/actors");
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
  });
  
  test("PUT /actors/:id should update one actor", async () => {
    const body = {
      firstName: "Bradd Piit updated",
    };
    const res = await request(app).put(`/actors/${actorId}`).send(body);
    expect(res.status).toBe(200);
    expect(res.body.firstName).toBe(body.firstName);
  });
  
 
  
  test("DELETE /actors/:id should delete one arctor", async () => {
    const res = await request(app).delete(`/actors/${actorId}`);
    expect(res.status).toBe(204);
  });
  