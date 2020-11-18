const supertest = require('supertest');

const truncate = require('../../../testUtils/truncate');
const factories = require('../../../testUtils/factories');
const app = require('../../../app');

describe('userController Test Suit', () => {

    beforeEach( () => {
              
        return truncate();
    });

    it('should list all users on db', async () => {

        const user = await factories.create('User');
        user.admin = true;
        const token = user.generateToken();

        for(let i=0; i < 3; i++){

            await factories.create('User', {
                email: `email${i}@teste.com`
            });
        }

        const response = await supertest(app).get('/users')
            .set('authorization', 'Bearer ' + token)
        ;
        
        expect(response.status).toBe(200);
        expect(Object.keys(response.body).length).toBe(4);
    });
});