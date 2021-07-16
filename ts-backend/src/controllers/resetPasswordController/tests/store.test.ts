import supertest from 'supertest';

import typeormConnection from '../../../databases/typeorm/connection';
import sonicConnection from '../../../databases/sonic/connection';
import truncate from '../../../testUtils/truncateTypeorm';
import app from '../../../app';
import UserModel from '../../../models/UserModel';
import { fakeUser } from '../../../testUtils/fakeData';

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

    it('should send a email with token to reset password', async () => {

        const user = UserModel.create(fakeUser);
        await user.save();

        const response = await supertest(app).post('/reset-password')
            .send({
                email: user.email
            });

        expect(response.status).toBe(204);
    });

    it('should return error for "user not found"', async () => {

        const response = await supertest(app).post('/reset-password')
            .send({
                email: 'um@dois.tres'
            });

        expect(response.status).toBe(404);
        expect(response.body.message).toBe("user not found");
    });
});
