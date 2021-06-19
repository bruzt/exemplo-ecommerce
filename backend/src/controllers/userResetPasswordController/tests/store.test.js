const supertest = require('supertest');

const truncate = require('../../../testUtils/truncate');
const factories = require('../../../testUtils/factories');
const app = require('../../../app');

describe('userResetPasswordController Test Suit', () => {

    beforeEach( () => {
              
        return truncate();
    });

    it('should send a email with token to reset password', async () => {

        const user = await factories.create('User', {
            email: 'um@dois.tres'
        });

        const response = await supertest(app).post('/reset-password')
            .send({
                email: user.email
            });

        expect(response.status).toBe(204);
    });

    it('should return code 400 for "user not found"', async () => {

        const response = await supertest(app).post('/reset-password')
            .send({
                email: 'um@dois.tres'
            });

        expect(response.status).toBe(400);
        expect(response.body.message).toBe("user not found");
    });
});