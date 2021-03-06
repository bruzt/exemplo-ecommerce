import supertest from 'supertest';

import typeormConnection from '../../../databases/typeorm/connection';
import sonicConnection from '../../../databases/sonic/connection';
import truncate from '../../../testUtils/truncateTypeorm';
import app from '../../../app';
import UserModel from '../../../models/UserModel';
import CategoryModel from '../../../models/CategoryModel';
import ProductModel from '../../../models/ProductModel';
import { fakeUser, fakeProduct } from '../../../testUtils/fakeData';

describe('categoryController Destroy Test Suit', () => {

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

    it('should delete a category', async () => {

        const user = UserModel.create(fakeUser);
        user.admin = true;
        const token = user.generateJwt();

        const category1 = CategoryModel.create({ name: 'categoria 1' });
        await category1.save();

        const category2 = CategoryModel.create({ name: 'categoria 2' });
        await category2.save();
        
        const product = ProductModel.create({ ...fakeProduct, category_id: category1.id });
        await product.save();

        const response = await supertest(app).delete(`/categories/${category1.id}`)
            .set('authorization', `Bearer ${token}`)
            .send({
                transferToId: category2.id
            })
        ;

        const productAfter = await ProductModel.findOne(product.id);

        expect(response.status).toBe(204);
        expect(productAfter?.category_id).toBe(category2.id);
    });

    it('should return error for "id and transferToId cannot be the same"', async () => {

        const user = UserModel.create(fakeUser);
        user.admin = true;
        const token = user.generateJwt();
        
        const response = await supertest(app).delete(`/categories/1`)
            .set('authorization', `Bearer ${token}`)
            .send({
                transferToId: 1
            })
        ;

        expect(response.status).toBe(400);
        expect(response.body.message).toBe("id and transferToId cannot be the same");
    });

    it('should return error for "category not found"', async () => {

        const user = UserModel.create(fakeUser);
        user.admin = true;
        const token = user.generateJwt();
        
        const response = await supertest(app).delete(`/categories/1`)
            .set('authorization', `Bearer ${token}`)
            .send({
                transferToId: 2
            })
        ;

        expect(response.status).toBe(404);
        expect(response.body.message).toBe("category not found");
    });

    it('should return error for "category to transfer not found"', async () => {

        const user = UserModel.create(fakeUser);
        user.admin = true;
        const token = user.generateJwt();

        const category = CategoryModel.create({ name: 'categoria' });
        await category.save();
        
        const response = await supertest(app).delete(`/categories/${category.id}`)
            .set('authorization', `Bearer ${token}`)
            .send({
                transferToId: 2
            })
        ;

        expect(response.status).toBe(404);
        expect(response.body.message).toBe("category to transfer not found");
    });

    it('should return error for "category to delete must not have childrens"', async () => {

        const user = UserModel.create(fakeUser);
        user.admin = true;
        const token = user.generateJwt();

        const category1 = CategoryModel.create({ name: 'categoria 1' });
        await category1.save();

        const category2 = CategoryModel.create({ name: 'categoria 2', parent_id: category1.id });
        await category2.save();

        const category3 = CategoryModel.create({ name: 'categoria 3' });
        await category3.save();
        
        const response = await supertest(app).delete(`/categories/${category1.id}`)
            .set('authorization', `Bearer ${token}`)
            .send({
                transferToId: category3.id
            })
        ;

        expect(response.status).toBe(400);
        expect(response.body.message).toBe("category to delete must not have childrens");
    });
});
