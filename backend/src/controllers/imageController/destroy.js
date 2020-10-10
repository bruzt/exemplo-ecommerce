const express = require('express');

const ImageModel = require('../../models/ImageModel');

/** @param {express.Request} req * @param {express.Response} res */
module.exports = async (req, res) => {

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
}
