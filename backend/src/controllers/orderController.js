const express = require('express');
const axios = require('axios');

const OrderModel = require('../models/OrderModel');
const UserModel = require('../models/UserModel');
const ProductModel = require('../models/ProductModel');

module.exports = {

    /** @param {express.Request} req * @param {express.Response} res */
    index: async (req, res) => {

        const { id } = req.tokenPayload;

        try {

            const user = await UserModel.findByPk(id, {
                attributes: { exclude: ['password'] },
                include: {
                    association: 'orders',
                    required: false
                }
            });

            if(!user) return res.status(400).json({ message: 'user not found' });

            return res.json(user.orders);
            
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'internal error' });
        }
    },
    
    /** @param {express.Request} req * @param {express.Response} res */
    store: async (req, res) => {

        const { 
            products_id, 
            quantity_buyed, 
            freight_name,
            freight_price, 
            total_price, 
            address_id 
        } = req.body;
        const user_id = req.tokenPayload.id;

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

            // calculates total price with discounts
            /*let total_price = 0;
            for(let i = 0; i < products.length; i++){

                total_price += products[i].price - (products[i].price * (products[i].discount_percent/100));
            }    */
            
            // create order
            const order = await OrderModel.create({ 
                user_id, 
                freight_name,
                freight_price, 
                total_price, 
                address_id 
            });
            
            req.body.credit_card.items = []

            // add products to order and subtract from stock
            for(let i = 0; i < products.length; i++){

                const unit_price = (products[i].discount_percent > 0)
                    ? Number(String(Number(products[i].price - (products[i].price * (products[i].discount_percent/100))).toFixed(2)).replace('.', ''))
                    : Number(String(Number(products[i].price).toFixed(2)).replace('.', ''));

                req.body.credit_card.items.push({
                    id: String(products[i].id),
                    title: products[i].title,
                    unit_price,
                    quantity: quantity_buyed[i],
                    tangible: products[i].tangible
                });
                
                await order.addProduct(products[i], {
                    through: {
                        quantity_buyed: quantity_buyed[i],
                        product_price: products[i].price,
                        product_discount_percent: products[i].discount_percent
                    }
                });

                products[i].quantity_stock -= quantity_buyed[i];
                await products[i].save();
            }

            if(process.env.NODE_ENV == 'test') return res.json(order);

            const response = await axios.post('https://api.pagar.me/1/transactions', {
                api_key: process.env.PAGARME_API_KEY,
                ...req.body.credit_card
            });

            order.status = response.data.status;
            order.save();

            return res.json({ order, pagarme: response.data });
            
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'internal error' });
        }
    },
    
    /** @param {express.Request} req * @param {express.Response} res */
    update: async (req, res) => {

        //if(Object.keys(req.body).length === 0) return res.status(400).json({ message: 'empty object not allowed'});

        const { id } = req.params;
        const { status } = req.body;

        try {

            const [ updated ] = await OrderModel.update({ status }, { where: { id }});

            if(updated == 0) return res.status(400).json({ message: 'no update has been made'});

            return res.sendStatus(200);
            
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'internal error' });
        }
    },

    /** @param {express.Request} req * @param {express.Response} res */
    destroy: async (req, res) => {

        const { id } = req.params;

        try {

            const order = await OrderModel.findByPk(id);

            if(!order) return res.status(400).json({ message: 'order not found' });

            order.status = 'canceled';

            await order.save();

            return res.sendStatus(200);
            
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'internal error' });
        }
    }    
}