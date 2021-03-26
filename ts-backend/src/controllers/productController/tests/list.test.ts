import supertest from 'supertest';

import typeormConnection from '../../../databases/typeorm/connection';
import sonicConnection from '../../../databases/sonic/connection';
import truncate from '../../../testUtils/truncateTypeorm';
import app from '../../../app';
import CategoryModel from '../../../models/CategoryModel';
import ProductModel from '../../../models/ProductModel';

const fakeCategory = {
    name: 'fake category',
    parent_id: 0
}

const fakeProduct = {
    title: 'fake product',
    description: 'bla bla bla',
    html_body: '<p>vai</p>',
    price: "10.50",
    quantity_stock: 100,
    tangible: true,
    weight: 5,
    length: 15,
    height: 15,
    width: 15,
}

describe('productController Test Suit', () => {

    beforeAll( () => {

        return typeormConnection;
    });

    beforeEach( () => {
              
        return truncate();
    });

    afterAll( async () => {

        await sonicConnection.search.close();
        await sonicConnection.ingest.close();

        return (await typeormConnection).close();
    });

    it('should list all products from db', async () => {

        const category = CategoryModel.create(fakeCategory);
        await category.save();

        for(let i = 0; i < 3; i++){

            const product = ProductModel.create({ ...fakeProduct, category_id: category.id });
            await product.save();
        }

        const response = await supertest(app).get(`/products?limit=10&offset=1`);

        expect(response.status).toBe(200);
        expect(response.body.count).toBe(3);
        expect(response.body.products.length).toBe(2);
    });

    it('should list all products - section "on-sale"', async () => {

        const dateStart = new Date(new Date().setDate(new Date().getDate() - 1)).toISOString();
        const dateEnd = new Date(new Date().setDate(new Date().getDate() + 1)).toISOString();

        const category = CategoryModel.create(fakeCategory);
        await category.save();

        const product1 = ProductModel.create({ ...fakeProduct, category_id: category.id });
        await product1.save();

        const product2 = ProductModel.create({ 
            ...fakeProduct,
            discount_percent: 10,
            discount_datetime_start: dateStart,
            discount_datetime_end: dateEnd,
            category_id: category.id,
        });
        await product2.save();

        const response = await supertest(app).get(`/products?section=on-sale`);

        expect(response.status).toBe(200);
        expect(response.body.count).toBe(1);
        expect(response.body.products.length).toBe(1);
    });

    it('should list all products - section "best-sellers"', async () => {

        const category = CategoryModel.create(fakeCategory);
        await category.save();

        const product1 = ProductModel.create({ ...fakeProduct, category_id: category.id });
        await product1.save();

        const product2 = ProductModel.create({ 
            ...fakeProduct,
            quantity_sold: 10,
            category_id: category.id,
        });
        await product2.save();

        const response = await supertest(app).get(`/products?section=best-sellers`);

        expect(response.status).toBe(200);
        expect(response.body.count).toBe(1);
        expect(response.body.products.length).toBe(1);
        expect(response.body.products[0].id).toBe(product2.id);
    });

    it('should list all products - section "news"', async () => {

        const date = new Date(2015, 7, 20);

        const category = CategoryModel.create(fakeCategory);
        await category.save();

        const product1 = ProductModel.create({ 
            ...fakeProduct,
            created_at: date,
            category_id: category.id,
        });
        await product1.save();

        const product2 = ProductModel.create({ ...fakeProduct, category_id: category.id });
        await product2.save();

        const response = await supertest(app).get(`/products?section=news`);

        expect(response.status).toBe(200);
        expect(response.body.count).toBe(1);
        expect(response.body.products.length).toBe(1);
        expect(response.body.products[0].id).toBe(product2.id);
    });

    it('should list all products - filter by title', async () => {

        const category = CategoryModel.create(fakeCategory);
        await category.save();

        const product1 = ProductModel.create({ ...fakeProduct, category_id: category.id });
        await product1.save();

        const product2 = ProductModel.create({ ...fakeProduct, title: 'other', category_id: category.id });
        await product2.save();
        
        const response = await supertest(app).get(`/products?title=${product1.title}`);
        expect(response.status).toBe(200);
        expect(response.body.count).toBe(1);
        expect(response.body.products.length).toBe(1);
        expect(response.body.products[0].title).toBe(product1.title);
    });

    it('should list all products - filter by category', async () => {

        const category1 = CategoryModel.create(fakeCategory);
        await category1.save();

        const category2 = CategoryModel.create(fakeCategory);
        await category2.save();

        const product1 = ProductModel.create({ ...fakeProduct, category_id: category1.id });
        await product1.save();

        const product2 = ProductModel.create({ ...fakeProduct, category_id: category2.id });
        await product2.save();

        const response = await supertest(app).get(`/products?category=${category1.id}`);

        expect(response.status).toBe(200);
        expect(response.body.count).toBe(1);
        expect(response.body.products.length).toBe(1);
        expect(response.body.products[0].id).toBe(product1.id);
    });

    it('should list all products - filter by category lowest-price', async () => {

        const category = CategoryModel.create(fakeCategory);
        await category.save();

        const product1 = ProductModel.create({ ...fakeProduct, category_id: category.id, price: "999" });
        await product1.save();

        const product2 = ProductModel.create({ ...fakeProduct, category_id: category.id, price: "8" });
        await product2.save();

        const response = await supertest(app).get(`/products?category=${category.id}&filter=lowest-price`);

        expect(response.status).toBe(200);
        expect(response.body.products[0].id).toBe(product2.id);
        expect(response.body.products[1].id).toBe(product1.id);
    });

    it('should list all products - filter by category biggest-price', async () => {

        const category = CategoryModel.create(fakeCategory);
        await category.save();

        const product1 = ProductModel.create({ ...fakeProduct, category_id: category.id, price: "999" });
        await product1.save();

        const product2 = ProductModel.create({ ...fakeProduct, category_id: category.id, price: "8" });
        await product2.save();

        const response = await supertest(app).get(`/products?category=${category.id}&filter=biggest-price`);

        expect(response.status).toBe(200);
        expect(response.body.products[0].id).toBe(product1.id);
        expect(response.body.products[1].id).toBe(product2.id);
    });
});
