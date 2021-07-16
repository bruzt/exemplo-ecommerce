import supertest from 'supertest';

import typeormConnection from '../../../databases/typeorm/connection';
import sonicConnection from '../../../databases/sonic/connection';
import truncate from '../../../testUtils/truncateTypeorm';
import app from '../../../app';
import UserModel from '../../../models/UserModel';
import AddressModel from '../../../models/AddressModel';
import { fakeUser, fakeAddress } from '../../../testUtils/fakeData';

describe('addressController Test Suit', () => {

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

    it('should erase a address from a user', async () => {

        const user = UserModel.create(fakeUser);
        await user.save();
        const token = user.generateJwt();

        const address = AddressModel.create({
            ...fakeAddress,
            user
        });
        await address.save();

        const response = await supertest(app).delete(`/addresses/${address.id}`)
            .set('authorization', 'Bearer ' + token);
        
        expect(response.status).toBe(204);
    });

    it('should return error for "authorization is required"', async () => {

        const response = await supertest(app).delete(`/addresses/1`);
        
        expect(response.status).toBe(401);
        expect(response.body.message[0]).toBe("\"authorization\" is required");
    });

    it('should return error for "user not found"', async () => {

        const user = UserModel.create(fakeUser);
        const token = user.generateJwt();
        
        const response = await supertest(app).delete(`/addresses/2`)
            .set('authorization', 'Bearer ' + token);

        expect(response.status).toBe(404);
        expect(response.body.message).toBe("user not found");
    });

    it('should return code 400 for "address not found"', async () => {

        const user = UserModel.create(fakeUser);
        await user.save();
        const token = user.generateJwt();

        const response = await supertest(app).delete(`/addresses/2`)
            .set('authorization', 'Bearer ' + token);
        
        expect(response.status).toBe(404);
        expect(response.body.message).toBe("address not found");
    });
});