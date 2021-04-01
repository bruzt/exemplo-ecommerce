const supertest = require('supertest');

import typeormConnection from '../../../databases/typeorm/connection';
import sonicConnection from '../../../databases/sonic/connection';
import truncate from '../../../testUtils/truncateTypeorm';
import app from '../../../app';
import UserModel from '../../../models/UserModel';
import AddressModel from '../../../models/AddressModel';
import OrderModel from '../../../models/OrderModel';

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

const fakeOrder = {
    freight_name: 'pac',
    freight_price: 10.50,
    total_price: 30.00,
    payment_method: 'credit_card',
    status: 'paid',
}

describe('orderController Test Suit', () => {

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

    it('it should list all orders', async () => {

        const user =  UserModel.create(fakeUser);
        user.admin = true;
        await user.save();
        const token = user.generateJwt();

        const address =  AddressModel.create({ ...fakeAddress, user_id: user.id });
        await address.save();

        const order1 = OrderModel.create({ 
            ...fakeOrder,
            user_id: user.id, 
            address_id: address.id, 
        });
        await order1.save();

        const order2 = OrderModel.create({ 
            ...fakeOrder,
            user_id: user.id, 
            address_id: address.id, 
        });
        await order2.save();

        const response = await supertest(app).get(`/admin/orders?limit=15&offset=0`)
            .set('authorization', 'Bearer ' + token)
        ;

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('count');
        expect(response.body).toHaveProperty('orders');
        expect(response.body.orders).toHaveLength(2);
    });
});
