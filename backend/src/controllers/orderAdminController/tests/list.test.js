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

    it('it should list all orders', async () => {

        const user = await factories.create('User');
        const address = await factories.create('Address', { user_id: user.id });
        const category = await factories.create('Category');
        const product1 = await factories.create('Product', { category_id: category.id });
        const product2 = await factories.create('Product', { category_id: category.id });
        await factories.create('Order', { 
            user_id: user.id, 
            address_id: address.id, 
            products_id: [product1.id]  
        });
        await factories.create('Order', { 
            user_id: user.id, 
            address_id: address.id, 
            products_id: [product2.id]  
        });

        user.admin = true;
        const token = user.generateToken();

        const response = await supertest(app).get(`/admin/orders`)
            .set('authorization', 'Bearer ' + token);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('count');
        expect(response.body).toHaveProperty('orders');
        expect(response.body.orders).toHaveLength(2);
    });
});