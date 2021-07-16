import supertest from 'supertest';

import typeormConnection from '../../../databases/typeorm/connection';
import sonicConnection from '../../../databases/sonic/connection';
import truncate from '../../../testUtils/truncateTypeorm';
import app from '../../../app';
import UserModel from '../../../models/UserModel';
import AddressModel from '../../../models/AddressModel';
import { fakeUser, fakeAddress } from '../../../testUtils/fakeData';

describe('addressController List Test Suit', () => {

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

    it('should show all address of a user', async () => {

        const user = UserModel.create(fakeUser);
        await user.save();
        const token = user.generateJwt();

        for(let i=0; i<3; i++){

            const address = AddressModel.create({
                ...fakeAddress,
                user
            });

            await address.save();
        }
        

        const response = await supertest(app).get(`/addresses`)
            .set('authorization', 'Bearer ' + token)
        ;
        
        expect(response.status).toBe(200);
        expect(response.body.length).toBe(3);
        expect(response.body[0].user_id).toBe(user.id);
    });

    it('should return error for "authorization is required"', async () => {

        const response = await supertest(app).get(`/addresses`);
        
        expect(response.status).toBe(401);
        expect(response.body.message[0]).toBe("\"authorization\" is required");
    });

    it('should return error for "user not found"', async () => {

        const user = UserModel.create(fakeUser);
        const token = user.generateJwt();
        
        const response = await supertest(app).get(`/addresses`)
            .set('authorization', 'Bearer ' + token)
        ;

        expect(response.status).toBe(404);
        expect(response.body.message).toBe("user not found");
    });
});
