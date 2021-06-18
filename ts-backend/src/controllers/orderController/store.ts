import { Request, Response } from 'express';
import { getConnection } from "typeorm";
import pagarMeClient from '../../services/pagarMe/client';

import OrderModel from '../../models/OrderModel';
import UserModel from '../../models/UserModel';
import ProductModel from '../../models/ProductModel';
import OrderProductModel from '../../models/OrderProductModel';
import socketIo from '../../websocket/socketIo';

interface ICustomer {
    external_id: string;
    name: string;
    email: string;
    type: string;
    country: string;
    phone_numbers: string[];
    documents: Array<{
        type: string;
        number: string;
    }>,
}

interface IShipping {
    name: string;
    fee?: string;
    address: {
        street: string;
        street_number: string;
        neighborhood: string;
        city: string;
        state: string;
        zipcode: string;
        country: string;
    }
}

interface IItems {
    id: string;
    title: string;
    unit_price: string;
    quantity: number;
    tangible: boolean;
}

interface ICreditCard {
    installments: number;
    card_number: string;
    card_cvv: string;
    card_expiration_date: string;
    card_holder_name: string;
    payment_method?: 'credit_card';
    amount?: string;
    reference_key?: string;
    customer: ICustomer;
    billing: {
        name: string;
        address: {
            street: string;
            street_number: string;
            neighborhood: string;
            city: string;
            state: string;
            zipcode: string;
            country: string;
        };
    };
    shipping: IShipping;
    items?: IItems[];
}

interface IBoleto {
    payment_method?: 'boleto';
    amount?: string;
    capture?: boolean;
    reference_key?: string;
    boleto_expiration_date?: string;
    boleto_instructions?: string;
    customer: ICustomer;
    shipping: IShipping;
    items?: IItems[]
}

interface IBody {
    products_id: number[];
    quantity_buyed: number[];
    freight_name: string;
    freight_price: number;
    address_id: number;
    credit_card?: ICreditCard;
    boleto?: IBoleto;
}

export default async function store(req: Request, res: Response) {

    const body = req.body as IBody;
    const { id } = req.tokenPayload;

    try {

        await getConnection().transaction(async (transactionalEntityManager) => {

            // verify if user and his address exists
            const user = await UserModel.findOne(id, {
                relations: ['addresses']
            });

            if (user == null) return res.status(404).json({ message: 'user not found' });

            const addresses = user.addresses?.filter((address) => address.id == body.address_id);
            if (addresses == null || addresses.length == 0) return res.status(404).json({ message: 'address not found' });

            // verify if all products exists and have enough stock 
            const products: ProductModel[] = [];
            let errorProduct: string | undefined;

            for (let i = 0; i < body.products_id.length; i++) {

                const product = await ProductModel.findOne(body.products_id[i]);

                if (product == null) {
                    errorProduct = 'product id ' + body.products_id[i] + ' not found';
                    break;
                }

                if (product.quantity_stock < body.quantity_buyed[i]) {
                    errorProduct = 'product id ' + body.products_id[i] + ' dont have enough stock';
                    break;
                }

                products.push(product);
            }

            if (errorProduct) return res.status(400).json({ message: errorProduct });

            // calculates total price
            let total_price = 0;
            for (let i = 0; i < products.length; i++) {
                total_price += Number(products[i].finalPrice) * Number(body.quantity_buyed[i]);
            }

            // create order
            const order = OrderModel.create({
                user_id: id,
                freight_name: body.freight_name,
                freight_price: Number(Number(body.freight_price).toFixed(2)),
                total_price,
                address_id: body.address_id,
                payment_method: (req.body.credit_card) ? 'credit_card' : 'boleto'
            });

            await transactionalEntityManager.save(order);

            if (body.credit_card) body.credit_card.items = [];
            else if (body.boleto) body.boleto.items = [];

            // add products to order and subtract from stock
            for (let i = 0; i < products.length; i++) {

                if (body.credit_card && body.credit_card.items) {

                    body.credit_card.items.push({
                        id: String(products[i].id),
                        title: products[i].title,
                        unit_price: String(products[i].finalPrice).replace('.', ''),
                        quantity: body.quantity_buyed[i],
                        tangible: products[i].tangible
                    });

                } else if (body.boleto && body.boleto.items) {

                    body.boleto.items.push({
                        id: String(products[i].id),
                        title: products[i].title,
                        unit_price: String(products[i].finalPrice).replace('.', ''),
                        quantity: body.quantity_buyed[i],
                        tangible: products[i].tangible
                    });
                }

                const orderProduct = OrderProductModel.create({
                    product: products[i],
                    order,
                    quantity_buyed: body.quantity_buyed[i],
                    product_price: Number(products[i].price),
                    product_discount_percent: products[i].isOnSale ? products[i].discount_percent : 0,
                });

                await transactionalEntityManager.save(orderProduct);

                products[i].quantity_sold += body.quantity_buyed[i];
                products[i].quantity_stock -= body.quantity_buyed[i];

                await transactionalEntityManager.save(products[i]);
            }
            
            let pagarMeResponse;
            const reference_key = `${order.id}!${Number(order.created_at)}`;

            const client = await pagarMeClient();

            const productsAmount = String(total_price).replace('.', '');
            const shippingFee = String(Number(body.freight_price).toFixed(2)).replace('.', '');

            ////////////////////////////////////
            // PAGAMENTO CARTAO CREDITO
            ///////////////////////////////////
            if (body.credit_card) {

                body.credit_card.payment_method = 'credit_card';
                body.credit_card.amount = String(Number(productsAmount) + Number(shippingFee));
                body.credit_card.shipping.fee = shippingFee;

                body.credit_card.reference_key = reference_key;

                pagarMeResponse = await client.transactions.create({
                    ...body.credit_card
                });

                ////////////////////////////////////
                // PAGAMENTO BOLETO
                ///////////////////////////////////
            } else if (body.boleto) {

                body.boleto.payment_method = 'boleto';
                body.boleto.amount = String(Number(productsAmount) + Number(shippingFee));
                body.boleto.shipping.fee = shippingFee;

                body.boleto.capture = true; // retorna o link para o boleto
                body.boleto.reference_key = reference_key;

                const date = new Date();
                date.setDate(date.getDate() + 3);
                body.boleto.boleto_expiration_date = `${date.getFullYear()}-${((date.getMonth() + 1) < 10) ? `0${date.getMonth() + 1}` : date.getMonth() + 1}-${(date.getDate() < 10) ? `0${date.getDate()}` : date.getDate()}`;

                body.boleto.boleto_instructions = 'O BOLETO VENCE EM 3 (TRÊS) DIAS.'

                pagarMeResponse = await client.transactions.create({
                    ...body.boleto
                });

                order.boleto_url = pagarMeResponse.boleto_url;
            }
            ///////////////////////////////////////////////////

            order.status = pagarMeResponse.status;

            await transactionalEntityManager.save(order);

            socketIo.emitNewOrder(order);
    
            return res.status(201).json({ order: { id: order.id, boleto_url: order.boleto_url }, pagarme: pagarMeResponse });
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'internal error' });
    }
}
