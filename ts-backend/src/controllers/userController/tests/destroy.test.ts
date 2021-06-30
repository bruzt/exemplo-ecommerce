import supertest from 'supertest';

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

describe('userController Destroy Test Suit', () => {

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

    it('should erase a user from db', async () => {

        const user = UserModel.create(fakeUser);
        await user.save();
        const token = user.generateJwt();

        const response = await supertest(app).delete('/users')
            .set('authorization', 'Bearer ' + token);
        
        expect(response.status).toBe(204);
    });

    it('should return error for "user not found"', async () => {

        const user = UserModel.create(fakeUser);
        const token = user.generateJwt();

        const response = await supertest(app).delete('/users')
            .set('authorization', 'Bearer ' + token);
        
        expect(response.status).toBe(404);
        expect(response.body.message).toBe('user not found');
    });
});
