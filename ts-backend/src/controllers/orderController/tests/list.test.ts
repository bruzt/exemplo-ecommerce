import supertest from 'supertest';

import typeormConnection from '../../../databases/typeorm/connection';
import sonicConnection from '../../../databases/sonic/connection';
import truncate from '../../../testUtils/truncateTypeorm';
import app from '../../../app';
import UserModel from '../../../models/UserModel';
import AddressModel from '../../../models/AddressModel';
import OrderModel from '../../../models/OrderModel';
import { fakeUser, fakeAddress, fakeOrder } from '../../../testUtils/fakeData';

describe('orderController List Test Suit', () => {

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

    it('should show all orders from authenticated user', async () => {

        const user = UserModel.create(fakeUser);
        await user.save();
        const token = user.generateJwt();

        const address = AddressModel.create({ ...fakeAddress, user_id: user.id });
        await address.save();
        

        for(let i = 0; i < 2; i++){

            const order = OrderModel.create({
                ...fakeOrder,
                user_id: user.id,
                address_id: address.id
            });
            await order.save();
        }

        const response = await supertest(app).get(`/orders`)
            .set('authorization', 'Bearer ' + token)
        ;

        expect(response.status).toBe(200);
        expect(response.body.count).toBe(2);
        expect(response.body.orders.length).toBe(2);
    });
});
