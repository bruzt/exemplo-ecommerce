import supertest from 'supertest';

import typeormConnection from '../../../databases/typeorm/connection';
import sonicConnection from '../../../databases/sonic/connection';
import truncate from '../../../testUtils/truncateTypeorm';
import app from '../../../app';
import UserModel from '../../../models/UserModel';
import AddressModel from '../../../models/AddressModel';
import { fakeUser, fakeAddress } from '../../../testUtils/fakeData';

describe('addressController Update Test Suit', () => {

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

    it('should update a address', async () => {

        const user = UserModel.create(fakeUser);
        await user.save();
        const token = user.generateJwt();

        const address = AddressModel.create({
            ...fakeAddress,
            user
        });
        await address.save();

        const response = await supertest(app).put(`/addresses/${address.id}`)
            .set('authorization', 'Bearer ' + token)
            .send({
                street: 'rua test',
                zipcode: '16516565151',
                number: '96494988958',
                neighborhood: 'ggwegweg',
                city: 'afafsaf asf',
                state: 'faasasf sa'
            });

        expect(response.status).toBe(200);
        expect(response.body.user_id).toBe(user.id);
    });

    it('should return error for "authorization is required" - update', async () => {

        const response = await supertest(app).put(`/addresses/5`)
            .send({
                street: 'rua test'
            });

        expect(response.status).toBe(401);
        expect(response.body.message[0]).toBe("\"authorization\" is required");
    });

    it('should return error for "user not found" - update', async () => {

        const user = UserModel.create(fakeUser);
        const token = user.generateJwt();
        
        const response = await supertest(app).put(`/addresses/2`)
            .set('authorization', 'Bearer ' + token)
            .send({
                number: "55"
            });

        expect(response.status).toBe(404);
        expect(response.body.message).toBe("user not found");
    });

    it('should return error for "address not found" - update', async () => {

        const user = UserModel.create(fakeUser);
        await user.save();
        const token = user.generateJwt();

        const response = await supertest(app).put(`/addresses/5`)
            .set('authorization', 'Bearer ' + token)
            .send({
                street: 'rua test'
            });

        expect(response.status).toBe(404);
        expect(response.body.message).toBe("address not found");
    });
});
