const express = require('express');
const { unlink } = require('fs');
const { promisify } = require('util');

const unlinkAsync = promisify(unlink);

const ImageModel = require('../../models/ImageModel');
const ProductModel = require('../../models/ProductModel');

/** @param {express.Request} req * @param {express.Response} res */
module.exports = async (req, res) => {
        
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
        
        const images = []
        files.forEach( async (file) => {
            
            images.push({
                url: file.path,
                filename: file.filename
            });

            await ImageModel.create({
                product_id: id,
                url: file.path,
                filename: file.filename
            });
        });
        
        return res.status(200).json(images);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'internal error' });
    }
}
