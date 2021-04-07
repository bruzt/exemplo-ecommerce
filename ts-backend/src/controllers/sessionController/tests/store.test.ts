import supertest from 'supertest';
import jwt from 'jsonwebtoken';

import typeormConnection from '../../../databases/typeorm/connection';
import sonicConnection from '../../../databases/sonic/connection';
import truncate from '../../../testUtils/truncateTypeorm';
import app from '../../../app';
import UserModel from '../../../models/UserModel';

const fakeUser = {
    name: "fake user",
    cpf: "61311682023",
    email: "fake@admin.com",
    password: "123456"
}

describe('sessionController Store Test Suit', () => {

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
            })
        ;

        const { id } = jwt.verify(response.body.token, process.env.APP_SECRET as string) as { id: number; };

        expect(response.status).toBe(200);
        expect(user.id).toBe(id);
    });

    it('should return error for "one or more fields are missing in body"', async () => {

        const response = await supertest(app).post('/sessions')
            .send({
                email: 'test@test.com',
            });

        expect(response.status).toBe(400);
        expect(response.body.source).toBe("body");
    });

    it('should not authenticated if user not exists', async () => {

        const response = await supertest(app).post('/sessions')
            .send({
                email: 'test@test.com',
                password: 'passtest'
            });

        expect(response.status).toBe(400);
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

        expect(response.status).toBe(400);
        expect(response.body.message).toBe('email or password is incorrect');
    });
});