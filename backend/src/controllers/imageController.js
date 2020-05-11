const express = require('express');
const { unlink } = require('fs');
const { promisify } = require('util');

const unlinkAsync = promisify(unlink);

const ImageModel = require('../models/ImageModel');
const ProductModel = require('../models/ProductModel');

module.exports = {

    /** @param {express.Request} req * @param {express.Response} res */
    store: async (req, res) => {
        
        const { id } = req.params;
        const files = req.files;

        try {

            const product = await ProductModel.findByPk(id);

            if(!product){

                files.forEach( async (file) => {

                    if(process.env.IMG_STORAGE_LOCATION == 'local'){

                        await unlinkAsync(file.path);
                    }
                });

                return res.status(400).json({ message: 'product not found' });
            } 
            
            files.forEach( async (file) => {

                await ImageModel.create({
                    product_id: id,
                    url: file.path
                })
            });
            
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

            const image = await ImageModel.findByPk(id);

            if(!image) return res.status(400).json({ message: 'image not found' });

            await image.destroy();

            return res.sendStatus(200);
            
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'internal error' });
        }
    },
}