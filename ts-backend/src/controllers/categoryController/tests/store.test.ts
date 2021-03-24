import supertest from 'supertest';

import connection from '../../../databases/typeorm/connection';
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

describe('categoryController Store Test Suit', () => {

    beforeAll( () => {

        return connection;
    });

    beforeEach( () => {
              
        return truncate();
    });

    afterAll( async () => {

        return (await connection).close();
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
