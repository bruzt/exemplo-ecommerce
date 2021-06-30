import supertest from 'supertest';

import typeormConnection from '../../../databases/typeorm/connection';
import sonicConnection from '../../../databases/sonic/connection';
import truncate from '../../../testUtils/truncateTypeorm';
import app from '../../../app';
import UserModel from '../../../models/UserModel';
import CategoryModel from '../../../models/CategoryModel';

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

describe('productController Store Test Suit', () => {

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

    it('should store an product on db', async () => {

        const user = UserModel.create(fakeUser);
        user.admin = true;
        const token = user.generateJwt();

        const category = CategoryModel.create(fakeCategory);
        await category.save();

        const response = await supertest(app).post(`/products`)
            .set('authorization', 'Bearer ' + token)
            .send({ ...fakeProduct, category_id: category.id })
        ;
        
        expect(response.status).toBe(201);
        expect(response.body.title).toBe('fake product');
    });

    it('should store an product on db with discount', async () => {

        const dateNow = new Date();
        const dateFuture = new Date(Number(dateNow) + 60000);

        const user = UserModel.create(fakeUser);
        user.admin = true;
        const token = user.generateJwt();

        const category = CategoryModel.create(fakeCategory);
        await category.save();

        const response = await supertest(app).post(`/products`)
            .set('authorization', 'Bearer ' + token)
            .send({ 
                ...fakeProduct, 
                category_id: category.id,
                discount_datetime_start: dateNow,
                discount_datetime_end: dateFuture,
                discount_percent: 10
            })
        ;
        
        expect(response.status).toBe(201);
        expect(response.body.title).toBe('fake product');
    });

    it('should return error for "category not found"', async () => {

        const user = UserModel.create(fakeUser);
        user.admin = true;
        const token = user.generateJwt();

        const response = await supertest(app).post(`/products`)
            .set('authorization', 'Bearer ' + token)
            .send({ ...fakeProduct, category_id: 10 })
        ;

        expect(response.status).toBe(404);
        expect(response.body.message).toBe('category not found');
    });
});
