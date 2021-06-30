import supertest from 'supertest';

import typeormConnection from '../../../databases/typeorm/connection';
import sonicConnection from '../../../databases/sonic/connection';
import truncate from '../../../testUtils/truncateTypeorm';
import app from '../../../app';
import UserModel from '../../../models/UserModel';

const fakeUser = {
    name: "fake admin",
    cpf: "61311682023",
    email: "fake@admin.com",
    password: "123456"
}

describe('userResetPasswordController Test Suit', () => {

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

    it('should change the password with valid token', async () => {

        const user = UserModel.create(fakeUser);

        const token = 'testetoken';
        user.reset_password_token = token;

        const date = new Date();
        date.setHours(date.getHours() + 1);
        user.reset_password_expires = date;

        await user.save();

        const response = await supertest(app).put('/reset-password')
            .send({
                token: user.id + '$' + token,
                password: '123456'
            })
        ;

        expect(response.status).toBe(204);
    });

    it('should return error for "user not found" - update', async () => {

        const response = await supertest(app).put('/reset-password')
            .send({
                token: '2$df95h495df4h9dh',
                password: '123456'
            });

        expect(response.status).toBe(404);
        expect(response.body.message).toBe('user not found');
    });

    it('should return error for "invalid token" (no split)', async () => {

        const response = await supertest(app).put('/reset-password')
            .send({
                token: 'df4gd54g',
                password: '123456'
            });

        expect(response.status).toBe(400);
        expect(response.body.message).toBe('invalid token');
    });

    it('should return error for "invalid token" (invalid id)', async () => {

        const response = await supertest(app).put('/reset-password')
            .send({
                token: 'a$df4gd54g',
                password: '123456'
            });

        expect(response.status).toBe(400);
        expect(response.body.message).toBe('invalid token');
    });

    it('should return error for "invalid token" (different of stored on db)', async () => {

        const user = UserModel.create(fakeUser);

        const token = 'testetoken';
        user.reset_password_token = token;

        const date = new Date();
        date.setHours(date.getHours() + 1);
        user.reset_password_expires = date;

        await user.save();

        const response = await supertest(app).put('/reset-password')
            .send({
                token: user.id + '$df4gd54g',
                password: '123456'
            });

        expect(response.status).toBe(400);
        expect(response.body.message).toBe('invalid token');
    });

    it('should return error for "token expired"', async () => {

        const user = UserModel.create(fakeUser);

        const token = 'testetoken';
        user.reset_password_token = token;

        const date = new Date();
        date.setHours(date.getHours() - 1);
        user.reset_password_expires = date;

        await user.save();

        const response = await supertest(app).put('/reset-password')
            .send({
                token: user.id + '$' + token,
                password: '123456'
            });
        
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('token expired');
    });
});
