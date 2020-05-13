const supertest = require('supertest');

const truncate = require('../../utils/truncate');
const factories = require('../../utils/factories');
const app = require('../../../src/app');

describe('productController Test Suit', () => {

    beforeEach( async () => {
    
        return truncate();
    });

    it('should show all products from db', async () => {

        const category = await factories.create('Category');

        for(let i = 0; i < 3; i++){

            await factories.create('Product', { category_id: category.id });
        }

        const response = await supertest(app).get(`/products`);

        expect(response.status).toBe(200);
        expect(response.body.length).toBe(3);
    });

    it('should show an specific product from db', async () => {

        const category = await factories.create('Category');
        const product = await factories.create('Product', { category_id: category.id });
        
        const response = await supertest(app).get(`/products/${product.id}`);

        expect(response.status).toBe(200);
        expect(response.body.id).toBe(product.id);
    });

    it('should return code 400 for "product not found"', async () => {

        const response = await supertest(app).get(`/products/6`);

        expect(response.status).toBe(400);
        expect(response.body.message).toBe('product not found');
    });

    it('should store an product on db', async () => {

        const user = await factories.create('User');
        user.admin = true;
        const token = user.generateToken();

        const category = await factories.create('Category');

        const response = await supertest(app).post(`/products`)
        .set('authorization', 'Bearer ' + token)
        .send({
            category_id: category.id,
            name: 'prod test',
            description: 'llalal lal lal al alala',
            price: 1.99,
            quantity_stock: 0,
        });

        expect(response.status).toBe(200);
        expect(response.body.name).toBe('prod test');
    });

    it('should return code 400 for "category not found"', async () => {

        const user = await factories.create('User');
        user.admin = true;
        const token = user.generateToken();

        const response = await supertest(app).post(`/products`)
        .set('authorization', 'Bearer ' + token)
        .send({
            category_id: 10,
            name: 'prod test',
            description: 'llalal lal lal al alala',
            price: 1.99,
            quantity_stock: 0,
        });

        expect(response.status).toBe(400);
        expect(response.body.message).toBe('category not found');
    });

    it('should update an product on db', async () => {

        const user = await factories.create('User');
        user.admin = true;
        const token = user.generateToken();

        const category = await factories.create('Category');
        const product = await factories.create('Product', { category_id: category.id });

        const response = await supertest(app).put(`/products/${product.id}`)
        .set('authorization', 'Bearer ' + token)
        .send({
            name: 'prod teste 2',
        });

        expect(response.status).toBe(200);
    });

    it('should return code 400 for "no update has been made"', async () => {

        const user = await factories.create('User');
        user.admin = true;
        const token = user.generateToken();

        const response = await supertest(app).put(`/products/33`)
        .set('authorization', 'Bearer ' + token)
        .send({
            name: "xablau"
        });

        expect(response.status).toBe(400);
        expect(response.body.message).toBe('no update has been made');
    });

    it('should erase an product on db', async () => {

        const user = await factories.create('User');
        user.admin = true;
        const token = user.generateToken();

        const category = await factories.create('Category');
        const product = await factories.create('Product', { category_id: category.id });

        const response = await supertest(app).delete(`/products/${product.id}`)
        .set('authorization', 'Bearer ' + token);

        expect(response.status).toBe(200);
    });
    
    it('should return code 400 for "product not found"', async () => {

        const user = await factories.create('User');
        user.admin = true;
        const token = user.generateToken();

        const response = await supertest(app).delete(`/products/50`)
        .set('authorization', 'Bearer ' + token);

        expect(response.status).toBe(400);
        expect(response.body.message).toBe("product not found");
    });
});