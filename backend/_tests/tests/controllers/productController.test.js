const supertest = require('supertest');
const { promisify } = require('util');
const exec = promisify(require('child_process').exec);

const factories = require('../../utils/factories');
const app = require('../../../src/app');

describe('productController Test Suit', () => {

    beforeEach( async () => {

        await exec('sequelize db:migrate:undo:all');

        return exec('sequelize db:migrate');
    
        //return truncate();
    });

    it('should show all products from db', async () => {

        const category = await factories.create('Category');

        for(let i = 0; i < 3; i++){

            await factories.create('Product', { category_id: category.id });
        }

        const response = await supertest(app).get(`/products`);

        expect(response.status).toBe(200);
        expect(response.body.count).toBe(3);
        expect(response.body.products.length).toBe(3);
    });

    it('should show all products - section "on-sale"', async () => {

        const category = await factories.create('Category');

        await factories.create('Product', { category_id: category.id });
        await factories.create('Product', { 
            discount_percent: 10,
            category_id: category.id,
        });

        const response = await supertest(app).get(`/products?section=on-sale`);

        expect(response.status).toBe(200);
        expect(response.body.count).toBe(1);
        expect(response.body.products.length).toBe(1);
    });

    it('should show all products - section "best-sellers"', async () => {

        const category = await factories.create('Category');

        await factories.create('Product', { category_id: category.id });
        const product = await factories.create('Product', { 
            quantity_sold: 10,
            category_id: category.id,
        });

        const response = await supertest(app).get(`/products?section=best-sellers`);

        expect(response.status).toBe(200);
        expect(response.body.products[0].id).toBe(product.id);
    });

    it('should show all products - section "news"', async () => {

        const date = new Date(2015, 7, 20);

        const category = await factories.create('Category');

        await factories.create('Product', { 
            createdAt: date,
            category_id: category.id,
        });
        const product = await factories.create('Product', { category_id: category.id });

        const response = await supertest(app).get(`/products?section=news`);

        expect(response.status).toBe(200);
        expect(response.body.products[0].id).toBe(product.id);
    });

    /*it('should show all products - filter by title', async () => {

        const category = await factories.create('Category');

        const product = await factories.create('Product', { category_id: category.id });
        
        const response = await supertest(app).get(`/products?title=${product.title}`);

        expect(response.status).toBe(200);
        expect(response.body.products[0].title).toBe(product.title);
    });*/

    it('should show all products - filter by category', async () => {

        const category = await factories.create('Category');

        const product = await factories.create('Product', { category_id: category.id });

        const response = await supertest(app).get(`/products?category=${category.id}`);

        expect(response.status).toBe(200);
        expect(response.body.products[0].id).toBe(product.id);
    });

    it('should show all products - filter by category lowest-price', async () => {

        const category = await factories.create('Category');

        await factories.create('Product', { category_id: category.id, price: 999 });
        const product = await factories.create('Product', { category_id: category.id, price: 8 });

        const response = await supertest(app).get(`/products?category=${category.id}&filter=lowest-price`);

        expect(response.status).toBe(200);
        expect(response.body.products[0].id).toBe(product.id);
    });

    it('should show all products - filter by category biggest-price', async () => {

        const category = await factories.create('Category');

        await factories.create('Product', { category_id: category.id, price: 8 });
        const product = await factories.create('Product', { category_id: category.id, price: 999 });

        const response = await supertest(app).get(`/products?category=${category.id}&filter=biggest-price`);

        expect(response.status).toBe(200);
        expect(response.body.products[0].id).toBe(product.id);
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
                title: 'prod test',
                description: 'llalal lal lal al alala',
                price: 1.99,
                quantity_stock: 0,
                tangible: true,
                weight: "0,500",
                length: 15,
                height: 15,
                width: 15,
            });

        expect(response.status).toBe(200);
        expect(response.body.title).toBe('prod test');
    });

    it('should return code 400 for "category not found"', async () => {

        const user = await factories.create('User');
        user.admin = true;
        const token = user.generateToken();

        const response = await supertest(app).post(`/products`)
            .set('authorization', 'Bearer ' + token)
            .send({
                category_id: 10,
                title: 'prod test',
                description: 'llalal lal lal al alala',
                price: 1.99,
                quantity_stock: 0,
                tangible: true,
                weight: "0,500",
                length: 15,
                height: 15,
                width: 15,
            });

        expect(response.status).toBe(400);
        expect(response.body.message).toBe('category not found');
    });

    it('should update an product on db', async () => {

        const user = await factories.create('User');
        user.admin = true;
        const token = user.generateToken();

        const category1 = await factories.create('Category');
        const category2 = await factories.create('Category', { name: 'testee' });
        const product = await factories.create('Product', { category_id: category1.id });

        const response = await supertest(app).put(`/products/${product.id}`)
            .set('authorization', 'Bearer ' + token)
            .send({
                title: 'prod teste 2',
                description: 'teste desc',
                html_body: '<h1>teste html</h1>',
                price: 10.99,
                quantity_stock: 3,
                category_id: category2.id,
                discount_percent: 20,
                tangible: true,
                weight: "1",
                length: 30,
                height: 15,
                width: 10,
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
                title: "xablau"
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