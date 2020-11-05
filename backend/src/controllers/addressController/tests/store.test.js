const supertest = require('supertest');

const truncate = require('../../../testUtils/truncate');
const factories = require('../../../testUtils/factories');
const app = require('../../../app');

describe('addressController Test Suit', () => {

    beforeEach( () => {
       
        return truncate();
    });

    it('should add a address to an user', async () => {

        const user = await factories.create('User');
        const token = user.generateToken();
        
        const response = await supertest(app).post(`/addresses`)
            .set('authorization', 'Bearer ' + token)
            .send({
                zipcode: '21119624',
                street: 'rua tal do tal',
                number: '15',
                neighborhood: 'halala',
                city: 'zuz du seu',
                state: 'sp',
            });

        expect(response.status).toBe(200);
        expect(parseInt(response.body.user_id)).toBe(user.id);
    });

    it('should return code 400 for "authorization is required"', async () => {
        
        const response = await supertest(app).post(`/addresses`)
            .send({
                zipcode: '21119624',
                street: 'rua tal do tal',
                number: '15',
                district: 'halala',
                city: 'zuz du seu',
                state: 'sp',
            });

        expect(response.status).toBe(400);
        expect(response.body.validation.keys[0]).toBe("authorization");
    });

    it('should return code 400 for "user not found"', async () => {

        const user = await factories.create('User');
        const token = user.generateToken();
        await user.destroy({ where: { id: user.id }});
        
        const response = await supertest(app).post(`/addresses`)
            .set('authorization', 'Bearer ' + token)
            .send({
                zipcode: '21119624',
                street: 'rua tal do tal',
                number: '15',
                neighborhood: 'halala',
                city: 'zuz du seu',
                state: 'sp',
            });

        expect(response.status).toBe(400);
        expect(response.body.message).toBe("user not found");
    });
});