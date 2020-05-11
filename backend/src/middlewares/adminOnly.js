const express = require('express');

const UserModel = require('../models/UserModel');

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
module.exports = async (req, res, next) => {

    const { id } = req.tokenPayload;

    try {

        const user = await UserModel.findByPk(id);

        if(!user) return res.status(400).json({ message: 'admin not found' });
        if(!user.admin) return res.status(400).json({ message: 'you are not allowed to do that' });

        return next();
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'internal error' });
    }
}