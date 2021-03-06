import supertest from 'supertest';

import typeormConnection from '../../../databases/typeorm/connection';
import sonicConnection from '../../../databases/sonic/connection';
import truncate from '../../../testUtils/truncateTypeorm';
import app from '../../../app';
import UserModel from '../../../models/UserModel';
import CategoryModel from '../../../models/CategoryModel';
import { fakeUser, fakeCategory } from '../../../testUtils/fakeData';

describe('categoryController Store Test Suit', () => {

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

    it('should add a category', async () => {

        const user = UserModel.create(fakeUser);
        user.admin = true;
        const token = user.generateJwt();

        const response = await supertest(app).post('/categories')
            .set('authorization', `Bearer ${token}`)
            .send({
                name: 'Eletronicos'
            });

        expect(response.status).toBe(201);
        expect(response.body.name).toBe('Eletronicos');
    });

    it('should add a category with a parent', async () => {

        const user = UserModel.create(fakeUser);
        user.admin = true;
        const token = user.generateJwt();

        const category = CategoryModel.create(fakeCategory);
        await category.save();

        const response = await supertest(app).post('/categories')
            .set('authorization', `Bearer ${token}`)
            .send({
                name: 'Eletronicos',
                parent_id: category.id
            });

        expect(response.status).toBe(201);
        expect(response.body.parent_id).toBe(category.id);
    });

    it('should return error for "parent category id not found"', async () => {

        const user = UserModel.create(fakeUser);
        user.admin = true;
        const token = user.generateJwt();

        const response = await supertest(app).post('/categories')
            .set('authorization', `Bearer ${token}`)
            .send({
                name: 'Eletronicos',
                parent_id: 5
            });

        expect(response.status).toBe(404);
        expect(response.body.message).toBe('parent category id not found');
    });
});
