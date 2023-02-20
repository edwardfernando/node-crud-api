const app = require('../index');
const supertest = require('supertest');
const request = supertest(app);
const User = require('../models/users')

describe('GET /users', () => {
    it('should return a list of users', async () => {
        const users = [{id: 1, name: 'John'}]
        jest.spyOn(User, 'findAll').mockResolvedValue(users);

        const response = await request.get('/users');

        expect(response.status).toBe(200);
        expect(response.body.users).toEqual(users)
    });

    it('should handle errors', async () => {
        const error = new Error('Database error');
        jest.spyOn(User, 'findAll').mockRejectedValue(error);

        const response = await request.get('/users');

        expect(response.status).toBe(500);
        expect(response.body).toEqual({ error: 'Database error' });
    });
});