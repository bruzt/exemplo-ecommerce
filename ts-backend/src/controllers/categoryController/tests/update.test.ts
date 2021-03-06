import supertest from 'supertest';

import typeormConnection from '../../../databases/typeorm/connection';
import sonicConnection from '../../../databases/sonic/connection';
import truncate from '../../../testUtils/truncateTypeorm';
import app from '../../../app';
import UserModel from '../../../models/UserModel';
import CategoryModel from '../../../models/CategoryModel';
import { fakeUser, fakeCategory } from '../../../testUtils/fakeData';

describe('categoryController Update Test Suit', () => {

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

    it('should update a category', async () => {

        const user = UserModel.create(fakeUser);
        user.admin = true;
        const token = user.generateJwt();

        const category1 = CategoryModel.create(fakeCategory);
        await category1.save();

        const category2 = CategoryModel.create(fakeCategory);
        await category2.save();

        const response = await supertest(app).put(`/categories/${category1.id}`)
            .set('authorization', `Bearer ${token}`)
            .send({
                name: 'Jogos',
                parent_id: category2.id
            })
        ;

        expect(response.status).toBe(200);
    });

    it('should return error for "category not found"', async () => {

        const user = UserModel.create(fakeUser);
        user.admin = true;
        const token = user.generateJwt();

        const response = await supertest(app).put(`/categories/44`)
            .set('authorization', `Bearer ${token}`)
            .send({
                name: 'testecat'
            })
        ;

        expect(response.status).toBe(404);
        expect(response.body.message).toBe("category not found");
    });

    it('should return error for "parent not found"', async () => {

        const user = UserModel.create(fakeUser);
        user.admin = true;
        const token = user.generateJwt();

        const category = CategoryModel.create(fakeCategory);
        await category.save();

        const response = await supertest(app).put(`/categories/${category.id}`)
            .set('authorization', `Bearer ${token}`)
            .send({
                name: 'testecat',
                parent_id: 44
            })
        ;

        expect(response.status).toBe(404);
        expect(response.body.message).toBe("parent not found");
    });

    it('should return error for "category can not have itself as a parent"', async () => {

        const user = UserModel.create(fakeUser);
        user.admin = true;
        const token = user.generateJwt();

        const category = CategoryModel.create(fakeCategory);
        await category.save();

        const response = await supertest(app).put(`/categories/${category.id}`)
            .set('authorization', `Bearer ${token}`)
            .send({
                name: 'Jogos',
                parent_id: category.id
            })
        ;

        expect(response.status).toBe(400);
        expect(response.body.message).toBe('category can not have itself as a parent');
    });
});
