import request from "supertest";
import { app } from "../app";
import { Server } from "http";

let server: Server;

beforeAll(() => { //Before tests
    server = app.listen();
  });

afterAll((done) => { //Close the server after all tests
  server.close(done);
});

const newEvent1 = {name: "Tek", description: "Tek na 100m.", date: "2024-12-05T14:15:00.000Z", location: "Ljubljana", organizer: "Viktor Felc"}
const newEvent2 = {name: "Ples", description: "Slavnostni ples.", date: "2024-12-15T18:00:00.000Z", location: "Maribor", organizer: "Viktor Felc"}

const event1 = {id: 1, ...newEvent1}
const event2 = {id: 2, ...newEvent2}

describe("Events API" , () => { // Tests in a describe block run sequentially. Tests in different describe blocks run concurently
    it("Should return all events as empty array", async () => {
        const response = await request(app).get("/api/events");
        expect(response.status).toBe(200)
        expect(response.body).toEqual([])
    });

    it("Should insert new event", async () => {
        const response = await request(app).post("/api/events").send(newEvent1);
        expect(response.status).toBe(201);
        expect(response.body).toEqual({id: 1})
    });

    it("Should return all events", async () => {
        const response = await request(app).get("/api/events");
        expect(response.status).toBe(200);
        expect(response.body).toEqual([event1])
    })

    it("Should update event with id '1'", async () => {
        const response = await request(app).put('/api/events/1').send({...event1, location: "Celje"});
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ message: 'Dogodek posodobljen in obvestila poslana', id: 1 });
    });
    
    it("Should return all events", async () => {
        const response = await request(app).get("/api/events");
        expect(response.status).toBe(200);
        expect(response.body).toEqual([{...event1, location: "Celje"}])
    })

    it("Should create user and register him to event with id '1'", async () => {
        const newUser1 = {username: "Marko", password: "abcde123", fullName: "Marko Petek", role: "employee"}
        const userResponse = await request(app).post("/api/users").send(newUser1);
        expect(userResponse.status).toBe(201);
        expect(userResponse.body).toEqual({id: 1})

        const response = await request(app).post("/api/events/register").send({event_id: 1, user_id: 1});
        expect(response.status).toBe(201);
        expect(response.body).toEqual({message: 'Prijava uspešna', id: 1})
    });

    it("Should unregister user with id '1' from event with id '1'", async () => {
        const userResponse = await request(app).post("/api/events/deregister/1").send({userId: 1});
        expect(userResponse.status).toBe(200);
        expect(userResponse.body).toEqual({message: 'Odjava uspešna'})
    });
    
    it("Should delete event with id '1'", async () => {
        const response = await request(app).delete('/api/events/1');
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ message: "Dogodek uspešno izbrisan" });
    });

    it("Should return all events as empty array", async () => {
        const response = await request(app).get("/api/events");
        expect(response.status).toBe(200)
        expect(response.body).toEqual([])
    });
});
