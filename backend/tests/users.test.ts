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

const newUser1 = {username: "Marko", password: "abcde123", fullName: "Marko Petek", role: "management"}
const user1 = {id: 1, ...newUser1}

describe("User API" , () => { // Tests in a describe block run sequentially. Tests in different describe blocks run concurently
    it("Should return all users as empty array", async () => {
        const response = await request(app).get('/api/users');
        expect(response.status).toBe(200)
        expect(response.body).toEqual([])
    });

    it("Should insert new user", async () => {
        const response = await request(app).post('/api/users').send(newUser1);
        expect(response.status).toBe(201);
        expect(response.body).toEqual({id: 1});
    });

    it("Should return all users", async () => {
        const response = await request(app).get('/api/users');
        expect(response.status).toBe(200)
        expect(response.body).toEqual([user1])
    });

    it("Should fail login user because of wrong password", async () => {
        const response = await request(app).post('/api/users/login').send({username: user1.username, password: "wrongPassword"});
        expect(response.status).toBe(400);
        expect(response.body).toEqual({error: "Wrong credentials"});
    });

    it("Should login user", async () => {
        const response = await request(app).post('/api/users/login').send({username: user1.username, password: user1.password});
        expect(response.status).toBe(200);
        expect(response.body).toEqual(user1);
    });

    it("Should update user with id '1'", async () => {
        const response = await request(app).put('/api/users/1').send({...user1, fullName: "Florijan Petek"});
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ message: 'Uporabnik posodobljen!', id: 1});
    });
    
    it("Should return all users", async () => {
        const response = await request(app).get('/api/users');
        expect(response.status).toBe(200)
        expect(response.body).toEqual([{...user1, fullName: "Florijan Petek"}])
    });
    
    it("Should delete user with id '1'", async () => {
        const response = await request(app).delete('/api/users/1');
        expect(response.status).toBe(200);
        expect(response.body).toEqual({ message: "Uporabnik uspešno izbrisan" });
    });

    it("Should return empty array", async () => {
        const response = await request(app).get('/api/users');
        expect(response.status).toBe(200)
        expect(response.body).toEqual([])
    });
});
