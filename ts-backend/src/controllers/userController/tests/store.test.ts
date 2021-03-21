import supertest from 'supertest';

import connection from '../../../databases/typeorm/connection';
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

        return connection;
    });

    beforeEach( () => {
              
        return truncate();
    });

    afterAll( async () => {

        return (await connection).close();
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

    it('should not add a user with invalid cpf', async () => {

        const response = await supertest(app).post('/users')
            .send({ ...fakeUser, cpf: '72365148652'})
        ;

        expect(response.status).toBe(406);
        expect(response.body.message).toBe('invalid cpf');
    });
});