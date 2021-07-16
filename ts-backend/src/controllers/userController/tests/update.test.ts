import supertest from 'supertest';

import typeormConnection from '../../../databases/typeorm/connection';
import sonicConnection from '../../../databases/sonic/connection';
import truncate from '../../../testUtils/truncateTypeorm';
import app from '../../../app';
import UserModel from '../../../models/UserModel';
import { fakeUser } from '../../../testUtils/fakeData';

describe('userController Update Test Suit', () => {

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

    it('should update a user on db', async () => {

        const user = UserModel.create(fakeUser);
        await user.save();
        const token = user.generateJwt();

        const response = await supertest(app).put('/users')
            .set('authorization', 'Bearer ' + token)
            .send({
                name: 'test',
                email: 'other@test.br',
                cpf: '71314297082',
            });
        
        expect(response.status).toBe(200);
        expect(response.body.name).toBe('test');
    });

    it('should update the password of a user', async () => {

        const user = UserModel.create(fakeUser);
        await user.save();
        const token = user.generateJwt();

        const response = await supertest(app).put('/users')
            .set('authorization', 'Bearer ' + token)
            .send({
                currentPassword: '123456',
                newPassword: '123457',
            });
        
        expect(response.status).toBe(200);
    });

    it('should not update the password for "wrong current password"', async () => {

        const user = UserModel.create(fakeUser);
        await user.save();
        const token = user.generateJwt();

        const response = await supertest(app).put('/users')
            .set('authorization', 'Bearer ' + token)
            .send({
                currentPassword: '123457',
                newPassword: '123458',
            });
        
        expect(response.status).toBe(400);
    });

    it('should return erro for "invalid cpf"', async () => {

        const user = UserModel.create(fakeUser);
        await user.save();
        const token = user.generateJwt();

        const response = await supertest(app).put('/users')
            .set('authorization', 'Bearer ' + token)
            .send({ cpf: '96575214538' });
        
        expect(response.status).toBe(400);
        expect(response.body.message).toBe('invalid cpf');
    });    

    it('should return error for "user not found"', async () => {

        const user = UserModel.create(fakeUser);

        const token = user.generateJwt();

        const response = await supertest(app).put('/users')
            .set('authorization', 'Bearer ' + token)
            .send({
                name: 'test',
            });
        
        expect(response.status).toBe(404);
        expect(response.body.message).toBe("user not found");
    });
});
