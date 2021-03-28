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

describe('userController Show Test Suit', () => {

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

    it('should show a specific user on db', async () => {

        const user = UserModel.create(fakeUser);

        await user.save();
        
        const token = user.generateJwt();
        
        const response = await supertest(app).get(`/users/${user.id}`)
            .set('authorization', `Bearer ${token}`)
        ;

        expect(response.status).toBe(200);
        expect(user.id).toBe(response.body.id);
    });

    it('should return error for "token id must be equal to params id"', async () => {

        const user = UserModel.create(fakeUser);
        const token = user.generateJwt();
        
        const response = await supertest(app).get(`/users/22`)
            .set('authorization', `Bearer ${token}`)
        ;

        expect(response.status).toBe(403);
        expect(response.body.message).toBe("token id must be equal to params id");
    });

    it('should return error for "user not found"', async () => {

        const user = UserModel.create(fakeUser);
        await user.save();

        const token = user.generateJwt();

        const id = user.id;
        
        await user.remove();

        const response = await supertest(app).get(`/users/${id}`)
            .set('authorization', `Bearer ${token}`)
        ;

        expect(response.status).toBe(404);
        expect(response.body.message).toBe("user not found");
    });

    it('should return error for "id must be a number"', async () => {

        const user = UserModel.create(fakeUser);
        const token = user.generateJwt();
        
        const response = await supertest(app).get(`/users/j`)
            .set('authorization', `Bearer ${token}`)
        ;

        expect(response.status).toBe(400);
        expect(response.body.message[0]).toBe("\"id\" must be a number");
    });
});
