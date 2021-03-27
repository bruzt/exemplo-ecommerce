import supertest from 'supertest';

import typeormConnection from '../../../databases/typeorm/connection';
import sonicConnection from '../../../databases/sonic/connection';
import truncate from '../../../testUtils/truncateTypeorm';
import app from '../../../app';
import UserModel from '../../../models/UserModel';
import CategoryModel from '../../../models/CategoryModel';
import ProductModel from '../../../models/ProductModel';

const fakeUser = {
    name: "fake user",
    cpf: "61311682023",
    email: "fake@admin.com",
    password: "123456"
}

const fakeCategory = {
    name: 'fake category',
}

const fakeProduct = {
    title: 'fake product',
    description: 'bla bla bla',
    html_body: '<p>vai</p>',
    price: "10.50",
    quantity_stock: 100,
    tangible: true,
    weight: "5",
    length: 15,
    height: 15,
    width: 15,
}

describe('productController Update Test Suit', () => {

    beforeAll( () => {

        return typeormConnection;
    });

    beforeEach( async () => {

        await sonicConnection.ingest.flushc('products');

        return truncate();
    });

    afterAll( async () => {

        await sonicConnection.search.close();
        await sonicConnection.ingest.close();

        return (await typeormConnection).close();
    });


    it('should update an product on db', async () => {

        const dateNow = new Date();
        const dateFuture = new Date(Number(dateNow) + 60000);

        const user = UserModel.create(fakeUser);
        user.admin = true;
        const token = user.generateJwt();

        const category1 = CategoryModel.create(fakeCategory);
        await category1.save();

        const category2 = CategoryModel.create(fakeCategory);
        await category2.save();
        
        const product = ProductModel.create({ ...fakeProduct, category_id: category1.id });
        await product.save();

        const response = await supertest(app).put(`/products/${product.id}`)
            .set('authorization', 'Bearer ' + token)
            .send({
                title: 'prod teste 2',
                description: 'teste desc',
                html_body: '<h1>teste html</h1>',
                price: 10.99,
                quantity_stock: 3,
                category_id: category2.id,
                discount_datetime_start: dateNow,
                discount_datetime_end: dateFuture,
                discount_percent: 20,
                quantity_sold: 2,
                tangible: true,
                weight: "1",
                length: 30,
                height: 15,
                width: 10,
            })
        ;

        expect(response.status).toBe(200);
        expect(response.body.title).toBe('prod teste 2');
    });

    it('should return error for "product not found"', async () => {

        const user = UserModel.create(fakeUser);
        user.admin = true;
        const token = user.generateJwt();

        const response = await supertest(app).put(`/products/33`)
            .set('authorization', 'Bearer ' + token)
            .send({
                title: "xablau"
            })
        ;

        expect(response.status).toBe(404);
        expect(response.body.message).toBe('product not found');
    });

    it('should return error for "category not found"', async () => {

        const user = UserModel.create(fakeUser);
        user.admin = true;
        const token = user.generateJwt();

        const category = CategoryModel.create(fakeCategory);
        await category.save();
        
        const product = ProductModel.create({ ...fakeProduct, category_id: category.id });
        await product.save();

        const response = await supertest(app).put(`/products/${product.id}`)
            .set('authorization', 'Bearer ' + token)
            .send({
                category_id: 33
            })
        ;

        expect(response.status).toBe(404);
        expect(response.body.message).toBe('category not found');
    });    
});
