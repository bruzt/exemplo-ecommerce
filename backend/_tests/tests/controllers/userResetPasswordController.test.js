const supertest = require('supertest');

const truncate = require('../../utils/truncate');
const factories = require('../../utils/factories');
const app = require('../../../src/app');

describe('userResetPasswordController Test Suit', () => {

    beforeEach( () => {
              
        return truncate();
    });

    it('should send a email with token to reset password', async () => {

        const user = await factories.create('User', {
            email: 'um@dois.tres'
        });

        const response = await supertest(app).post('/reset-password').send({
            email: user.email
        });

        expect(response.status).toBe(200);
    });

    it('should return code 400 for user not found - store', async () => {

        const response = await supertest(app).post('/reset-password').send({
            email: 'um@dois.tres'
        });

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error');
    });

    it('should change the password with valid token', async () => {

        const user = await factories.create('User');

        const token = 'testetoken';
        user.reset_password_token = token;

        const date = new Date();
        date.setHours(date.getHours() + 1);
        user.reset_password_expires = date;

        await user.save();

        const response = await supertest(app).put('/reset-password').send({
            token: user.id + '#' + token,
            password: '123456'
        });

        expect(response.status).toBe(200);
    });

    it('should return code 400 for user not found - update', async () => {

        const response = await supertest(app).put('/reset-password').send({
            token: '2#df95h495df4h9dh',
            password: '123456'
        });

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error');
    });

    it('should return code 400 for invalid token', async () => {

        const user = await factories.create('User');

        const token = 'testetoken';
        user.reset_password_token = token;

        const date = new Date();
        date.setHours(date.getHours() + 1);
        user.reset_password_expires = date;

        await user.save();

        const response = await supertest(app).put('/reset-password').send({
            token: user.id + '#df4gd54g',
            password: '123456'
        });

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error');
    });

    it('should return code 400 for invalid token (invalid id)', async () => {

        const response = await supertest(app).put('/reset-password').send({
            token: 'a#df4gd54g',
            password: '123456'
        });

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error');
    });

    it('should return code 400 for token expired', async () => {

        const user = await factories.create('User');

        const token = 'testetoken';
        user.reset_password_token = token;

        const date = new Date();
        date.setHours(date.getHours() - 1);
        user.reset_password_expires = date;

        await user.save();

        const response = await supertest(app).put('/reset-password').send({
            token: user.id + '#' + token,
            password: '123456'
        });
        
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error');
    });
});