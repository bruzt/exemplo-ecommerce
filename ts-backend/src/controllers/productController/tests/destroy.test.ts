import supertest from 'supertest';

import typeormConnection from '../../../databases/typeorm/connection';
import sonicConnection from '../../../databases/sonic/connection';
import truncate from '../../../testUtils/truncateTypeorm';
import app from '../../../app';
import UserModel from '../../../models/UserModel';
import CategoryModel from '../../../models/CategoryModel';
import ProductModel from '../../../models/ProductModel';
import { fakeUser, fakeProduct, fakeCategory } from '../../../testUtils/fakeData';

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
