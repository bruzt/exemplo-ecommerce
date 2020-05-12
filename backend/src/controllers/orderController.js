const express = require('express');

const OrderModel = require('../models/OrderModel');
const UserModel = require('../models/UserModel');
const ProductModel = require('../models/ProductModel');

module.exports = {

    /** @param {express.Request} req * @param {express.Response} res */
    index: async (req, res) => {

        try {

            const orders = await OrderModel.findAll();

            return res.json(orders);
            
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'internal error' });
        }
    },

    /** @param {express.Request} req * @param {express.Response} res */
    show: async (req, res) => {

        const { id } = req.params;

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

        const { quantity_buyed, total_price, status, products_id, address_id } = req.body;
        const user_id = req.tokenPayload.id;

        try {

            let user = await UserModel.findByPk(user_id, {
                include: {
                    association: 'addresses',
                    where: { user_id },
                    required: false
                },
            });

            if(!user) return res.status(400).json({ message: 'user not found' });
            if(user.addresses.length == 0) return res.status(400).json({ message: 'address not found' });

            let products = [];
            let missingProduct;
            for(let i = 0; i < products_id.length; i++){

                const product = await ProductModel.findByPk(products_id[i]);

                if(!product) {
                    missingProduct = products_id[i];
                    break;
                }

                products.push(product);
            }
            
            if(missingProduct) return res.status(400).json({ message: `product id ${missingProduct} not found`});

            /*const prices = products.map( (product) => {

                return product.price - (product.price * (product.discount_percent/100));
            })*/
            
            const order = await OrderModel.create({ user_id, total_price, status, address_id });
            
            for(let i = 0; i < products.length; i++){
                
                await order.addProduct(products[i], {
                    through: {
                        quantity_buyed: quantity_buyed[i],
                        product_price: products[i].price,
                        product_discount_percent: products[i].discount_percent
                    }
                });
            }

            return res.json(order);
            
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'internal error' });
        }
    },
    
    /** @param {express.Request} req * @param {express.Response} res */
    update: async (req, res) => {

        if(Object.keys(req.body).length === 0) return res.status(400).json({ message: 'empty object not allowed'});

        const { id } = req.params;
        const { status } = req.body;

        try {

            const [ updated ] = await OrderModel.update({ status }, { where: { id }});

            if(updated == 0) return res.status(400).json({ message: 'order not found'});

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