const supertest = require('supertest');

const truncate = require('../../../testUtils/truncate');
const factories = require('../../../testUtils/factories');
const app = require('../../../app');

describe('userController Test Suit', () => {

    beforeEach( () => {
              
        return truncate();
    });

    it('should add a user on db', async () => {

        const response = await supertest(app).post('/users')
            .send({
                name: 'teste',
                email: 'teste@teste.com',
                password: 'bla123'
            });

        expect(response.status).toBe(200);
        expect(response.body.user.name).toBe('teste');
    });

    it('should not add a user with same email on db', async () => {

        await factories.create('User', {
            email: 'teste@teste.com'
        })

        const response = await supertest(app).post('/users')
            .send({
                name: 'teste',
                email: 'teste@teste.com',
                password: 'bla123'
            });

        expect(response.status).toBe(400);
        expect(response.body.message).toBe('email already in use');
    });
});