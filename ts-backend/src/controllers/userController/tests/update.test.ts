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

describe('userController Update Test Suit', () => {

    beforeAll( () => {

        return connection;
    });

    beforeEach( () => {
              
        return truncate();
    });

    afterAll( async () => {

        return (await connection).close();
    });

    it('should update a user on db', async () => {

        const user = UserModel.create(fakeUser);
        await user.save();
        const token = user.generateJwt();

        const response = await supertest(app).put('/users')
            .set('authorization', 'Bearer ' + token)
            .send({
                name: 'test'
            });
        
        expect(response.status).toBe(200);
        expect(response.body.name).toBe('test');
    });

    it('should return error for "user not found"', async () => {

        const user = UserModel.create(fakeUser);

        const token = user.generateJwt();

        const response = await supertest(app).put('/users')
            .set('authorization', 'Bearer ' + token)
            .send({
                name: 'test'
            });
        
        expect(response.status).toBe(404);
        expect(response.body.message).toBe("user not found");
    });
    
});
