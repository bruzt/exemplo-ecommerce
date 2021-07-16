import supertest from 'supertest';

import typeormConnection from '../../../databases/typeorm/connection';
import sonicConnection from '../../../databases/sonic/connection';
import truncate from '../../../testUtils/truncateTypeorm';
import app from '../../../app';
import UserModel from '../../../models/UserModel';
import AddressModel from '../../../models/AddressModel';
import OrderModel from '../../../models/OrderModel';
import CategoryModel from '../../../models/CategoryModel';
import ProductModel from '../../../models/ProductModel';
import OrderProductModel from '../../../models/OrderProductModel';
import { fakeUser, fakeAddress, fakeOrder, fakeProduct } from '../../../testUtils/fakeData';

describe('orderAdminController List Test Suit', () => {

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

    it('it should list all orders, filtered by status and offset', async () => {

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

        const category = CategoryModel.create({
            name: 'teste',
        });
        await category.save();

        const product = ProductModel.create({
            ...fakeProduct,
            category,
        });
        await product.save();

        const orderProduct = OrderProductModel.create({
            order: order1,
            product,
            quantity_buyed: 1,
            product_price: 15,
        });
        await orderProduct.save();

        const response = await supertest(app).get(`/admin/orders?limit=15&offset=1&status=paid`)
            .set('authorization', 'Bearer ' + token)
        ;

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('count');
        expect(response.body).toHaveProperty('orders');
        expect(response.body.orders).toHaveLength(1);
    });
});
