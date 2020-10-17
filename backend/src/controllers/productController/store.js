const express = require('express');

const ProductModel = require('../../models/ProductModel');
const CategoryModel = require('../../models/CategoryModel');

/** @param {express.Request} req * @param {express.Response} res */
module.exports = async (req, res) => {

    req.body.price = req.body.price.toFixed(2);
    
    try {

        const category = await CategoryModel.findByPk(req.body.category_id);

        if(!category) return res.status(400).json({ message: 'category not found' });

        const product = await ProductModel.create(req.body);

        return res.json(product);
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'internal error' });
    }
}