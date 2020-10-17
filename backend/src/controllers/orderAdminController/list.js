const express = require('express');

const OrderModel = require('../../models/OrderModel');

/** @param {express.Request} req * @param {express.Response} res */
module.exports = async (req, res) => {

    try {

        const count = await OrderModel.count({
            col: 'id',
        });
        
        const orders = await OrderModel.findAll({
            order: [['id', 'DESC']],
            include: {
                association: 'products',
                attributes: ['id', 'title'],
                through: { 
                    attributes: ['quantity_buyed', 'product_price', 'product_discount_percent'] 
                },
            }
        });
    
        return res.json({ count, orders });
        
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: 'error' });
    }
}
