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

describe('productController Test Suit', () => {

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

    it('should erase an product on db', async () => {

        const user = UserModel.create(fakeUser);
        user.admin = true;
        const token = user.generateJwt();

        const category = CategoryModel.create(fakeCategory);
        await category.save();

        const product = ProductModel.create({ ...fakeProduct, category_id: category.id });
        await product.save();

        const response = await supertest(app).delete(`/products/${product.id}`)
            .set('authorization', 'Bearer ' + token)
        ;

        expect(response.status).toBe(204);
    });
    
    it('should return error for "product not found"', async () => {

        const user = UserModel.create(fakeUser);
        user.admin = true;
        const token = user.generateJwt();

        const response = await supertest(app).delete(`/products/50`)
            .set('authorization', 'Bearer ' + token)
        ;

        expect(response.status).toBe(404);
        expect(response.body.message).toBe("product not found");
    });
});
