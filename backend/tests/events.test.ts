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
const event1 = {id: 1, ...newEvent1}

const newRating1 = {date: "2024-12-06T18:28:23.000Z", rating: 5, comment: "Zelo zabavno.", eventId: 1}
const rating1 = {id: 1, ...newRating1}

const newEquipment1 = {name: "Stol", description: "Udoben stol primeren za prireditve, predstave", cost: 10.50, pieces: 50, eventId: 1}
const equipment1 = {id: 1, ...newEquipment1}

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

    it("Should insert new rating", async () => {
        const response = await request(app).post("/api/events/1/ratings").send(newRating1);
        expect(response.status).toBe(201);
        expect(response.body).toEqual({id: 1})
    });

    it("Should return all ratings of event with id '1'", async () => {
        const response = await request(app).get("/api/events/1/ratings");
        expect(response.status).toBe(200);
        expect(response.body).toEqual([rating1])
    });

    it("Should update rating with id '1'", async () => {
        const response = await request(app).put('/api/events/ratings/1').send({...rating1, comment: "It was awesome."});
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ message: 'Ocena posodobljena', id: 1 });
    });

    it("Should delete rating with id '1'", async () => {
        const response = await request(app).delete('/api/events/ratings/1');
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ message: "Ocena uspešno izbrisana" });
    });
    
    it("Should insert new equipment to event with id '1'", async () => {
        const response = await request(app).post("/api/events/1/equipment").send(newEquipment1);
        expect(response.status).toBe(201);
        expect(response.body).toEqual({id: 1})
    });

    it("Should return all equipment of event with id '1'", async () => {
        const response = await request(app).get("/api/events/1/equipment");
        expect(response.status).toBe(200);
        expect(response.body).toEqual([equipment1])
    });

    it("Should return equipment with id '1'", async () => {
        const response = await request(app).get("/api/events/equipment/1");
        expect(response.status).toBe(200);
        expect(response.body).toEqual(equipment1)
    });

    it("Should update equipment with id '1'", async () => {
        const response = await request(app).put('/api/events/equipment/1').send({...equipment1, comment: "It was awesome."});
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ message: 'Oprema posodobljena', id: 1 });
    });

    it("Should delete equipment with id '1'", async () => {
        const response = await request(app).delete('/api/events/equipment/1');
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ message: "Oprema uspešno izbrisana" });
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
