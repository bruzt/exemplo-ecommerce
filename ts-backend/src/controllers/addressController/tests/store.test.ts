import supertest from 'supertest';

import typeormConnection from '../../../databases/typeorm/connection';
import sonicConnection from '../../../databases/sonic/connection';
import truncate from '../../../testUtils/truncateTypeorm';
import app from '../../../app';
import UserModel from '../../../models/UserModel';
import { fakeUser, fakeAddress } from '../../../testUtils/fakeData';

describe('addressController Store Test Suit', () => {

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

    it('should add a address to an user', async () => {

        const user = UserModel.create(fakeUser);
        await user.save();
        const token = user.generateJwt();
        
        const response = await supertest(app).post(`/addresses`)
            .set('authorization', 'Bearer ' + token)
            .send(fakeAddress)
        ;

        expect(response.status).toBe(201);
        expect(parseInt(response.body.user_id)).toBe(user.id);
    });

    it('should return error for "authorization is required"', async () => {
        
        const response = await supertest(app).post(`/addresses`)
            .send(fakeAddress)
        ;

        expect(response.status).toBe(401);
        expect(response.body.message[0]).toBe("\"authorization\" is required");
    });

    it('should return error for "user not found"', async () => {

        const user = UserModel.create(fakeUser);
        const token = user.generateJwt();
        
        const response = await supertest(app).post(`/addresses`)
            .set('authorization', 'Bearer ' + token)
            .send(fakeAddress)
        ;

        expect(response.status).toBe(404);
        expect(response.body.message).toBe("user not found");
    });
});
