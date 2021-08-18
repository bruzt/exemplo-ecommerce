import supertest from 'supertest';

import typeormConnection from '../../../databases/typeorm/connection';
import sonicConnection from '../../../databases/sonic/connection';
import truncate from '../../../testUtils/truncateTypeorm';
import app from '../../../app';
import CategoryModel from '../../../models/CategoryModel';
import ProductModel from '../../../models/ProductModel';
import OrderModel from '../../../models/OrderModel';
import OrderProductModel from '../../../models/OrderProductModel';
import UserModel from '../../../models/UserModel';
import AddressModel from '../../../models/AddressModel';
import { fakeProduct, fakeCategory, fakeOrder, fakeUser, fakeAddress } from '../../../testUtils/fakeData';

describe('productController Show Test Suit', () => {

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

    it('should show an specific product from db', async () => {

        const category = CategoryModel.create(fakeCategory);
        await category.save();

        const product = ProductModel.create({ ...fakeProduct, category_id: category.id });
        await product.save();
        
        const response = await supertest(app).get(`/products/${product.id}`);

        expect(response.status).toBe(200);
        expect(response.body.id).toBe(product.id);
    });

    it('should show an specific on sale product from db', async () => {

        const dateNow = new Date();
        const dateFuture = new Date(Number(dateNow) + 60000);

        const category = CategoryModel.create(fakeCategory);
        await category.save();

        const product = ProductModel.create({ 
            ...fakeProduct,
            category_id: category.id,
            discount_percent: 10,
            discount_datetime_start: dateNow,
            discount_datetime_end: dateFuture,
        });
        await product.save();
        
        const response = await supertest(app).get(`/products/${product.id}`);

        expect(response.status).toBe(200);
        expect(response.body.id).toBe(product.id);
        expect(response.body.isOnSale).toBe(true);
    });

    it('should return code 400 for "product not found"', async () => {

        const response = await supertest(app).get(`/products/6`);

        expect(response.status).toBe(404);
        expect(response.body.message).toBe('product not found');
    });

    it('should show an specific product from db with productsBuyedWith', async () => {

        const user = UserModel.create(fakeUser);
        await user.save();

        const address = AddressModel.create({ ...fakeAddress, user_id: user.id });
        await address.save();

        const category = CategoryModel.create(fakeCategory);
        await category.save();

        const product1 = ProductModel.create({ ...fakeProduct, category_id: category.id });
        await product1.save();

        const product2 = ProductModel.create({ ...fakeProduct, category_id: category.id });
        await product2.save();

        const order = OrderModel.create({
            ...fakeOrder,
            user_id: user.id,
            address_id: address.id
        });
        await order.save();

        const orderProduct1 = OrderProductModel.create({
            order,
            product: product1,
            quantity_buyed: 1,
            product_price: 10,
            product_discount_percent: 0,
        });
        await orderProduct1.save();

        const orderProduct2 = OrderProductModel.create({
            order,
            product: product2,
            quantity_buyed: 1,
            product_price: 15,
            product_discount_percent: 0,
        });
        await orderProduct2.save();
        
        const response = await supertest(app).get(`/products/${product1.id}?buyedWith=4`);

        expect(response.status).toBe(200);
        expect(response.body.productsBuyedWith.length).toBe(1);
    });
});
