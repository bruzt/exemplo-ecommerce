import supertest from 'supertest';

import typeormConnection from '../../../databases/typeorm/connection';
import sonicConnection from '../../../databases/sonic/connection';
import truncate from '../../../testUtils/truncateTypeorm';

import app from '../../../app';
import UserModel from '../../../models/UserModel';

const fakeCpfs = ["71314297082", "30581023056", "97938138061"];

describe('userController List Test Suit', () => {

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

    it('should list all users on db', async () => {

        const user = UserModel.create({
            name: "fake admin",
            cpf: "61311682023",
            email: "fake@admin.com",
            password: "123456"
        });

        user.admin = true;

        user.save();

        const token = user.generateJwt();

        // save 3 users on db
        for(let i=0; i < 3; i++){

            const testUser = UserModel.create({
                name: "fulano ciclano",
                email: `email${i}@teste.com`,
                cpf: fakeCpfs[i],
                password: "123456",
            });

            await testUser.save();
        }

        const response = await supertest(app).get('/users')
            .set('authorization', 'Bearer ' + token)
        ;
        
        expect(response.status).toBe(200);
        expect(Object.keys(response.body).length).toBe(4);
    });
});
