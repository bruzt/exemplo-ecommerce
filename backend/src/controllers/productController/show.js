const express = require('express');

const calcFinalPrice = require('../../util/calcFinalPrice');

const ProductModel = require('../../models/ProductModel');

/** @param {express.Request} req * @param {express.Response} res */
module.exports = async (req, res) => {

    const { id } = req.params;

    try {

        const product = await ProductModel.findByPk(id, {
            attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt', 'category_id'] },
            include: [{
                association: 'images',
                attributes: ['id', 'url', 'filename'],
                required: false
            },
            {
                association: 'category',
                attributes: { exclude: ['createdAt', 'updatedAt'] }
            }]
        });

        if(!product) return res.status(400).json({ message: 'product not found' });

        return res.json(product);
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'internal error' });
    }
}
