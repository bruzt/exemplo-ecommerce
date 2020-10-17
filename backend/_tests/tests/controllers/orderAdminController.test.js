const supertest = require('supertest');
const { promisify } = require('util');
const exec = promisify(require('child_process').exec);

//const truncate = require('../../utils/truncate');
const factories = require('../../utils/factories');
const app = require('../../../src/app');

describe('orderController Test Suit', () => {

    beforeEach( async () => {
       
        await exec('sequelize db:migrate:undo:all');

        return exec('sequelize db:migrate');
        //return truncate();
    });

    it('should update an order', async () => {

        const user = await factories.create('User');
        const address = await factories.create('Address', { user_id: user.id });
        const category = await factories.create('Category');
        const product = await factories.create('Product', { category_id: category.id });
        const order = await factories.create('Order', { 
            user_id: user.id, 
            address_id: address.id, 
            products_id: [product.id]  
        });

        user.admin = true;
        const token = user.generateToken();

        const response = await supertest(app).put(`/admin/orders/${order.id}`)
            .set('authorization', 'Bearer ' + token)
            .send({ status: "payment confirmed" });

        expect(response.status).toBe(200);
    });
    
    it('should return code 400 for "no update has been made"', async () => {

        const user = await factories.create('User');
        user.admin = true;
        const token = user.generateToken();

        const response = await supertest(app).put(`/admin/orders/1`)
            .set('authorization', 'Bearer ' + token)
            .send({ status: "payment confirmed" });

        expect(response.status).toBe(400);
        expect(response.body.message).toBe("no update has been made");
    });

    it('should erase an order', async () => {

        const user = await factories.create('User');
        const address = await factories.create('Address', { user_id: user.id });
        const category = await factories.create('Category');
        const product = await factories.create('Product', { category_id: category.id });
        const order = await factories.create('Order', { 
            user_id: user.id, 
            address_id: address.id, 
            products_id: [product.id]  
        });

        user.admin = true;
        const token = user.generateToken();

        const response = await supertest(app).delete(`/admin/orders/${order.id}`)
            .set('authorization', 'Bearer ' + token)
    
        expect(response.status).toBe(200);
    });

    it('should return code 400 for "order not found"', async () => {

        const user = await factories.create('User');
        user.admin = true;
        const token = user.generateToken();

        const response = await supertest(app).delete(`/admin/orders/5`)
            .set('authorization', 'Bearer ' + token)
    
        expect(response.status).toBe(400);
        expect(response.body.message).toBe("order not found");
    });
});