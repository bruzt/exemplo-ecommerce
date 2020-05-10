const express = require('express');

const ProductModel = require('../models/ProductModel');
const UserModel = require('../models/UserModel');

module.exports = {

    /** @param {express.Request} req * @param {express.Response} res */
    index: async (req, res) => {

        try {

            const products = await ProductModel.findAll();

            return res.json(products);
            
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'internal error' });
        }
    },


    /** @param {express.Request} req * @param {express.Response} res */
    show: async (req, res) => {

        const { id } = req.params;

        try {

            const product = await ProductModel.findByPk(id);

            if(!product) return res.status(400).json({ message: 'product not found' });

            return res.json(product);
            
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'internal error' });
        }
    },
    
    /** @param {express.Request} req * @param {express.Response} res */
    store: async (req, res) => {

        const { id } = req.tokenPayload; 

        try {

            const user = await UserModel.findByPk(id);
            
            if(!user.admin) return res.status(400).json({ message: 'not allowed' });

            const product = await ProductModel.create(req.body);

            return res.json(product);
            
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'internal error' });
        }
    },
    

    /** @param {express.Request} req * @param {express.Response} res */
    update: async (req, res) => {

        const { id } = req.params;
        const userId = req.tokenPayload.id;

        try {

            const user = await UserModel.findByPk(userId);

            if(!user.admin) return res.status(400).json({ message: 'not allowed' });

            const [ updated ] = await ProductModel.update(req.body, { where: { id }});

            if(updated == 0) return res.status(400).json({ message: 'no update has been made' });

            return res.sendStatus(200);
            
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'internal error' });
        }
    },
    
    /** @param {express.Request} req * @param {express.Response} res */
    destroy: async (req, res) => {

        const { id } = req.params;
        const userId = req.tokenPayload.id;

        try {

            const user = await UserModel.findByPk(userId);

            if(!user.admin) return res.status(400).json({ message: 'not allowed' });

            const product = await ProductModel.destroy({ where: { id }});

            if(product == 0) return res.status(400).json({ message: 'product not found' });

            return res.sendStatus(200);
            
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'internal error' });
        }
    }
}