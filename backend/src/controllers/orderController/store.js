const express = require('express');
const pagarMeClient = require('../../services/pagarMe/pagarMeClient');
//const crypto = require('crypto');

const sequelizeConnection = require('../../database/sequelize/connection');

const { emitNewOrder } = require('../../websocket/socketConnection');

const OrderModel = require('../../models/OrderModel');
const UserModel = require('../../models/UserModel');
const ProductModel = require('../../models/ProductModel');

/** @param {express.Request} req * @param {express.Response} res */
module.exports = async (req, res) => {

    const { 
        products_id, 
        quantity_buyed, 
        freight_name,
        freight_price,
        address_id 
    } = req.body;

    const user_id = req.tokenPayload.id;

    const transaction = await sequelizeConnection.transaction();

    try {

        // verify if user and his address exists
        let user = await UserModel.findByPk(user_id, {
            include: {
                association: 'addresses',
                where: { id: address_id },
                required: false
            },
        });

        if(!user) return res.status(400).json({ message: 'user not found' });
        if(user.addresses.length == 0) return res.status(400).json({ message: 'address not found' });

        // verify if all products exists and have enough stock 
        let products = [];
        let errorProduct;
        for(let i = 0; i < products_id.length; i++){

            const product = await ProductModel.findByPk(products_id[i]);

            if(!product) {
                errorProduct = 'product id ' + products_id[i] + ' not found';
                break;
            }

            if(product.quantity_stock < quantity_buyed[i]){
                errorProduct = 'product id ' + products_id[i] + ' dont have enough stock';
                break;
            }

            products.push(product);
        }
        
        if(errorProduct) return res.status(400).json({ message: errorProduct });

        // calculates total price
        let total_price = 0;
        for(let i = 0; i < products.length; i++) {
            total_price += Number(products[i].finalPrice) * Number(quantity_buyed[i]);
        }
        
        // create order
        const order = await OrderModel.create({ 
            user_id, 
            freight_name,
            freight_price: Number(freight_price).toFixed(2), 
            total_price, 
            address_id,
            payment_method: (req.body.credit_card) ? 'credit_card' : 'boleto'
        }, {
            transaction
        });
        
        if(req.body.credit_card) req.body.credit_card.items = [];
        else if(req.body.boleto) req.body.boleto.items = [];

        // add products to order and subtract from stock
        for(let i = 0; i < products.length; i++){
            
            if(req.body.credit_card){
                
                req.body.credit_card.items.push({
                    id: String(products[i].id),
                    title: products[i].title,
                    unit_price: String(products[i].finalPrice).replace('.', ''),
                    quantity: quantity_buyed[i],
                    tangible: products[i].tangible
                });
                
            } else if(req.body.boleto){
                
                req.body.boleto.items.push({
                    id: String(products[i].id),
                    title: products[i].title,
                    unit_price: String(products[i].finalPrice).replace('.', ''),
                    quantity: quantity_buyed[i],
                    tangible: products[i].tangible
                });
            }
            
            await order.addProduct(products[i], {
                through: {
                    quantity_buyed: quantity_buyed[i],
                    product_price: products[i].price,
                    product_discount_percent: products[i].isOnSale ? products[i].discount_percent : null,
                },
                transaction
            });
            
            products[i].quantity_sold += quantity_buyed[i];
            products[i].quantity_stock -= quantity_buyed[i];
            await products[i].save({
                transaction
            });
        }
        
        //order.postback_key = crypto.randomBytes(20).toString('hex');
        //const postback_url = `${process.env.BACKEND_URL}/${order.id}-${order.postback_key}`;
        
        let response;
        const reference_key = `${order.id}!${Number(order.createdAt)}`;
        const client = await pagarMeClient();

        const productsAmount = String(total_price).replace('.', '');
        const shippingFee = String(Number(freight_price).toFixed(2)).replace('.', '');
        
        ////////////////////////////////////
        // PAGAMENTO CARTAO CREDITO
        ///////////////////////////////////
        if(req.body.credit_card){

            req.body.credit_card.payment_method = 'credit_card';
            req.body.credit_card.amount = String(Number(productsAmount) + Number(shippingFee));
            req.body.credit_card.shipping.fee = shippingFee;

            //req.body.credit_card.postback_url = postback_url;
            req.body.credit_card.reference_key = reference_key;

            response = await client.transactions.create({
                ...req.body.credit_card
            });

            /*response = await new Promise( (resolve, reject) => {
                setTimeout( async () => {
                    try {
                        const pmRes = await client.transactions.find({ reference_key });
                        resolve(pmRes[0]);
                    } catch (error) {
                        reject(error);
                    }
                }, 1000);
            });*/

            order.status = response.status;
            
        ////////////////////////////////////
        // PAGAMENTO BOLETO
        ///////////////////////////////////
        } else if(req.body.boleto){

            req.body.boleto.payment_method = 'boleto';
            req.body.boleto.amount = String(Number(productsAmount) + Number(shippingFee));
            req.body.boleto.shipping.fee = shippingFee;

            req.body.boleto.capture = true; // retorna o link para o boleto
            //req.body.boleto.postback_url = postback_url;
            req.body.boleto.reference_key = reference_key;
             
            let date = new Date();
            date.setDate(date.getDate() + 3);
            req.body.boleto.boleto_expiration_date = `${date.getFullYear()}-${((date.getMonth() + 1) < 10) ? `0${date.getMonth() + 1}` : date.getMonth() + 1}-${(date.getDate() < 10) ? `0${date.getDate()}` : date.getDate() }`;
            
            req.body.boleto.boleto_instructions = 'O BOLETO VENCE EM 3 (TRÊS) DIAS.'

            response = await client.transactions.create({
                ...req.body.boleto
            });

            /*response = await new Promise( (resolve, reject) => {
                setTimeout( async () => {
                    try {
                        const pmRes = await client.transactions.find({ reference_key });
                        resolve(pmRes[0]);
                    } catch (error) {
                        reject(error);
                    }
                }, 1000);
            });*/

            order.boleto_url = response.boleto_url;
        }
        ///////////////////////////////////////////////////

        await order.save({ transaction });
        await transaction.commit();

        const newOrder = await order.reload({
            include: {
                association: 'products',
                attributes: ['id', 'title'],
                through: { 
                    attributes: ['quantity_buyed', 'product_price', 'product_discount_percent'] 
                },
                /*include: {
                    association: 'images',
                    attributes: ['id', 'filename'],
                }*/
            }
        });
    
        emitNewOrder(newOrder);
        
        return res.json({ order: { id: order.id, boleto_url: order.boleto_url }, pagarme: response });
        
    } catch (error) {
        await transaction.rollback();
        console.error(error);
        return res.status(500).json({ message: 'internal error' });
    }
}
