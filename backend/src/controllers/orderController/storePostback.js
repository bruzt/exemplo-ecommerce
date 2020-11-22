const express = require('express');
const hmacSha1 = require('crypto-js/hmac-sha1');

const OrderModel = require('../../models/OrderModel');

/** @param {express.Request} req * @param {express.Response} res */
module.exports = async (req, res) => {

    const pargarMeSignature = req.headers['x-hub-signature'];
    const keyParams = req.params.key;

    const [id, key] = keyParams.split('-');
    
    try {

        const validatePagarMeBody = hmacSha1(req.body, process.env.PAGARME_API_KEY);

        if(validatePagarMeBody !== pargarMeSignature) return res.status(400).json({ message: 'x-hub-signature not valid' });

        const order = await OrderModel.findByPk(id);

        if(order.postback_key !== key) return res.status(400).json({ message: 'postback key not valid' });

        order.status = req.body.current_status;

        await order.save();

        return res.status(204).json();
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'unexpected error' });
    }
}
