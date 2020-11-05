const supertest = require('supertest');

const truncate = require('../../../testUtils/truncate');
const factories = require('../../../testUtils/factories');
const app = require('../../../app');

describe('userController Test Suit', () => {

    beforeEach( () => {
              
        return truncate();
    });

    it('should show a specific user on db', async () => {

        const user = await factories.create('User');
        
        const response = await supertest(app).get(`/users/${user.id}`);

        expect(response.status).toBe(200);
        expect(user.id).toBe(response.body.id);
    });

    it('should return code 400 for "user not found"', async () => {
        
        const response = await supertest(app).get(`/users/22`);

        expect(response.status).toBe(400);
        expect(response.body.message).toBe("user not found");
    });

    it('should return code 400 for "id must be a number"', async () => {
        
        const response = await supertest(app).get(`/users/j`);

        expect(response.status).toBe(400);
        expect(response.body.validation.keys[0]).toBe("id");
    });
});