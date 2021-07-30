const express = require('express');
//const crypto = require('crypto');

const sequelizeConnection = require('../../database/sequelize/connection');
const payWithCreditCard = require('../../services/pagarMe/payWithCreditCard');
const payWithBoleto = require('../../services/pagarMe/payWithBoleto');
const { socketEmitNewOrder } = require('../../websocket/socketConnection');

const OrderModel = require('../../models/OrderModel');
const UserModel = require('../../models/UserModel');
const ProductModel = require('../../models/ProductModel');
const buyOrderTemplate = require('../../services/mailer/templates/buyOrderTemplate');
const { sendEmailQueue } = require('../../backgroundJobs/queues');
const calcInstallments = require('../../util/calcInstallments');

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
                    product_discount_percent: products[i].isOnSale ? products[i].discount_percent : 0,
                },
                transaction
            });
            
            products[i].quantity_sold += quantity_buyed[i];
            products[i].quantity_stock -= quantity_buyed[i];
            await products[i].save({
                transaction
            });
        }
        
        let response;
        const reference_key = `${order.id}!${Number(order.createdAt)}`;

        const productsAmount = String(total_price).replace('.', '');
        const shippingFee = String(Number(freight_price).toFixed(2)).replace('.', '');
        
        ////////////////////////////////////
        // PAGAMENTO CARTAO CREDITO
        ///////////////////////////////////
        if(req.body.credit_card){

            let amount = String(Number(productsAmount) + Number(shippingFee));
                
            // apply interest rate to total price 
            if(req.body.credit_card.installments > Number(process.env.FREE_INSTALLMENTS)){
                const installmentsOptions = calcInstallments(parseFloat(String(amount) + 'e-2')); // parseFloat(string + 'e-2') adds . of cents
                amount = (Number(installmentsOptions.installments[req.body.credit_card.installments-1]) * Number(req.body.credit_card.installments)).toFixed(2).replace('.', '');
            }

            req.body.credit_card.amount = amount;
            req.body.credit_card.shipping.fee = shippingFee;

            req.body.credit_card.reference_key = reference_key;

            response = await payWithCreditCard(req.body.credit_card);

            order.status = response.status;
            
        ////////////////////////////////////
        // PAGAMENTO BOLETO
        ///////////////////////////////////
        } else if(req.body.boleto){

            req.body.boleto.amount = String(Number(productsAmount) + Number(shippingFee));
            req.body.boleto.shipping.fee = shippingFee;

            req.body.boleto.reference_key = reference_key;
             
            response = await payWithBoleto(req.body.boleto);

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
            order.boleto_url = response.boleto_url;
        }
        ///////////////////////////////////////////////////

        await order.save({ transaction });
        await transaction.commit();

        try {
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
            
            socketEmitNewOrder(newOrder);

            const template = buyOrderTemplate(products, quantity_buyed, freight_price, total_price);
                
            await sendEmailQueue.add({
                from: 'donotreply@companyname.com',
                to: user.email,
                subject: 'E-Commerce - Confirmação de compra',
                template,
            });
        } catch (error) {
            console.log(error);
        }
        
        return res.json({ order: { id: order.id, boleto_url: order.boleto_url }, pagarme: response });
        
    } catch (error) {
        await transaction.rollback();
        console.error(error);
        return res.status(500).json({ message: 'internal error' });
    }
}
