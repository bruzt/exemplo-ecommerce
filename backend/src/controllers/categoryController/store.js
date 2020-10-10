const express = require('express');

const CategoryModel = require('../../models/CategoryModel');

/** @param {express.Request} req * @param {express.Response} res */
module.exports = async (req, res) => {

    try {

        if(req.body.parent_id){

            const parent = await CategoryModel.findByPk(req.body.parent_id);

            if(!parent) return res.status(400).json({ message: 'parent category id not found' });
        }

        const category = await CategoryModel.create(req.body);

        return res.json(category);
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'internal error' });
    }
}
