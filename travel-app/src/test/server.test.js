const request = require('supertest');
import app from "../server/server"

describe('Test app', () => {
    test('It should response GET root', async () => {
        const response = await request(app).get('/');
        expect(response.statusCode).toBe(200);
    });
});