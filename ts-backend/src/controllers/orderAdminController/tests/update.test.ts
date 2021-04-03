import supertest from 'supertest';

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

describe('orderAdminController Update Test Suit', () => {

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

    it('should update an order', async () => {

        const user = UserModel.create(fakeUser);
        user.admin = true;
        await user.save();
        const token = user.generateJwt();

        const address = AddressModel.create({ ...fakeAddress, user_id: user.id });
        await address.save();

        const order = OrderModel.create({ 
            ...fakeOrder,
            user_id: user.id, 
            address_id: address.id, 
        });
        await order.save();

        const response = await supertest(app).put(`/admin/orders/${order.id}`)
            .set('authorization', 'Bearer ' + token)
            .send({ status: "sent" })
        ;

        expect(response.status).toBe(200);
        expect(response.body.status).toBe('sent');
    });
    
    it('should return error for "order not found"', async () => {

        const user = UserModel.create(fakeUser);
        user.admin = true;
        const token = user.generateJwt();

        const response = await supertest(app).put(`/admin/orders/11`)
            .set('authorization', 'Bearer ' + token)
            .send({ status: "payment confirmed" })
        ;

        expect(response.status).toBe(404);
        expect(response.body.message).toBe("order not found");
    });
});
