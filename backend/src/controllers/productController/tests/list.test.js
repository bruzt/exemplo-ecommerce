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

    it('should list all products from db', async () => {

        const category = await factories.create('Category');

        for(let i = 0; i < 3; i++){

            await factories.create('Product', { category_id: category.id });
        }

        const response = await supertest(app).get(`/products`);

        expect(response.status).toBe(200);
        expect(response.body.count).toBe(3);
        expect(response.body.products.length).toBe(3);
    });

    it('should list all products - section "on-sale"', async () => {

        const dateStart = new Date(new Date().setDate(new Date().getDate() - 1)).toISOString();
        const dateEnd = new Date(new Date().setDate(new Date().getDate() + 1)).toISOString();

        const category = await factories.create('Category');

        await factories.create('Product', { category_id: category.id });
        await factories.create('Product', { 
            discount_percent: 10,
            discount_datetime_start: dateStart,
            discount_datetime_end: dateEnd,
            category_id: category.id,
        });

        const response = await supertest(app).get(`/products?section=on-sale`);

        expect(response.status).toBe(200);
        expect(response.body.count).toBe(1);
        expect(response.body.products.length).toBe(1);
    });

    it('should list all products - section "best-sellers"', async () => {

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

    it('should list all products - section "news"', async () => {

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

    /*it('should list all products - filter by title', async () => {

        const category = await factories.create('Category');

        const product = await factories.create('Product', { category_id: category.id });
        
        const response = await supertest(app).get(`/products?title=${product.title}`);

        expect(response.status).toBe(200);
        expect(response.body.products[0].title).toBe(product.title);
    });*/

    it('should list all products - filter by category', async () => {

        const category = await factories.create('Category');

        const product = await factories.create('Product', { category_id: category.id });

        const response = await supertest(app).get(`/products?category=${category.id}`);

        expect(response.status).toBe(200);
        expect(response.body.products[0].id).toBe(product.id);
    });

    it('should list all products - filter by category lowest-price', async () => {

        const category = await factories.create('Category');

        await factories.create('Product', { category_id: category.id, price: 999 });
        const product = await factories.create('Product', { category_id: category.id, price: 8 });

        const response = await supertest(app).get(`/products?category=${category.id}&filter=lowest-price`);

        expect(response.status).toBe(200);
        expect(response.body.products[0].id).toBe(product.id);
    });

    it('should list all products - filter by category biggest-price', async () => {

        const category = await factories.create('Category');

        await factories.create('Product', { category_id: category.id, price: 8 });
        const product = await factories.create('Product', { category_id: category.id, price: 999 });

        const response = await supertest(app).get(`/products?category=${category.id}&filter=biggest-price`);

        expect(response.status).toBe(200);
        expect(response.body.products[0].id).toBe(product.id);
    });
});