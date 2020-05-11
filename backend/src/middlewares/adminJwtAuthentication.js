const express = require('express');

const jwtAuthentication = require('./jwtAuthentication');
//const UserModel = require('../models/UserModel');

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
module.exports = async (req, res, next) => {

    jwtAuthentication(req, res, async () => {

        const { admin } = req.tokenPayload;
    
        try {
    
            //const user = await UserModel.findByPk(id);
            
            if(!admin) return res.status(400).json({ message: 'not an admin' });
            //if(!user.admin) return res.status(400).json({ message: 'you are not allowed to do that' });
    
            return next();
            
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'internal error' });
        }
    });
}