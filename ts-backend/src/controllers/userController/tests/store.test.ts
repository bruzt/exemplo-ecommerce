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

describe('userController Store Test Suit', () => {

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

    it('should add a user to db', async () => {

        const response = await supertest(app).post('/users')
            .send(fakeUser)
        ;

        expect(response.status).toBe(201);
        expect(response.body.user.name).toBe('fake user');
    });

    it('should not add a user with same email on db', async () => {

        const user = UserModel.create(fakeUser);
        await user.save();

        const response = await supertest(app).post('/users')
            .send(fakeUser)
        ;

        expect(response.status).toBe(409);
        expect(response.body.message).toBe('email already in use');
    });

    it('should not add a user with same cpf on db', async () => {

        const user = UserModel.create(fakeUser);
        await user.save();

        const response = await supertest(app).post('/users')
            .send({ ...fakeUser, email: 'other@email.com' })
        ;

        expect(response.status).toBe(409);
        expect(response.body.message).toBe('cpf already in use');
    });

    it('should not add a user with invalid cpf', async () => {

        const response = await supertest(app).post('/users')
            .send({ ...fakeUser, cpf: '72365148652'})
        ;

        expect(response.status).toBe(400);
        expect(response.body.message).toBe('invalid cpf');
    });
});