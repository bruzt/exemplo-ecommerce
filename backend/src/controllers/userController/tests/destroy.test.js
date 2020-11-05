const supertest = require('supertest');

const truncate = require('../../../testUtils/truncate');
const factories = require('../../../testUtils/factories');
const app = require('../../../app');

describe('userController Test Suit', () => {

    beforeEach( () => {
              
        return truncate();
    });

    it('should erase a user from db', async () => {

        const user = await factories.create('User');
        const token = user.generateToken();

        const response = await supertest(app).delete('/users')
            .set('authorization', 'Bearer ' + token);
        
        expect(response.status).toBe(200);
    });

    it('should return code 400 for "user not found"', async () => {

        const user = await factories.create('User');
        const token = user.generateToken();
        await user.destroy({ where: { id: user.id }});

        const response = await supertest(app).delete('/users')
            .set('authorization', 'Bearer ' + token);
        
        expect(response.status).toBe(400);
    });
});