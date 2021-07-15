import app from '../../app';
import { io } from 'socket.io-client';

import typeormConnection from '../../databases/typeorm/connection';
import truncate from '../../testUtils/truncateTypeorm';
import sonicConnection from '../../databases/sonic/connection';
import UserModel from '../../models/UserModel';
import CategoryModel from '../../models/CategoryModel';
import AddressModel from '../../models/AddressModel';
import ProductModel from '../../models/ProductModel';
import OrderModel from '../../models/OrderModel';
import axios from 'axios';

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

const fakeCategory = {
    name: 'fake category',
}

const fakeProduct = {
    title: 'fake product',
    description: 'bla bla bla',
    html_body: '<p>vai</p>',
    price: "10.50",
    quantity_stock: 100,
    tangible: true,
    weight: "5",
    length: 15,
    height: 15,
    width: 15,
}

const credit_card = {
    "installments": 2,
    "card_number": "4111111111111111",
    "card_cvv": "546",
    "card_expiration_date": "1025",
    "card_holder_name": "Jajau Lalau",
    "customer": {
        "external_id": "1",
        "name": "Jajau Lalau",
        "email": "teste1@teste.com",
        "type": "individual",
        "country": "br",
        "phone_numbers": ["+5519999999999"],
        "documents": [
            {
            "type": "cpf",
            "number": "99999999999"
            }
        ]
    },
    "billing": {
        "name": "Jajau Lalau",
        "address": {
            "street": "rau lalau",
            "street_number": "55a",
            "neighborhood": "bairro haha",
            "city": "cordeirópolis",
            "state": "sp",
            "zipcode": "13490000",
            "country": "br",
        }
    },
    "shipping": {
        "name": "Jajau Lalau",
        "address": {
            "street": "rau lalau",
            "street_number": "55a",
            "neighborhood": "bairro haha",
            "city": "cordeirópolis",
            "state": "sp",
            "zipcode": "13490000",
            "country": "br",
        }
    },
};

function sleep(timeout: number): Promise<boolean>{
    return new Promise( (resolve) => {
        setTimeout(() => {
            resolve(true);
        }, timeout);
    });
}

describe('Socket.io Tests', () => {

    beforeAll( async () => {

        app.listen(3001);
        await typeormConnection;

        return truncate();
    });

    afterAll( async () => {

        //socket.disconnect();
        app.close();

        await sonicConnection.search.close();
        await sonicConnection.ingest.close();

        return (await typeormConnection).close();
    });

    it('should keep connection via websocket', async () => {

        const user = UserModel.create(fakeUser);
        user.admin = true;
        const token = user.generateJwt();

        const socket = io('http://localhost:3001', {
            transports: ['websocket'],
            upgrade: false,
            query: {
                authorization: token,
            }
        });
        
        await sleep(1000);

        expect(socket.connected).toBe(true);
        socket.disconnect();
    });

    it('should not allow connection via websocket - no authorization', async () => {

        const socket = io('http://localhost:3001', {
            transports: ['websocket'],
            upgrade: false,
        });

        await sleep(1000);
        
        expect(socket.connected).toBe(false);
    });

    it('should not allow connection via websocket - not an admin', async () => {

        const user = UserModel.create(fakeUser);
        user.admin = false;
        const token = user.generateJwt();

        const socket = io('http://localhost:3001', {
            transports: ['websocket'],
            upgrade: false,
            query: {
                authorization: token,
            }
        });

        await sleep(1000);
        
        expect(socket.connected).toBe(false);
    });

    it('should send "newOrder" via websocket', async () => {

        let order: OrderModel | undefined;

        const user = UserModel.create(fakeUser);
        user.admin = true;
        await user.save();
        const token = user.generateJwt();

        const socket = io('http://localhost:3001', {
            transports: ['websocket'],
            upgrade: false,
            query: {
                authorization: token,
            }
        });

        socket.on('newOrder', (message: OrderModel) => {
            order = message;
        });

        const address = AddressModel.create({ ...fakeAddress, user_id: user.id });
        await address.save();

        const category = CategoryModel.create(fakeCategory);
        await category.save();

        const product = ProductModel.create({ ...fakeProduct, category_id: category.id });
        await product.save();
        
        const api = axios.create({
            baseURL: 'http://localhost:3001',
        });

        api.defaults.headers.authorization = `Bearer ${token}`;

        const response = await api.post('/orders', {
            freight_name: 'sedex',
            freight_price: 30.77,
            quantity_buyed: [2],
            products_id: [product.id],
            address_id: address.id,
            credit_card,
        });

        await sleep(1000);

        expect(response.data.order.id).toBe(order?.id);
        socket.disconnect();
    });
});
    