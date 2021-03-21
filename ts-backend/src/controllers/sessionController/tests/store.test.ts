import supertest from 'supertest';
import jwt from 'jsonwebtoken';

import connection from '../../../databases/typeorm/connection';
import truncate from '../../../testUtils/truncateTypeorm';
import app from '../../../app';
import UserModel from '../../../models/UserModel';

const fakeUser = {
    name: "fake user",
    cpf: "61311682023",
    email: "fake@admin.com",
    password: "123456"
}

describe('sessionController Test Suit', () => {

    beforeAll( () => {

        return connection;
    });

    beforeEach( () => {
              
        return truncate();
    });

    afterAll( async () => {

        return (await connection).close();
    });

    it('should authenticated with valid credentials', async () => {

        const user = UserModel.create({
            ...fakeUser,
            email: 'test@test.com',
            password: 'passtest'
        });

        await user.save();

        const response = await supertest(app).post('/sessions')
            .send({
                email: 'test@test.com',
                password: 'passtest'
            });

        const { userId } = jwt.verify(response.body.token, process.env.APP_SECRET as string) as { userId: number; };

        expect(response.status).toBe(200);
        expect(user.id).toBe(userId);
    });

    it('should return error for "one or more fields are missing"', async () => {

        const response = await supertest(app).post('/sessions')
            .send({
                email: 'test@test.com',
            });

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("error");
    });

    it('should not authenticated if user not exists', async () => {

        const response = await supertest(app).post('/sessions')
            .send({
                email: 'test@test.com',
                password: 'passtest'
            });

        expect(response.status).toBe(406);
        expect(response.body.message).toBe('email or password is incorrect');
    });

    it('should not authenticated if password is incorrect', async () => {

        const user = UserModel.create({
            ...fakeUser,
            email: 'test@test.com',
            password: 'passtest'
        });

        await user.save();

        const response = await supertest(app).post('/sessions')
            .send({
                email: 'test@test.com',
                password: 'testpass'
            });

        expect(response.status).toBe(406);
        expect(response.body.message).toBe('email or password is incorrect');
    });
});