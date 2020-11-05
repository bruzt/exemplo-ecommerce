const supertest = require('supertest');
const { promisify } = require('util');
const exec = promisify(require('child_process').exec);

//const truncate = require('../../utils/truncate');
const factories = require('../../../testUtils/factories');
const app = require('../../../app');

describe('orderController Test Suit', () => {

    beforeEach( async () => {
       
        await exec('sequelize db:migrate:undo:all');

        return exec('sequelize db:migrate');
        //return truncate();
    });

    it('should show all orders from authenticated user', async () => {

        const user = await factories.create('User');
        const address = await factories.create('Address', { user_id: user.id });
        
        const token = user.generateToken();

        for(let i = 0; i < 2; i++){

            await factories.create('Order', {
                user_id: user.id,
                address_id: address.id
            });
        }

        const response = await supertest(app).get(`/orders`)
            .set('authorization', 'Bearer ' + token);

        expect(response.status).toBe(200);
        expect(response.body.length).toBe(2);
    });

    it('should return code 400 for "user not found" - index', async () => {

        const user = await factories.create('User');
        const token = user.generateToken();
        await user.destroy();

        const response = await supertest(app).get(`/orders`)
            .set('authorization', 'Bearer ' + token);

        expect(response.status).toBe(400);
        expect(response.body.message).toBe('user not found');
    });
});