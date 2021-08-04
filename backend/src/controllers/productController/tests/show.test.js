const supertest = require('supertest');
const { promisify } = require('util');
const exec = promisify(require('child_process').exec);

const factories = require('../../../testUtils/factories');
const app = require('../../../app');

describe('productController Test Suit', () => {

    beforeEach( async () => {

        await exec('sequelize db:migrate:undo:all');

        return exec('sequelize db:migrate');
    
        //return truncate();
    });

    it('should show an specific product from db', async () => {

        const category = await factories.create('Category');
        const product = await factories.create('Product', { category_id: category.id });
        
        const response = await supertest(app).get(`/products/${product.id}`);

        expect(response.status).toBe(200);
        expect(response.body.product.id).toBe(product.id);
    });

    it('should show an specific on sale product from db', async () => {

        const dateNow = new Date();
        const dateFuture = new Date(Number(dateNow) + 60000);

        const category = await factories.create('Category');
        const product = await factories.create('Product', { 
            category_id: category.id,
            discount_percent: 10,
            discount_datetime_start: dateNow,
            discount_datetime_end: dateFuture,
        });
        
        const response = await supertest(app).get(`/products/${product.id}`);

        expect(response.status).toBe(200);
        expect(response.body.product.id).toBe(product.id);
        expect(response.body.product.isOnSale).toBe(true);
    });

    it('should return code 400 for "product not found"', async () => {

        const response = await supertest(app).get(`/products/6`);

        expect(response.status).toBe(400);
        expect(response.body.message).toBe('product not found');
    });

    it('should show an specific product from db with productsBuyedWith', async () => {

        const user = await factories.create('User');
        
        const address = await factories.create('Address', { user_id: user.id });
    
        const category = await factories.create('Category');
    
        const product1 = await factories.create('Product', { category_id: category.id });

        const product2 = await factories.create('Product', { category_id: category.id });

        const order = await factories.create('Order', {
            user_id: user.id,
            address_id: address.id
        });

        await factories.create('OrdersProducts', {
            order_id: order.id,
            product_id: product1.id,
        });

        await factories.create('OrdersProducts', {
            order_id: order.id,
            product_id: product2.id,
        });
        
        const response = await supertest(app).get(`/products/${product1.id}`);

        expect(response.status).toBe(200);
        expect(response.body.productsBuyedWith.length).toBe(1);
    });
});