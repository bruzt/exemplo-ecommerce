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

const fakeAddress = {
    street: 'rua lala',
    number: '11',
    neighborhood: 'bairro haha',
    city: 'kakanopolis',
    state: 'fp',
    zipcode: '73214596024'
}

describe('addressController Store Test Suit', () => {

    beforeAll( () => {

        return connection;
    });

    beforeEach( () => {
              
        return truncate();
    });

    afterAll( async () => {

        return (await connection).close();
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
        expect(parseInt(response.body.userId)).toBe(user.id);
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
