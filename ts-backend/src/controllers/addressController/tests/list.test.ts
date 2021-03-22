import supertest from 'supertest';

import connection from '../../../databases/typeorm/connection';
import truncate from '../../../testUtils/truncateTypeorm';
import app from '../../../app';
import UserModel from '../../../models/UserModel';
import AddressModel from '../../../models/AddressModel';

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

describe('addressController List Test Suit', () => {

    beforeAll( () => {

        return connection;
    });

    beforeEach( () => {
              
        return truncate();
    });

    afterAll( async () => {

        return (await connection).close();
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
            .set('authorization', 'Bearer ' + token);
        
        expect(response.status).toBe(200);
        expect(response.body.length).toBe(3);
        expect(response.body[0].userId).toBe(user.id);
    });

    it('should return code 400 for "authorization is required"', async () => {

        const response = await supertest(app).get(`/addresses`)
        
        expect(response.status).toBe(400);
        expect(response.body.validation.headers.message).toBe("\"authorization\" is required");
    });

    it('should return code 400 for "user not found"', async () => {

        const user = UserModel.create(fakeUser);
        const token = user.generateJwt();
        
        const response = await supertest(app).get(`/addresses`)
            .set('authorization', 'Bearer ' + token);

        expect(response.status).toBe(400);
        expect(response.body.message).toBe("user not found");
    });
});
